# CV Evaluation System - Architecture Diagrams

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE LAYER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      React Frontend (Next.js 16)                       │  │
│  │                                                                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │  │
│  │  │ Job Role    │  │ CV Upload   │  │ Results Dashboard           │  │  │
│  │  │ Input       │  │ (PDF/DOCX)  │  │ - Circular Score            │  │  │
│  │  │             │  │             │  │ - Metric Breakdown          │  │  │
│  │  └──────┬──────┘  └──────┬──────┘  │ - Skills Analysis           │  │  │
│  │         │                │          │ - Strengths/Weaknesses      │  │  │
│  │         └────────────────┴──────────┴─────────────────────────────┘  │  │
│  │                                    │                                  │  │
│  └────────────────────────────────────┼──────────────────────────────────┘  │
└───────────────────────────────────────┼──────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND API LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      Next.js API Route                                │  │
│  │                      /api/evaluate-cv                                 │  │
│  │                                                                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │  │
│  │  │ File        │→ │ Text        │→ │ GROQ                        │  │  │
│  │  │ Validation  │  │ Extraction  │  │ Orchestrator               │  │  │
│  │  │             │  │             │  │                             │  │  │
│  │  │ • Type      │  │ • pdf-parse │  │ • Prompt Construction      │  │  │
│  │  │ • Size      │  │ • mammoth   │  │ • API Call                 │  │  │
│  │  │ • Content   │  │ • Clean     │  │ • JSON Parsing             │  │  │
│  │  └─────────────┘  └─────────────┘  │ • Validation                │  │  │
│  │                                    │ • Scoring                   │  │  │
│  │                                    └─────────────────────────────┘  │  │
│  └────────────────────────────────────┬──────────────────────────────────┘  │
└───────────────────────────────────────┼──────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            AI LAYER (GROQ API)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      LLaMA 3 Model (via GROQ)                         │  │
│  │                                                                        │  │
│  │  Input: Structured Prompt                                             │  │
│  │  • Job Role                                                            │  │
│  │  • CV Text                                                             │  │
│  │  • Evaluation Criteria                                                 │  │
│  │  • Scoring Rules                                                       │  │
│  │                                                                        │  │
│  │  Output: JSON Response                                                 │  │
│  │  • Role Relevance (0-100)                                              │  │
│  │  • Skills Match (0-100)                                                │  │
│  │  • Experience Fit (0-100)                                              │  │
│  │  • Education Fit (0-100)                                               │  │
│  │  • ATS Keyword Match (0-100)                                           │  │
│  │  • Industry Alignment (0-100)                                           │  │
│  │  • Strengths[]                                                          │  │
│  │  • Weaknesses[]                                                         │  │
│  │  • Recommendations[]                                                    │  │
│  │  • MatchedSkills[]                                                      │  │
│  │  • MissingSkills[]                                                      │  │
│  │  • Summary                                                              │  │
│  │  • IndustryMatch (boolean)                                              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │────▶│ Frontend │────▶│ Backend │────▶│   GROQ  │────▶│  Model  │
│Upload CV│     │ /page.tsx│     │API Route│     │  API    │     │ LLaMA 3 │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               │               │               │               │
     │               │               │               │               │
     ▼               ▼               ▼               ▼               ▼
 File Upload      Validate         Extract        Evaluate        Analyze
 (PDF/DOCX)      File Type         Text           Prompt          CV
                 Size Check       PDF/DOCX                        &
                 Validate         Preprocess                     Job Role
                 Job Role
                                                      │
                                                      ▼
                                              JSON Response
                                                      │
                                                      ▼
                                              Calculate Scores
                                                      │
                                                      ▼
                                              Return Results
                                                      │
                                                      ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Display │◀────│ Frontend │◀────│ Backend │◀────│ Results │
│Results  │     │ Update   │     │ Return  │     │  Data   │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

---

## Scoring Calculation Flow

```
AI Response Metrics          Weights          Calculation
┌─────────────────┐         ┌──────┐        ┌─────────────────┐
│ roleRelevance   │   ×     │ 25%  │   =    │ Weighted Score  │
│ (0-100)         │         └──────┘        │ (0-25)          │
└─────────────────┘                          └─────────────────┘
┌─────────────────┐         ┌──────┐        ┌─────────────────┐
│ skillsMatch     │   ×     │ 25%  │   =    │ Weighted Score  │
│ (0-100)         │         └──────┘        │ (0-25)          │
└─────────────────┘                          └─────────────────┘
┌─────────────────┐         ┌──────┐        ┌─────────────────┐
│ experienceFit   │   ×     │ 20%  │   =    │ Weighted Score  │
│ (0-100)         │         └──────┘        │ (0-20)          │
└─────────────────┘                          └─────────────────┘
┌─────────────────┐         ┌──────┐        ┌─────────────────┐
│ educationFit    │   ×     │ 15%  │   =    │ Weighted Score  │
│ (0-100)         │         └──────┘        │ (0-15)          │
└─────────────────┘                          └─────────────────┘
┌─────────────────┐         ┌──────┐        ┌─────────────────┐
│ atsKeywordMatch │   ×     │ 10%  │   =    │ Weighted Score  │
│ (0-100)         │         └──────┘        │ (0-10)          │
└─────────────────┘                          └─────────────────┘
┌─────────────────┐         ┌──────┐        ┌─────────────────┐
│ industryAlign.  │   ×     │  5%  │   =    │ Weighted Score  │
│ (0-100)         │         └──────┘        │ (0-5)           │
└─────────────────┘                          └─────────────────┘
                                                    │
                                                    ▼
                                         Overall Score (0-100)
                                                    │
                              ┌───────────────────────┴───────────────────────┐
                              │                                               │
                              ▼                                               ▼
                    Industry Match?                                  Industry Match?
                      YES (true)                                       NO (false)
                              │                                               │
                              ▼                                               ▼
                    Use Calculated                              Cap Score at 50
                    Overall Score                                  Show Warning
```

---

## Error Handling Flow

```
User Request
      │
      ▼
┌─────────────────────────────────┐
│  Validate File                 │
│  • Check file type             │
│  • Check file size             │
│  • Check job role presence     │
└─────────────────┬───────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
   Valid                  Invalid
      │                       │
      ▼                       ▼
Continue         ┌─────────────────────┐
                │ Return 400 Bad       │
                │ Request + Error Msg  │
                └─────────────────────┘
      │
      ▼
┌─────────────────────────────────┐
│  Extract Text                  │
│  • PDF: pdf-parse              │
│  • DOCX: mammoth               │
└─────────────────┬───────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
  Success                  Failure
      │                       │
      ▼                       ▼
Continue         ┌─────────────────────┐
                │ Return 422           │
                │ Unprocessable        │
                │ + Error Msg         │
                └─────────────────────┘
      │
      ▼
┌─────────────────────────────────┐
│  Call GROQ API                 │
│  • Construct Prompt            │
│  • Send Request               │
└─────────────────┬───────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
  Success                  Failure
      │                       │
      ▼                       ▼
Parse JSON       ┌─────────────────────┐
                │ Return 500           │
                │ Internal Server      │
                │ Error + Error Msg    │
                └─────────────────────┘
      │
      ▼
┌─────────────────────────────────┐
│  Validate Response              │
│  • Check required fields        │
│  • Validate score ranges        │
└─────────────────┬───────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
  Valid                  Invalid
      │                       │
      ▼                       ▼
Calculate        ┌─────────────────────┐
Scores           │ Return 500           │
& Return         │ Invalid Response    │
200 OK           └─────────────────────┘
```

---

## Component Hierarchy

```
CVEvaluationPage
├── Header
│   ├── Title
│   └── Description
├── JobRoleInput (Card)
│   ├── Label
│   └── Input Field
├── CVUpload (Card)
│   ├── Upload Area (drag-drop)
│   └── File Info Display
├── ErrorAlert (conditional)
├── EvaluateButton
│   ├── Text
│   ├── Loading Spinner
│   └── Disabled State
├── ProgressBar (conditional)
└── ResultsDashboard (conditional)
    ├── OverallScoreCard
    │   ├── Title & Badge
    │   ├── Circular Progress
    │   ├── Score Display
    │   └── Industry Alert (conditional)
    ├── DetailedScoresCard
    │   ├── 6 Metric Rows
    │   │   ├── Label
    │   │   ├── Weight Display
    │   │   ├── Progress Bar
    │   │   └── Score Value
    ├── SkillsAnalysisCards
    │   ├── MatchedSkillsCard
    │   │   ├── Title
    │   │   └── Badges Array
    │   └── MissingSkillsCard
    │       ├── Title
    │       └── Badges Array
    └── AnalysisTabs
        ├── TabsList (3 triggers)
        └── TabsContent
            ├── Summary Tab
            ├── Strengths Tab
            └── Weaknesses Tab
                ├── Weaknesses List
                └── Recommendations List
```

---

## API Request/Response Structure

```
POST /api/evaluate-cv

Request (multipart/form-data):
┌─────────────────────────────────────────┐
│ file: File (binary)                      │
│   - Type: PDF or DOCX                    │
│   - Size: Max 5MB                        │
│                                         │
│ jobRole: string                          │
│   - Example: "Senior Software Engineer"  │
└─────────────────────────────────────────┘
                │
                ▼
Response (JSON):
┌─────────────────────────────────────────┐
│ {                                       │
│   success: true,                        │
│   result: {                             │
│     overallScore: 85,                   │
│     roleRelevance: 90,                  │
│     skillsMatch: 85,                     │
│     experienceFit: 80,                   │
│     educationFit: 85,                   │
│     atsKeywordMatch: 90,                │
│     industryAlignment: 95,               │
│     strengths: [...],                    │
│     weaknesses: [...],                   │
│     recommendations: [...],               │
│     matchedSkills: [...],                │
│     missingSkills: [...],                │
│     summary: "...",                      │
│     isMatch: true,                      │
│     industryMatch: true                  │
│   },                                    │
│   requestId: "uuid"                     │
│ }                                       │
└─────────────────────────────────────────┘
```

---

## UI Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         AI CV Evaluator                                    │
│                   Get instant, AI-powered insights...                     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐                     │
│  │   Job Role           │  │   Upload CV          │                     │
│  │                      │  │                      │                     │
│  │  [Input Field]       │  │  [Drag-Drop Area]    │                     │
│  │  "Senior Eng..."     │  │  cv.pdf selected     │                     │
│  └──────────────────────┘  └──────────────────────┘                     │
│                                                                          │
│                     [Evaluate CV Button]                                  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                    ↓ (After Evaluation)
┌──────────────────────────────────────────────────────────────────────────┐
│                        Evaluation Results                                 │
│                        [Strong Match]                                     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                          ○ 85                                            │
│                      Overall Score                                       │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  Role Relevance (25%)           ■■■■■■■■■ 90                              │
│  Skills Match (25%)            ■■■■■■■■■ 85                              │
│  Experience Fit (20%)           ■■■■■■■■ 80                               │
│  Education Fit (15%)           ■■■■■■■■■ 85                              │
│  ATS Keyword Match (10%)        ■■■■■■■■■ 90                              │
│  Industry Alignment (5%)       ■■■■■■■■■■ 95                             │
├──────────────────────────────────────────────────────────────────────────┤
│  Matched Skills              │  Missing Skills                            │
│  ✓ JavaScript                │  ✗ GraphQL                                │
│  ✓ React                      │  ✗ AWS                                    │
│  ✓ Node.js                    │                                           │
├──────────────────────────────────────────────────────────────────────────┤
│  [Summary] [Strengths] [Weaknesses]                                      │
│  ─────────────────────────────────────────────────────────────────────  │
│  The candidate demonstrates strong technical skills...                    │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## UI Layout (Mobile)

```
┌────────────────────┐
│  AI CV Evaluator  │
├────────────────────┤
│                    │
│  Job Role         │
│  [Input Field]    │
│                    │
│  Upload CV        │
│  [Tap to Upload]  │
│                    │
│  [Evaluate CV]    │
└────────────────────┘
         ↓
┌────────────────────┐
│   Overall Score   │
│        85         │
├────────────────────┤
│ Role Relevance 90 │
│ Skills Match   85 │
│ Experience     80 │
│ Education      85 │
│ ATS Match      90 │
│ Industry       95 │
├────────────────────┤
│ [Matched Skills]  │
│ [Missing Skills]  │
├────────────────────┤
│ [Summary] [Str]    │
│ [Weak] [Rec]       │
└────────────────────┘
```

---

## Technology Stack Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           Frontend Stack                                  │
├──────────────────────────────────────────────────────────────────────────┤
│  Next.js 16  →  React 19  →  TypeScript 5  →  Tailwind CSS 4             │
│       │             │              │                │                     │
│       └─────────────┴──────────────┴────────────────┘                    │
│                           │                                               │
│                           ▼                                               │
│                    shadcn/ui                                             │
│  (Card, Input, Button, Badge, Progress, Tabs, Alert, etc.)              │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                           Backend Stack                                   │
├──────────────────────────────────────────────────────────────────────────┤
│  Next.js API Routes  →  TypeScript 5  →  Node.js Runtime                 │
│       │                      │                │                          │
│       └──────────────────────┴────────────────┘                          │
│                              │                                            │
│                              ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  File Processing: pdf-parse (PDF), mammoth (DOCX)              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                            │
│                              ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  AI Integration: z-ai-web-dev-sdk → GROQ API → LLaMA 3            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Security Layers

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Layer 1: Client-Side Validation                                          │
│  • File type check (whitelist)                                           │
│  • File size limit (5MB)                                                 │
│  • Job role required                                                     │
└──────────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────────┐
│ Layer 2: Server-Side Validation                                          │
│  • MIME type verification                                                │
│  • File size enforcement                                                  │
│  • Input sanitization                                                    │
└──────────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────────┐
│ Layer 3: File Processing Security                                        │
│  • Ephemeral processing (no persistence)                                 │
│  • Text extraction only (no execution)                                   │
│  • Content sanitization                                                  │
└──────────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────────┐
│ Layer 4: API Security (Recommended)                                      │
│  • Rate limiting (per-IP or per-user)                                    │
│  • Request size limits                                                   │
│  • Authentication (for enterprise features)                               │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Performance Timeline (Typical Request)

```
0ms     ─────────────────────────────────────────────────────────────────
         User uploads CV and enters job role

100ms   ─────────────────────────────────────────────────────────────────
         Frontend validation complete
         Request sent to API

500ms   ─────────────────────────────────────────────────────────────────
         Backend validation complete
         File received and buffered

1500ms  ─────────────────────────────────────────────────────────────────
         Text extraction complete
         PDF/DOCX text preprocessed

2000ms  ─────────────────────────────────────────────────────────────────
         GROQ API call initiated

2500ms  ─────────────────────────────────────────────────────────────────
         AI response received
         JSON parsed and validated

2600ms  ─────────────────────────────────────────────────────────────────
         Scores calculated
         Response sent to frontend

2700ms  ─────────────────────────────────────────────────────────────────
         Frontend receives results
         UI updated with evaluation

──────────────────────────────────────────────────────────────────────────
         Total: ~2.7 seconds
```

---

## Documentation Files

1. **CV_EVALUATION_SYSTEM_DOCS.md** - Complete technical documentation
2. **CV_EVALUATION_README.md** - User-facing README
3. **IMPLEMENTATION_SUMMARY.md** - Implementation overview
4. **ARCHITECTURE_DIAGRAMS.md** - Visual diagrams (this file)

---

## Quick Reference

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main frontend component |
| `src/app/api/evaluate-cv/route.ts` | Backend API endpoint |
| `CV_EVALUATION_SYSTEM_DOCS.md` | Technical documentation |
| `CV_EVALUATION_README.md` | Project README |
| `worklog.md` | Development log |

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/evaluate-cv` | POST | Evaluate CV against job role |
| `/api/evaluate-cv` | GET | API information |

| Dependency | Purpose |
|------------|---------|
| pdf-parse | Extract text from PDFs |
| mammoth | Extract text from DOCX |
| z-ai-web-dev-sdk | GROQ API integration |
| shadcn/ui | UI components |
| Tailwind CSS | Styling |
