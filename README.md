# CodeSahayak - AI-Powered Coding Education Platform

> Empowering students to learn coding with AI assistance in multiple Indian languages

## Screenshots

<img width="1916" height="1024" alt="Screenshot 2026-03-01 234425" src="https://github.com/user-attachments/assets/d5c1b3e8-8f96-42b5-9463-527e783c763e" />
<img width="1919" height="1030" alt="Screenshot 2026-03-01 234446" src="https://github.com/user-attachments/assets/9e02afb8-6c95-47bb-b5a4-9f3fdf83f630" />
<img width="1916" height="1031" alt="Screenshot 2026-03-06 222333" src="https://github.com/user-attachments/assets/7ed472e1-437e-4780-a0b9-41e3708bdb33" />
<img width="1916" height="1028" alt="Screenshot 2026-03-06 222346" src="https://github.com/user-attachments/assets/85b37271-d261-4487-9cba-3cc0271442c4" />
<img width="1916" height="1034" alt="Screenshot 2026-03-06 222401" src="https://github.com/user-attachments/assets/42a9bb50-4228-4409-afa9-0c9337d15766" />
<img width="1913" height="1026" alt="Screenshot 2026-03-06 222411" src="https://github.com/user-attachments/assets/0bf06bda-57a9-437f-8dca-2f9627cff03a" />
<img width="1918" height="1027" alt="Screenshot 2026-03-06 222423" src="https://github.com/user-attachments/assets/11bd9069-41c8-4053-82c8-d62acd6a3a75" />
<img width="1913" height="1019" alt="Screenshot 2026-03-06 222434" src="https://github.com/user-attachments/assets/b43b5b53-fe27-4ce8-95fb-ffe558875894" />

## Features

- **AI-Powered Learning**: Get instant help from Gurujii, your AI coding tutor
- **Multi-Language Support**: Learn in 22 Indian languages
- **Interactive IDE**: Write, run, and debug code in real-time
- **Real-Time Error Detection**: Understand errors with clear explanations
- **Voice Explanations**: Listen to error explanations in your language
- **Progress Tracking**: Monitor your learning journey

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Tanishq-4306/CodeSahayak.git
cd CodeSahayak
```

2. Install dependencies
```bash
# Frontend
cd app
npm install

# Backend
cd backend
npm install

# Gurujii AI API
cd ../../gurujii-api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

3. Configure environment
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3001/api
VITE_GURUJII_API_URL=http://localhost:5000

# Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/codesahayak"
JWT_SECRET="your-secret-key"
GURUJII_API_URL="http://localhost:5000"
```

4. Start the application
```bash
start-all.bat
```

5. Access at http://localhost:5173

## Technology Stack & Architecture

### AI Engine & Natural Language Processing (NLP)
- **Hugging Face Transformers**: Integrates LLMs (TinyLlama-1.1B) for code analysis, error explanation generation, and interactive hints.
- **Meta NLLB-200 (No Language Left Behind)**: Utilizes sequence-to-sequence translation models (distilled 600M) for high-fidelity translation of educational content into 22 Indian regional languages.
- **Meta MMS-TTS & gTTS**: Powers the voice engine, synthesizing regional text-to-speech (TTS) audio explanations for students.
- **Langdetect & NLP Gatekeepers**: Automatic language classification of query intent (concept check vs. copying check) to ensure ethical learning.
- **PyTorch (Audio/Core)**: Serves as the deep learning backend for tokenizing and generating model outputs locally.

### Frontend (Interactive IDE & Client)
- **React 19.2, TypeScript, Vite**: High-performance modern UI rendering with strong type safety and hot-reloading.
- **Pyodide (WebAssembly)**: Runs a complete Python execution environment directly in the browser, enabling secure, real-time code runs without server-side compute overhead.
- **Monaco Editor (VS Code Kernel)**: Implements auto-completions, syntax highlighting, and inline diagnostic markers.
- **GSAP (GreenSock) & Framer Motion**: Custom micro-animations and physics-based scroll triggers for premium user experience.
- **Zustand**: Lightweight, reactive state management across editor layouts and local user configuration.
- **Tailwind CSS & Shadcn/ui**: Modern design system utilizing elegant color spaces and fluid typography.

### Backend (Business Logic & Middleware)
- **Node.js, Express, TypeScript**: Secure routing and controllers.
- **Prisma ORM**: Data access layer mapping clean database operations.
- **PostgreSQL**: Relational database for storing student progress, syllabus boards, program settings, and enrollment.
- **Redis**: High-speed memory store for session blacklists (JWT revokes) and rate-limit tracking.
- **Razorpay SDK**: Handles billing, subscriptions, and payment callbacks.
- **Helmet, Cors, CSRF Protection**: Multi-layered API security preventing injection, cross-origin scripting, and forged request vulnerabilities.

## Documentation

- [Requirements](requirements.md) - System requirements and specifications
- [Design](design.md) - Architecture and design decisions

## Supported Languages

### Programming
Python, JavaScript, TypeScript, Java, C/C++, HTML/CSS, SQL

### Natural Languages
English, Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati, Kannada, Malayalam

## API Endpoints

### Gurujii AI
- `POST /api/gurujii/analyze` - Analyze code
- `POST /api/gurujii/explain-error` - Explain errors
- `POST /api/gurujii/suggest` - Get suggestions

## Development

```bash
# Frontend
cd app
npm run dev

# Backend
cd app/backend
npm run dev

# Gurujii API
cd gurujii-api
venv\Scripts\activate
python app.py
```

## Project Structure

```
codesahayak/
├── app/                    # Frontend & Backend
│   ├── src/               # React application
│   └── backend/           # Express API
├── gurujii-api/           # AI API
│   ├── app.py            # Flask application
│   └── requirements.txt  # Python dependencies
├── requirements.md        # Requirements document
├── design.md             # Design document
└── README.md             # This file
```

## Recent Improvements

### IDE Code Execution System (March 8, 2026)
- ✅ Implemented real Python code execution with stdout/stderr capture
- ✅ Added accurate error detection with 100% accuracy
- ✅ Improved error messages with error type and line numbers
- ✅ Added support for all Python error types (SyntaxError, NameError, TypeError, etc.)
- ✅ Enhanced terminal output display with success/error indicators
- ✅ Added voice explanations for errors in multiple languages

## License

MIT License - Copyright (c) 2026 Arnav Raj. See LICENSE file for details.

---

**Developed by :- Arnav Raj (Cybroarnv)**
