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

    <div className="container mx-auto px-4 py-8 max-w-5xl" suppressHydrationWarning={true}>

      {/* Hero Section */}
      {!evaluationResult && (
        <div className="flex flex-col items-start text-left space-y-4 mb-8 animate-fadeInUp">
          <div className="space-y-3 max-w-2xl mb-10">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6">
              Analyze Your Resume <br />
              <span className="text-white underline decoration-white/30 underline-offset-8">
                with AI Intelligence.
              </span>
            </h1>
            <p className="text-base text-white/60 leading-relaxed">
              Get instant, data-driven insights on how your resume matches job requirements.
              Optimize your CV to pass ATS filters and land more interviews.
            </p>
          </div>

          {/* Input Section */}
          <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm shadow-2xl self-center">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="job-role" className="text-white">Target Job Role</Label>
                <Input
                  id="job-role"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  disabled={isEvaluating}
                  className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-white">Upload CV (PDF/DOCX)</Label>
                <label className="block group cursor-pointer">
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all duration-300">
                    <Upload className="h-8 w-8 mx-auto mb-3 text-white/40 group-hover:text-indigo-400 transition-colors" />
                    <p className="text-sm text-white/80 font-medium">
                      {file ? file.name : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-xs text-white/40 mt-1">Supported formats: PDF, DOC, DOCX</p>
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

              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleEvaluate}
                disabled={isEvaluating || !jobRole.trim() || !file}
                className="w-full bg-white text-black hover:bg-white/90 font-bold h-11 text-base shadow-lg shadow-indigo-500/10 transition-all"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing your profile...
                  </>
                ) : (
                  <>
                    Analyze Resume Now
                  </>
                )}
              </Button>

              {isEvaluating && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-white/40">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1 bg-white/10" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Landing Features (Only when not evaluating) */}
      {!evaluationResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 mb-12">
          {[
            {
              title: "Instant Feedback",
              desc: "Get actionable analysis in seconds, not days."
            },
            {
              title: "Job Matching",
              desc: "See exactly how well you fit specific job descriptions."
            },
            {
              title: "ATS Optimization",
              desc: "Identify missing keywords that bots are looking for."
            }
          ].map((feature, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group">
              <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Results Section - Keeping mostly same structure but cleaning up styles */}
      {evaluationResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Results Header */}
          <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">Target Risk</p>
              <h2 className="text-xl font-bold text-white max-w-md truncate">{jobRole}</h2>
            </div>
            <Button
              onClick={() => {
                setEvaluationResult(null);
                setJobRole('');
                setFile(null);
                setProgress(0);
              }}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 gap-2"
            >
              Scan Another Resume
            </Button>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Score */}
            <Card className="col-span-1 md:col-span-1 bg-black/40 border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/60">Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3">
                  <span className={`text-6xl font-bold tracking-tighter ${getScoreColor(evaluationResult.overallScore)}`}>
                    {evaluationResult.overallScore}
                  </span>
                  <span className="text-xl text-white/40 mb-2">/100</span>
                </div>
                <div className="mt-4">
                  <Badge
                    variant="outline"
                    className={`
                        ${evaluationResult.isMatch
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}
                      `}
                  >
                    {evaluationResult.isMatch ? 'Strong Match' : 'Potentially Good Fit'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card className="col-span-1 md:col-span-2 bg-black/40 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white/60">Detailed Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: 'Role Relevance', value: evaluationResult.roleRelevance },
                  { label: 'Skills Match', value: evaluationResult.skillsMatch },
                  { label: 'Experience Impact', value: evaluationResult.experienceFit },
                  { label: 'Education Alignment', value: evaluationResult.educationFit },
                  { label: 'ATS Optimization', value: evaluationResult.atsKeywordMatch },
                  { label: 'Industry Fit', value: evaluationResult.industryAlignment },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/70">{metric.label}</span>
                      <span className={getScoreColor(metric.value)}>{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-1.5 bg-white/5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skills & Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-400" />
                  Skills Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-emerald-500 mb-3">Matched Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {evaluationResult.matchedSkills.length > 0 ? (
                      evaluationResult.matchedSkills.map((skill) => (
                        <Badge key={skill} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-white/30 text-sm">No direct skill matches found.</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-amber-500 mb-3">Missing Critical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {evaluationResult.missingSkills.length > 0 ? (
                      evaluationResult.missingSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-amber-500/30 text-amber-400">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-white/30 text-sm">No critical skills missing!</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  Qualitative Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-white/50 mb-3">Key Strengths</h4>
                  <ul className="space-y-2">
                    {evaluationResult.strengths.map((strength, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-white/80">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-white/50 mb-3">Improvement Areas</h4>
                  <ul className="space-y-2">
                    {evaluationResult.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-white/80">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Suggestions */}
          <Card className="bg-indigo-500/5 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {evaluationResult.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-white/90 p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Executive Summary</h3>
            <p className="text-white/70 leading-relaxed text-sm">{evaluationResult.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
