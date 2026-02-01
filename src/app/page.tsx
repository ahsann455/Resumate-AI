'use client';

import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2, Sparkles, ArrowRight, Zap, Target, Award, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface CVEvaluationResult {
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

interface EvaluationResponse {
  success: boolean;
  result?: CVEvaluationResult;
  error?: string;
}

export default function CVEvaluationPage() {
  const [jobRole, setJobRole] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<CVEvaluationResult | null>(null);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF or Word document');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleEvaluate = async () => {
    if (!jobRole.trim()) {
      setError('Please enter a job role');
      return;
    }
    if (!file) {
      setError('Please upload a CV');
      return;
    }

    setIsEvaluating(true);
    setError('');
    setEvaluationResult(null);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobRole', jobRole);

      const response = await fetch('/api/cv-evaluate', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Failed to evaluate CV';
        try {
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        throw new Error(errorMessage);
      }

      let data: EvaluationResponse;
      try {
        const responseText = await response.text();
        if (responseText.trim().startsWith('<')) {
          throw new Error('Server returned HTML instead of JSON. Please try again.');
        }
        data = JSON.parse(responseText) as EvaluationResponse;
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response from server. Please try again.');
      }

      if (data.success && data.result) {
        setEvaluationResult(data.result);
      } else {
        throw new Error(data.error || 'No evaluation result received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsEvaluating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
     <div className="min-h-screen bg-black text-white text-xs flex flex-col" suppressHydrationWarning={true}>
      {/* Navigation */}
      <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="px-2 py-1 flex items-center justify-start">
          <button
            onClick={() => {
              setEvaluationResult(null);
              setJobRole('');
              setFile(null);
              setProgress(0);
            }}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <img src="/resumate-logo.png" alt="Resumate AI" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain" />
            <div className="text-xs font-semibold leading-none">Resumate AI</div>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pb-12 md:pb-16">
        {/* Hero Section */}
        {!evaluationResult && (
          <div className="container mx-auto px-2 py-2 md:py-3 max-w-2xl">
          <div className="space-y-2">
            {/* Title Section */}
            <div className="space-y-1">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                Analyze Your Resume
                <br />
                <span className="text-white">
                  with AI
                </span>
              </h1>
              <p className="text-xs text-white/60 leading-tight">
                Get instant insights on how your resume matches job requirements.
              </p>
            </div>

            {/* Input Cards Section */}
            <div className="space-y-2 pt-1">
              {/* Job Role Input */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-white">Job Role</label>
                <Input
                  placeholder="e.g., Senior Engineer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  disabled={isEvaluating}
                  className="bg-white/5 border-white/10 hover:border-white/20 text-white placeholder:text-white/40 transition-colors h-7 text-xs rounded p-2"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-white">CV</label>
                <label className="block">
                  <div className="border border-dashed border-white/20 rounded-lg p-2 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                    <Upload className="h-3 w-3 mx-auto mb-0.5 text-white/60" />
                    <p className="text-xs text-white/80 line-clamp-1">{file ? file.name : 'Click to upload'}</p>
                    <p className="text-xs text-white/40 mt-0.5">PDF/DOCX</p>
                  </div>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    disabled={isEvaluating}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-red-500/30 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertTitle className="text-red-300">{error}</AlertTitle>
                </Alert>
              )}

              {/* Analyze Button */}
              <div className="pt-1">
                <Button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !jobRole.trim() || !file}
                  size="sm"
                  className="w-full bg-white text-black hover:bg-white/90 text-xs font-semibold h-7 rounded transition-all duration-300"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze My Resume
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {/* Progress */}
              {isEvaluating && (
                <div className="space-y-1">
                  <Progress value={progress} className="h-0.5" />
                  <p className="text-xs text-white/50 text-center">Analyzing your CV with AI...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

        {/* Results Section */}
        {evaluationResult && (
          <div className="container mx-auto px-2 py-2 md:py-3 max-w-2xl">
            <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-xs">For: {jobRole}</p>
              </div>
              <Button
                onClick={() => {
                  setEvaluationResult(null);
                  setJobRole('');
                  setFile(null);
                  setProgress(0);
                }}
                variant="outline"
                size="sm"
                className="border-white/10 hover:border-white/20 hover:bg-white/5 text-xs h-7"
              >
                New
              </Button>
            </div>

            <Separator className="bg-white/10" />

            {/* Overall Score */}
            <div className="space-y-1">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${getScoreColor(evaluationResult.overallScore)}`}>
                    {evaluationResult.overallScore}%
                  </span>
                  <p className="text-xs text-white/60">Match</p>
                </div>
                <Badge
                  className={`text-xs ${
                    evaluationResult.isMatch
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  } border`}
                >
                  {evaluationResult.isMatch ? 'Strong' : 'Moderate'}
                </Badge>
              </div>
              {!evaluationResult.industryMatch && (
                <p className="text-xs text-amber-400">Note: This is a cross-industry transition</p>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { label: 'Role', value: evaluationResult.roleRelevance },
                { label: 'Skills', value: evaluationResult.skillsMatch },
                { label: 'Experience', value: evaluationResult.experienceFit },
                { label: 'Education', value: evaluationResult.educationFit },
                { label: 'ATS', value: evaluationResult.atsKeywordMatch },
                { label: 'Industry', value: evaluationResult.industryAlignment },
              ].map((metric) => (
                <div key={metric.label} className="space-y-0.5 p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/60">{metric.label}</p>
                    <span className={`text-xs font-bold ${getScoreColor(metric.value)}`}>{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-1.5" />
                </div>
              ))}
            </div>

            <Separator className="bg-white/10" />

            {/* Skills Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-emerald-400">Matched Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {evaluationResult.matchedSkills.length > 0 ? (
                    evaluationResult.matchedSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 border"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-white/40">No skills matched</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-amber-400">Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {evaluationResult.missingSkills.length > 0 ? (
                    evaluationResult.missingSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-amber-500/20 text-amber-300 border-amber-500/30 border"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-white/40">No missing skills</p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold">Strengths</h3>
                <ul className="space-y-1">
                  {evaluationResult.strengths.map((strength, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Areas to Improve</h3>
                <ul className="space-y-2">
                  {evaluationResult.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-white/80">
                      <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Recommendations */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                Personalized Recommendations
              </h3>
              <ol className="space-y-2">
                {evaluationResult.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-white/80">
                    <span className="text-indigo-400 font-bold flex-shrink-0">{idx + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Separator className="bg-white/10" />

            {/* Summary */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Summary</h3>
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{evaluationResult.summary}</p>
            </div>
          </div>
        </div>
      )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-black/95 py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <img src="/resumate-logo.png" alt="Resumate AI" className="w-10 h-10 object-contain" />
                <div>
                  <div className="text-sm font-semibold">Resumate AI</div>
                  <p className="text-xs text-white/60">Intelligent resume analysis to help you get interviews.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-none">
              <div>
                <h4 className="text-xs font-semibold mb-2">Product</h4>
                <ul className="space-y-1 text-xs text-white/60">
                  <li className="cursor-pointer">Resume Analysis</li>
                  <li className="cursor-pointer">Job Matching</li>
                  <li className="cursor-pointer">ATS Optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-2">Company</h4>
                <ul className="space-y-1 text-xs text-white/60">
                  <li className="cursor-pointer">About</li>
                  <li className="cursor-pointer">Blog</li>
                  <li className="cursor-pointer">Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-2">Legal</h4>
                <ul className="space-y-1 text-xs text-white/60">
                  <li className="cursor-pointer">Privacy</li>
                  <li className="cursor-pointer">Terms</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 my-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <div>&copy; 2025 Resumate AI. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <div className="cursor-pointer hover:underline">Privacy</div>
              <div className="cursor-pointer hover:underline">Terms</div>
              <div className="text-white/40">Built with AI</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
