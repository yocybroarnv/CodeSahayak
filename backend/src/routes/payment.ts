import { Router } from 'express';
import Razorpay from 'razorpay';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';

const router = Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret',
});

// Plan prices (in paise)
const PLAN_PRICES = {
  STUDENT_PRO_MONTHLY: 19900, // ₹199
  STUDENT_PRO_YEARLY: 199900, // ₹1999 (2 months free)
  INSTITUTION: 0, // Contact us
};

// POST /api/payment/create-order
router.post('/create-order', authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      plan: z.enum(['STUDENT_PRO_MONTHLY', 'STUDENT_PRO_YEARLY']),
    });

    const { plan } = schema.parse(req.body);
    const amount = PLAN_PRICES[plan];

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user!.userId,
        plan,
      },
    });

    // Save payment record
    await prisma.payment.create({
      data: {
        userId: req.user!.userId,
        razorpayOrderId: order.id,
        amount,
        currency: 'INR',
        plan: plan as any,
        status: 'PENDING',
      },
    });

    res.json({
      orderId: order.id,
      amount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// POST /api/payment/verify
router.post('/verify', authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      razorpayOrderId: z.string(),
      razorpayPaymentId: z.string(),
      razorpaySignature: z.string(),
    });

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = schema.parse(req.body);

    // Verify signature
    const crypto = await import('crypto');
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }

    // Find payment record to check ownership
    const paymentRecord = await prisma.payment.findUnique({
      where: { razorpayOrderId },
    });

    if (!paymentRecord) {
      res.status(404).json({ error: 'Payment record not found' });
      return;
    }

    if (paymentRecord.userId !== req.user!.userId) {
      res.status(403).json({ error: 'Unauthorized: Payment record does not belong to you' });
      return;
    }

    // Update payment record
    const payment = await prisma.payment.update({
      where: { razorpayOrderId },
      data: {
        razorpayPaymentId,
        razorpaySignature,
        status: 'COMPLETED',
      },
    });

    // Calculate pro expiry
    const proExpiresAt = new Date();
    if (payment.plan === 'STUDENT_PRO_MONTHLY') {
      proExpiresAt.setMonth(proExpiresAt.getMonth() + 1);
    } else if (payment.plan === 'STUDENT_PRO_YEARLY') {
      proExpiresAt.setFullYear(proExpiresAt.getFullYear() + 1);
    }

    // Update user to pro
    await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        isPro: true,
        proExpiresAt,
      },
    });

    res.json({
      message: 'Payment verified successfully',
      isPro: true,
      proExpiresAt,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// GET /api/payment/history
router.get('/history', authenticate, async (req: AuthRequest, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ payments });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ error: 'Failed to get payment history' });
  }
});

export default router;
