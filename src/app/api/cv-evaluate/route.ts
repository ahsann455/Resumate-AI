/**
 * CV Evaluation API - Simple & Reliable
 * Uses pdf2json for PDF text extraction
 * Uses mammoth for DOCX text extraction
 * Uses GROQ AI for evaluation
 */
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

interface CVEvaluationMetrics {
  overallScore: number;
  roleRelevance: number;
  skillsMatch: number;
  experienceFit: number;
  educationFit: number;
  atsKeywordMatch: number;
  industryAlignment: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  matchedSkills: string[];
  missingSkills: string[];
  summary: string;
  isMatch: boolean;
  industryMatch: boolean;
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class FileProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileProcessingError';
  }
}

class AIEvaluationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AIEvaluationError';
  }
}

function validateFile(file: File): void {
  if (!file) {
    throw new ValidationError('No file provided');
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new ValidationError('Invalid file type. Please upload a PDF or Word document');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError('File size exceeds 5MB limit');
  }
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  console.log('[PDF] Extracting text...');

  return new Promise((resolve, reject) => {
    const PDFParser = require('pdf2json');
    const pdfParser = new PDFParser(null, 1);

    pdfParser.on('pdfParser_dataError', (err: any) => {
      console.error('[PDF] Parse error:', err);
      reject(new FileProcessingError('Failed to parse PDF. The file may be corrupted or password-protected.'));
    });

    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      try {
        let text = '';

        if (pdfData.Pages && Array.isArray(pdfData.Pages)) {
          pdfData.Pages.forEach((page: any) => {
            if (page.Texts && Array.isArray(page.Texts)) {
              page.Texts.forEach((textItem: any) => {
                if (textItem.R && Array.isArray(textItem.R)) {
                  textItem.R.forEach((r: any) => {
                    if (r.T) {
                      text += decodeURIComponent(r.T) + ' ';
                    }
                  });
                }
              });
            }
          });
        }

        text = text.trim();

        if (!text || text.length < 50) {
          reject(new FileProcessingError('Could not extract readable text from PDF. The PDF may be a scanned image or contain no extractable text. Please convert to DOCX format.'));
          return;
        }

        console.log('[PDF] Text extracted, length:', text.length);
        console.log('[PDF] Preview:', text.substring(0, 200));
        resolve(text);
      } catch (err) {
        console.error('[PDF] Processing error:', err);
        reject(new FileProcessingError('Failed to extract text from PDF'));
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  console.log('[DOCX] Extracting text...');

  try {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value.trim();

    if (text.length < 50) {
      throw new FileProcessingError('DOCX file appears to be empty');
    }

    console.log('[DOCX] Text extracted, length:', text.length);
    return text;
  } catch (err) {
    console.error('[DOCX] Error:', err);
    throw new FileProcessingError('Failed to extract text from DOCX');
  }
}

function preprocessText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s\-\.,;:@()\/\+]/g, ' ')
    .trim();
}

function constructPrompt(jobRole: string, cvText: string): string {
  return `You are an expert recruiter and ATS (Applicant Tracking System) evaluator.

**Job Role:** ${jobRole}

**CV Content:**
${cvText.substring(0, 15000)}

**Evaluation Criteria:**
1. Role Relevance (25%): How well does the CV match this job?
2. Skills Match (25%): What percentage of required skills are present?
3. Experience Fit (20%): Does the candidate have relevant experience?
4. Education Fit (15%): Does education match the role?
5. ATS Keyword Match (10%): Important keywords present?
6. Industry Alignment (5%): Industry fit. Penalize heavily for mismatch.

**Important:**
- Be honest, don't inflate scores
- Set industryMatch=false for cross-industry mismatches
- Max 70 points if no relevant experience
- Max 80 points if key skills missing
- Overall score = weighted average of all 6 metrics
- Apply 50-point cap if industryMatch is false

**Output JSON only:**
{
  "roleRelevance": number (0-100),
  "skillsMatch": number (0-100),
  "experienceFit": number (0-100),
  "educationFit": number (0-100),
  "atsKeywordMatch": number (0-100),
  "industryAlignment": number (0-100),
  "strengths": [3-5 items],
  "weaknesses": [3-5 items],
  "recommendations": [3-5 items],
  "matchedSkills": [skill names],
  "missingSkills": [skill names],
  "summary": "2-3 paragraph summary",
  "industryMatch": boolean,
  "isMatch": boolean (true if overall >= 70)
}`;
}

async function evaluateWithGROQ(requestId: string, jobRole: string, cvText: string): Promise<CVEvaluationMetrics> {
  console.log(`[${requestId}] Calling GROQ AI...`);

  try {
    // Bypass SDK: call GROQ AI HTTP API directly to avoid SDK default `thinking` field
    const fs = await import('fs/promises');
    const os = await import('os');
    const path = await import('path');

    async function loadConfig(): Promise<{ baseUrl: string; apiKey: string }> {
      const homeDir = os.homedir();
      const configPaths = [
        path.join(process.cwd(), '.z-ai-config'),
        path.join(homeDir, '.z-ai-config'),
        '/etc/.z-ai-config',
      ];

      for (const filePath of configPaths) {
        try {
          const configStr = await fs.readFile(filePath, 'utf-8');
          const config = JSON.parse(configStr);
          if (config.baseUrl && config.apiKey) return { baseUrl: config.baseUrl, apiKey: config.apiKey };
        } catch (err: any) {
          if (err?.code !== 'ENOENT') console.error(`Error reading config ${filePath}:`, err);
        }
      }

      // Fallback to environment variables
      const baseUrl = process.env.ZAI_BASE_URL || process.env.Z_AI_BASE_URL || process.env.ZAI_BASEURL;
      const apiKey = process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY || process.env.ZAI_KEY || process.env.Z_AI_KEY;
      if (baseUrl && apiKey) return { baseUrl, apiKey };

      throw new Error('GROQ AI config not found. Create .z-ai-config or set ZAI_API_KEY / ZAI_BASE_URL env vars.');
    }

    const prompt = constructPrompt(jobRole, cvText);
    console.log(`[${requestId}] Prompt length: ${prompt.length}`);

    const { baseUrl, apiKey } = await loadConfig();

    const url = `${baseUrl.replace(/\/$/, '')}/chat/completions`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Z-AI-From': 'Z',
    };

    const body = {
      model: process.env.ZAI_MODEL || process.env.Z_AI_MODEL || 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
    };

    const resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!resp.ok) {
      const text = await resp.text();
      throw new AIEvaluationError(`API request failed with status ${resp.status}: ${text}`);
    }

    const completion = await resp.json();
    const responseText = completion?.choices?.[0]?.message?.content;
    if (!responseText) {
      throw new AIEvaluationError('No response from AI');
    }

    console.log(`[${requestId}] Response received, length: ${responseText.length}`);

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new AIEvaluationError('Invalid AI response format');
    }

    const result = JSON.parse(jsonMatch[0]);

    const required = [
      'roleRelevance', 'skillsMatch', 'experienceFit', 'educationFit',
      'atsKeywordMatch', 'industryAlignment', 'strengths', 'weaknesses',
      'recommendations', 'matchedSkills', 'missingSkills', 'summary',
      'industryMatch', 'isMatch'
    ] as const;

    for (const field of required) {
      if (!(field in result)) {
        throw new AIEvaluationError(`Missing field: ${field}`);
      }
    }

    const overallScore = Math.round(
      result.roleRelevance * 0.25 +
      result.skillsMatch * 0.25 +
      result.experienceFit * 0.20 +
      result.educationFit * 0.15 +
      result.atsKeywordMatch * 0.10 +
      result.industryAlignment * 0.05
    );

    result.overallScore = result.industryMatch ? overallScore : Math.min(overallScore, 50);

    console.log(`[${requestId}] Score: ${result.overallScore}`);
    return result;
  } catch (err) {
    console.error(`[${requestId}] Error:`, err);
    if (err instanceof AIEvaluationError) throw err;
    throw new AIEvaluationError(`AI evaluation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const jobRole = formData.get('jobRole') as string | null;

    if (!jobRole?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Job role is required' },
        { status: 400 }
      );
    }

    validateFile(file!);
    console.log(`[${requestId}] File: ${file!.name}, ${file!.size} bytes`);

    const buffer = Buffer.from(await file!.arrayBuffer());
    let cvText = '';

    if (file!.type === 'application/pdf') {
      cvText = await extractTextFromPDF(buffer);
    } else if (file!.type === 'application/msword' ||
               file!.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cvText = await extractTextFromDOCX(buffer);
    } else {
      throw new ValidationError('Unsupported file type');
    }

    console.log(`[${requestId}] Extracted text: ${cvText.length} chars`);

    const processedText = preprocessText(cvText);
    if (processedText.length < 50) {
      throw new FileProcessingError('Extracted text too short for evaluation');
    }

    const result = await evaluateWithGROQ(requestId, jobRole.trim(), processedText);

    return NextResponse.json({
      success: true,
      result,
      requestId,
    });
  } catch (err) {
    console.error(`[${requestId}] Error:`, err);

    const status =
      err instanceof ValidationError ? 400 :
      err instanceof FileProcessingError ? 422 :
      err instanceof AIEvaluationError ? 500 : 500;

    const message = err instanceof Error ? err.message : 'Unknown error';

    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/cv-evaluate',
    method: 'POST',
    description: 'Evaluate CV against job role using AI',
    accepts: 'PDF or DOCX (max 5MB)',
  });
}
