# CodeSahayak - Design Document

## System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  (React Frontend - Browser/Mobile)                       │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/REST API
┌────────────────────┴────────────────────────────────────┐
│                 Application Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Frontend   │  │   Backend    │  │  Gurujii AI  │  │
│  │   (Vite)     │  │  (Express)   │  │   (Flask)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                   Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL  │  │  File Store  │  │  AI Models   │  │
│  │  (Database)  │  │   (Static)   │  │   (Cache)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Frontend Design

### Component Structure
```
App
├── LandingPage
│   ├── Navbar
│   ├── HeroSection
│   ├── FeaturesSection
│   ├── StudentsSection
│   ├── TeachersSection
│   ├── PricingSection
│   └── Footer
├── AuthPage
│   ├── LoginForm
│   └── RegisterForm
├── DashboardPage (Student)
│   ├── StatsCards
│   ├── ProgressChart
│   ├── RecentSubmissions
│   └── Achievements
├── TeacherDashboardPage
│   ├── ClassOverview
│   ├── StudentList
│   ├── AssignmentManager
│   └── Analytics
└── IDEPage
    ├── FileExplorer
    ├── CodeEditor
    ├── Terminal
    ├── AIAssistant
    └── Toolbar
```

### State Management (Zustand)
```typescript
// Auth Store
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials) => Promise<void>;
  logout: () => void;
}

// IDE Store
interface IDEState {
  files: FileNode[];
  openTabs: Tab[];
  activeTabId: string | null;
  terminalOutputs: TerminalOutput[];
  aiMessages: AIChatMessage[];
  theme: 'dark' | 'light';
}

// UI Store
interface UIState {
  sidebarVisible: boolean;
  terminalVisible: boolean;
  aiPanelVisible: boolean;
  modals: { [key: string]: boolean };
}
```

### Routing Structure
```
/ - Landing Page
/auth - Authentication
/dashboard - Student Dashboard
/teacher-dashboard - Teacher Dashboard
/ide - Code Editor/IDE
/editor - Alternative Editor View
```

## Backend Design

### API Structure
```
/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   └── POST /refresh
├── /users
│   ├── GET /profile
│   ├── PUT /profile
│   └── GET /stats
├── /assignments
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   ├── PUT /:id
│   ├── DELETE /:id
│   └── POST /:id/submit
├── /submissions
│   ├── GET /
│   ├── GET /:id
│   └── PUT /:id/grade
└── /gurujii (proxy to AI API)
    ├── POST /analyze
    ├── POST /explain-error
    └── POST /suggest
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('STUDENT', 'TEACHER', 'ADMIN'),
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Assignments Table
```sql
CREATE TABLE assignments (
  id UUID PRIMARY KEY,
  teacher_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  language VARCHAR(50),
  difficulty ENUM('EASY', 'MEDIUM', 'HARD'),
  due_date TIMESTAMP,
  test_cases JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Submissions Table
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id),
  student_id UUID REFERENCES users(id),
  code TEXT NOT NULL,
  status ENUM('PENDING', 'PASSED', 'FAILED'),
  score INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMP DEFAULT NOW()
);
```

#### Progress Table
```sql
CREATE TABLE progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  concept VARCHAR(255) NOT NULL,
  mastery_level INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  last_practiced TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## AI Engine Design (Gurujii)

### Model Pipeline
```
User Code Input
      ↓
Code Analysis (TinyLlama)
      ↓
Error Detection (Python exec)
      ↓
Explanation Generation
      ↓
Translation (NLLB-200)
      ↓
Voice Synthesis (MMS-TTS)
      ↓
Response to User
```

### API Endpoints

#### Analyze Code
```python
@app.route('/api/gurujii/analyze', methods=['POST'])
def analyze_code():
    # Input: code, message, language
    # Process: Execute code, detect errors, generate explanation
    # Output: explanation, hasError, errorType, voiceUrl
```

#### Explain Error
```python
@app.route('/api/gurujii/explain-error', methods=['POST'])
def explain_error():
    # Input: code, error, language
    # Process: Match error type, generate explanation
    # Output: explanation, errorType, voiceUrl
```

#### Get Suggestions
```python
@app.route('/api/gurujii/suggest', methods=['POST'])
def get_suggestions():
    # Input: code, context, language
    # Process: Analyze code, generate suggestions
    # Output: suggestion
```

## UI/UX Design

### Color Palette
```css
Primary: #6C5CE7 (Purple)
Secondary: #2E86AB (Blue)
Accent: #FF6B35 (Orange)
Success: #00D9A5 (Green)
Error: #FF5252 (Red)
Warning: #FFA726 (Amber)

Background: #F6F7FB (Light Gray)
Surface: #FFFFFF (White)
Text Primary: #1A1D2B (Dark)
Text Secondary: #636E72 (Gray)
```

### Typography
```css
Font Family: 'Inter', sans-serif
Code Font: 'JetBrains Mono', monospace

Headings:
  H1: 48px / 600
  H2: 36px / 600
  H3: 24px / 600
  H4: 20px / 600

Body:
  Large: 18px / 400
  Regular: 16px / 400
  Small: 14px / 400
  Tiny: 12px / 400
```

### Spacing System
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Component Design

#### Button Variants
- Primary: Filled with primary color
- Secondary: Outlined with primary color
- Ghost: Transparent with hover effect
- Danger: Red for destructive actions

#### Card Design
- White background
- Subtle shadow
- Rounded corners (12px)
- Padding: 24px
- Border: 1px solid #E8EAF6

#### Input Fields
- Height: 44px
- Border radius: 8px
- Border: 1px solid #E8EAF6
- Focus: 2px ring with primary color
- Padding: 12px 16px

## Code Editor Design

### Monaco Editor Configuration
```typescript
{
  theme: 'vs-dark' | 'vs-light',
  fontSize: 14,
  fontFamily: 'JetBrains Mono',
  lineNumbers: 'on',
  minimap: { enabled: true },
  wordWrap: 'on',
  autoIndent: 'full',
  formatOnPaste: true,
  formatOnType: true,
  suggestOnTriggerCharacters: true,
  quickSuggestions: true,
  tabSize: 4,
  insertSpaces: true
}
```

### Terminal Design
- Dark theme (#1E1E2E background)
- Monospace font
- Color-coded output (green for input, red for errors)
- Resizable height
- Command history
- Auto-scroll to bottom

### AI Assistant Panel
- Fixed width: 320px
- Resizable
- Chat interface
- Quick action buttons
- Voice playback controls
- Copy response button

## Animation Design

### Page Transitions
- Fade in: 300ms ease-out
- Slide up: 400ms ease-out
- Scale: 200ms ease-in-out

### Micro-interactions
- Button hover: 150ms
- Card hover: 200ms
- Input focus: 150ms
- Modal open: 300ms

### Loading States
- Spinner for async operations
- Skeleton screens for content loading
- Progress bars for file uploads
- Shimmer effect for placeholders

## Responsive Design

### Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile Adaptations
- Collapsible sidebar
- Bottom navigation
- Touch-friendly buttons (min 44px)
- Simplified layouts
- Reduced animations

## Security Design

### Authentication Flow
```
1. User submits credentials
2. Backend validates credentials
3. Generate JWT token (7 days expiry)
4. Return token + user data
5. Store token in memory (not localStorage)
6. Include token in Authorization header
7. Refresh token before expiry
```

### Authorization
- Role-based access control (RBAC)
- Route guards on frontend
- Middleware on backend
- Permission checks on API endpoints

### Data Protection
- Password hashing (bcrypt, 10 rounds)
- HTTPS only in production
- CORS with whitelist
- Rate limiting (100 req/15min)
- Input sanitization
- SQL injection prevention (Prisma)
- XSS protection (React escaping)

## Performance Optimization

### Frontend
- Code splitting by route
- Lazy loading components
- Image optimization (WebP)
- Bundle size < 500KB
- Tree shaking
- Minification
- Compression (gzip/brotli)

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Response caching
- Compression middleware
- Rate limiting

### AI API
- Model caching in memory
- Request batching
- Response streaming
- GPU acceleration (if available)
- Model quantization

## Error Handling

### Frontend
- Error boundaries for React
- Toast notifications for user errors
- Fallback UI for crashes
- Retry logic for failed requests
- Offline detection

### Backend
- Try-catch blocks
- Error middleware
- Structured error responses
- Error logging
- Graceful degradation

### AI API
- Model loading fallbacks
- Timeout handling
- Error explanation fallbacks
- Voice generation fallbacks

## Testing Strategy

### Unit Tests
- Component tests (React Testing Library)
- Utility function tests
- API endpoint tests
- Model function tests

### Integration Tests
- API integration tests
- Database integration tests
- AI model integration tests

### E2E Tests
- User flow tests
- Critical path tests
- Cross-browser tests

## Deployment Architecture

### Development
```
Local Machine
├── Frontend (Vite dev server)
├── Backend (tsx watch)
└── Gurujii API (Flask debug)
```

### Production
```
Cloud Infrastructure
├── Frontend (CDN + Static hosting)
├── Backend (Container/VPS)
├── Gurujii API (Container/VPS)
└── Database (Managed PostgreSQL)
```

---

**Developed by Hood_Technoid**
