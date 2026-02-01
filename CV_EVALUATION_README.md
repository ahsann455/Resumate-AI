# AI-Powered CV Evaluation Platform

A production-ready web application that evaluates CVs against job roles using GROQ API with LLaMA 3 models. Get instant, AI-powered insights on how well a CV matches a specific role.

## 🚀 Features

### Core Functionality
- **CV Upload**: Support for PDF and Word documents (DOCX)
- **Job Role Input**: Enter any job role or position for evaluation
- **AI-Powered Analysis**: Uses GROQ's LLaMA 3 models for intelligent evaluation
- **Multi-Metric Scoring**: Evaluates across 6 dimensions with weighted scoring
- **Explainable Results**: Clear strengths, weaknesses, and actionable recommendations

### Evaluation Metrics

| Metric | Weight | Description |
|--------|--------|-------------|
| Role Relevance | 25% | How well the CV aligns with the job role |
| Skills Match | 25% | Percentage of required skills present in CV |
| Experience Fit | 20% | Relevance of candidate's experience |
| Education Fit | 15% | Alignment of education with requirements |
| ATS Keyword Match | 10% | Important keywords for the role |
| Industry Alignment | 5% | Background consistency with industry |

### User Experience
- **Real-Time Feedback**: Ultra-fast evaluation using GROQ's low-latency API
- **Visual Score Display**: Color-coded scores (green/amber/red)
- **Detailed Insights**: Matched skills, missing skills, and recommendations
- **Industry Mismatch Detection**: Warnings for cross-industry mismatches
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, TypeScript
- **File Processing**: pdf-parse (PDF), mammoth (DOCX)
- **AI/LLM**: GROQ API via z-ai-web-dev-sdk (LLaMA 3 models)
- **UI Components**: shadcn/ui (Radix UI primitives)

### System Flow

```
User Upload CV → File Validation → Text Extraction → GROQ Analysis → Score Calculation → Results Display
```

### Why GROQ?

1. **Ultra-Low Latency**: 200-500ms average response time
2. **High Throughput**: Supports concurrent evaluations
3. **Deterministic Outputs**: Consistent JSON-structured responses
4. **Cost-Effective**: Optimized for production workloads

## 📦 Installation

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# The app will be available at http://localhost:3000
```

## 🔧 Usage

### Via Web Interface

1. Navigate to `http://localhost:3000`
2. Enter the target job role (e.g., "Senior Software Engineer")
3. Upload your CV (PDF or DOCX, max 5MB)
4. Click "Evaluate CV"
5. View detailed evaluation results

### Via API

```bash
# Evaluate a CV against a job role
curl -X POST http://localhost:3000/api/evaluate-cv \
  -F "file=@path/to/cv.pdf" \
  -F "jobRole=Senior Software Engineer"
```

## 📊 Response Format

```json
{
  "success": true,
  "result": {
    "overallScore": 85,
    "roleRelevance": 90,
    "skillsMatch": 85,
    "experienceFit": 80,
    "educationFit": 85,
    "atsKeywordMatch": 90,
    "industryAlignment": 95,
    "strengths": [
      "Strong technical skills in relevant technologies",
      "Consistent career progression",
      "Relevant project experience"
    ],
    "weaknesses": [
      "Limited experience with specific framework",
      "Could emphasize leadership achievements more"
    ],
    "recommendations": [
      "Add quantifiable achievements to experience section",
      "Highlight leadership and mentoring experience",
      "Include relevant certifications"
    ],
    "matchedSkills": ["JavaScript", "React", "Node.js"],
    "missingSkills": ["GraphQL", "AWS"],
    "summary": "Overall strong candidate with excellent technical skills...",
    "isMatch": true,
    "industryMatch": true
  },
  "requestId": "uuid"
}
```

## 🎯 Scoring Interpretation

- **80-100**: Excellent match - Strong candidate
- **70-79**: Good match - Viable candidate
- **60-69**: Moderate match - Potential with improvements
- **50-59**: Weak match - Significant gaps
- **<50**: Poor match - Industry mismatch or major gaps

## 🔒 Security

- File type validation (whitelist approach)
- File size limits (max 5MB)
- Input sanitization
- Rate limiting recommended for production
- No persistent file storage (ephemeral processing)

## 🚀 Production Considerations

### Recommended Enhancements

1. **Add Rate Limiting**
   - Implement per-IP or per-user limits
   - Prevent API abuse

2. **Add Caching**
   - Cache common job role prompts
   - Use Redis for response caching

3. **Database Integration**
   - Store evaluation history
   - Analytics and insights
   - User profiles

4. **Queue System**
   - For high-volume deployments
   - Async processing with webhooks

5. **Monitoring**
   - Track API response times
   - Monitor error rates
   - Set up alerts

## 📚 Documentation

For comprehensive technical documentation, see [CV_EVALUATION_SYSTEM_DOCS.md](./CV_EVALUATION_SYSTEM_DOCS.md)

Documentation includes:
- Detailed system architecture
- AI evaluation layer design
- Prompt engineering strategy
- API endpoint specifications
- Security considerations
- Scalability recommendations

## 🧪 Testing

### Manual Testing

1. Upload a PDF CV for "Software Engineer" role
2. Upload the same CV for "Nurse" role
3. Verify industry mismatch detection
4. Test with different file formats (PDF, DOCX)
5. Test with various job roles

### Expected Behaviors

- ✅ Proper evaluation for matching industry/role
- ✅ Low overall score for industry mismatch
- ✅ Clear warning for cross-industry applications
- ✅ Detailed strengths and weaknesses
- ✅ Actionable recommendations
- ✅ Error handling for invalid files

## 📈 Future Enhancements

1. **Multi-CV Comparison**: Compare multiple CVs for same role
2. **Custom Job Descriptions**: Upload full JD instead of just title
3. **CV Generation Suggestions**: AI-powered CV improvement tips
4. **ATS Integration**: Export results to ATS systems
5. **Advanced Analytics**: Trend analysis and benchmarking

## 🤝 Contributing

This is a production-ready application designed for evaluation and deployment. For modifications or enhancements, refer to the technical documentation.

## 📄 License

This project is part of the Next.js AI-Powered Applications portfolio.

## 👤 Author

Built as a comprehensive AI product demonstrating GROQ integration for CV evaluation.

---

## 🎯 Key Design Decisions

### Deterministic AI Outputs
- Low temperature settings (thinking disabled)
- Strict JSON output format
- Consistent scoring without hallucinations

### Industry Mismatch Detection
- Heavily penalizes cross-industry applications
- Caps overall score at 50 for mismatches
- Provides clear warning to users

### Explainable AI
- Detailed metric breakdown
- Specific strengths and weaknesses
- Actionable recommendations
- No "black box" evaluations

### Scalability
- Stateless API design
- Horizontal scaling capability
- Ready for caching layer
- Queue system optional for high volume

---

**Built with ❤️ using GROQ API and LLaMA 3 models**
