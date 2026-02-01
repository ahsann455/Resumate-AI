# Resumate AI

**Intelligent Resume Analysis & CV Evaluation Tool**

Transform your resume with AI-powered analysis, personalized feedback, and job matching insights.

## 🚀 Features

- **Instant Resume Analysis**: Get AI-powered insights on your CV in seconds
- **Job Matching**: Find out how well your resume matches specific job roles
- **Skill Analysis**: Identify matched and missing skills for the target position
- **ATS Optimization**: Discover if your resume passes Applicant Tracking System filters
- **Personalized Recommendations**: Get actionable advice to improve your resume
- **Multiple Metrics**: Role relevance, skills match, experience fit, education fit, and more

## 🎨 Design

Resumate AI features a modern, professional dark-mode interface with:
- Gradient backgrounds and smooth animations
- Responsive design for desktop, tablet, and mobile
- Accessibility optimized with semantic HTML
- Fast loading times with optimized assets
- Modern card-based layout with glass-morphism effects

## 📊 Technology Stack

- **Frontend**: Next.js 16.1.3 with TypeScript
- **Styling**: Tailwind CSS 3.4.1 with custom animations
- **UI Components**: shadcn/ui with Radix UI
- **AI Integration**: GROQ AI (llama-3.3-70b-versatile model)
- **PDF Processing**: pdf2json for text extraction
- **Document Processing**: Mammoth.js for DOCX files
- **Database**: Prisma ORM (optional)

## 🔧 Installation

```bash
# Install dependencies
npm install
# or
bun install

# Configure environment variables
cp .env.example .env.local
# Update with your GROQ AI API key

# Run development server
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Usage

1. **Enter Target Role**: Type the job position you're applying for
2. **Upload Resume**: Upload your CV in PDF or Word format (max 5MB)
3. **Analyze**: Click "Analyze My Resume" to get instant feedback
4. **Review Results**: Check your overall score, skill matches, and personalized recommendations

## 🔍 SEO Optimization

Resumate AI is fully optimized for search engines:

- **Meta Tags**: Title, description, and Open Graph tags
- **Structured Data**: Schema.org JSON-LD for software applications
- **Sitemap**: XML sitemap for search engine indexing
- **Robots.txt**: Properly configured for crawler access
- **Keywords**: Optimized for resume analysis, CV evaluation, and job matching searches
- **Performance**: Fast page loads with optimized images and code splitting
- **Mobile Friendly**: Responsive design for all devices
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels

## 📋 Evaluation Metrics

The AI evaluates resumes on 6 key metrics:

1. **Role Relevance (25%)**: How well the CV matches the job description
2. **Skills Match (25%)**: Percentage of required skills present
3. **Experience Fit (20%)**: Relevant work experience
4. **Education Fit (15%)**: Educational background alignment
5. **ATS Keyword Match (10%)**: Important keywords for tracking systems
6. **Industry Alignment (5%)**: Industry fit and cross-industry transitions

## 🛡️ Privacy & Security

- Resumes are processed securely and not stored permanently
- All data transmissions are encrypted
- GDPR and privacy compliant
- No third-party data sharing

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm run build
# Deploy using Vercel CLI or connect your GitHub repository
```

### Deploy to Other Platforms

The application includes a standalone build output compatible with:
- Node.js servers
- Docker containers
- Serverless functions
- Traditional VPS hosting

## 📞 Support

For issues, feature requests, or questions, please contact us at support@resumate.ai

## 📄 License

This project is proprietary software. All rights reserved © 2025 Resumate AI

---

**Resumate AI** - Your intelligent resume assistant powered by advanced AI
