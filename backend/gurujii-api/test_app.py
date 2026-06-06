import app
import json

# Setup in-memory Flask test client
app.app.config['TESTING'] = True
client = app.app.test_client()

def test_routes():
    print("🚀 Starting Flask in-memory pipeline tests...")
    
    # 1. Test Health check
    print("Testing /health endpoint...")
    try:
        res = client.get('/health')
        print(f"Status Code: {res.status_code}")
        print(f"Response: {res.get_data(as_text=True)}")
    except Exception as e:
        print(f"Health check failed: {e}")
        
    print("\n✓ In-memory Flask routes test script initialized successfully!")

if __name__ == '__main__':
    test_routes()
