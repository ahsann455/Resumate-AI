'use client';

import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2, Sparkles, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (score >= 70) return 'text-emerald-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'bg-emerald-500/20 border-emerald-500/30';
    if (score >= 50) return 'bg-amber-500/20 border-amber-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-12 max-w-3xl" suppressHydrationWarning={true}>

      {/* Hero Section */}
      {!evaluationResult && (
        <div className="flex flex-col items-center text-center space-y-6 mb-10 animate-fadeInUp">
          <div className="space-y-3 max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              Analyze Your Resume
              <span className="text-white/40 block mt-2 text-sm md:text-base font-medium">with AI Intelligence.</span>
            </h1>
            <p className="text-sm text-white/50 leading-relaxed">
              Get instant, data-driven insights on how your resume matches job requirements.
            </p>
          </div>

          {/* Input Card */}
          <Card className="w-full max-w-md bg-white/[0.02] border-white/5 backdrop-blur-sm">
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-2 text-left">
                <Label htmlFor="job-role" className="text-xs text-white/60 font-medium">Target Job Role</Label>
                <Input
                  id="job-role"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  disabled={isEvaluating}
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/20 focus:border-white/20 h-10 text-sm"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-xs text-white/60 font-medium">Upload CV</Label>
                <label className="block group cursor-pointer">
                  <div className="border border-dashed border-white/10 rounded-lg p-5 text-center group-hover:border-white/20 group-hover:bg-white/[0.02] transition-all">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-white/30 group-hover:text-white/50 transition-colors" />
                    <p className="text-xs text-white/60 font-medium">
                      {file ? file.name : 'Click to upload'}
                    </p>
                    <p className="text-[10px] text-white/30 mt-1">PDF, DOC, DOCX</p>
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
                <Alert variant="destructive" className="bg-white/5 border-white/10 text-white/70 py-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-xs">Error</AlertTitle>
                  <AlertDescription className="text-xs">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleEvaluate}
                disabled={isEvaluating || !jobRole.trim() || !file}
                className="w-full bg-white text-black hover:bg-white/90 font-semibold h-10 text-sm"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </Button>

              {isEvaluating && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/30">
                    <span>Processing</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1 bg-white/5" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Insights */}
      {!evaluationResult && (
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { title: "75% of resumes rejected", desc: "Most applications never reach a human. Our AI ensures yours does." },
            { title: "6 seconds to impress", desc: "That's how long recruiters spend on initial screening. Make every word count." },
            { title: "2x more interviews", desc: "Users who optimize with Resumate report double the callback rate." }
          ].map((insight, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
              <h3 className="text-xs font-medium text-white mb-1">{insight.title}</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">{insight.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Results Section */}
      {evaluationResult && (
        <div className="space-y-5 animate-fadeInUp">
          {/* Results Header */}
          <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-lg border border-white/5">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Target Role</p>
              <h2 className="text-base font-semibold text-white truncate max-w-xs">{jobRole}</h2>
            </div>
            <Button
              onClick={() => {
                setEvaluationResult(null);
                setJobRole('');
                setFile(null);
                setProgress(0);
              }}
              variant="ghost"
              className="text-white/50 hover:text-white hover:bg-white/5 h-8 px-4 text-xs"
            >
              Scan Another
            </Button>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Overall Score */}
            <Card className={`border ${getScoreBgColor(evaluationResult.overallScore)}`}>
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-[10px] font-medium text-white/60">Match Score</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex items-end gap-1.5">
                  <span className={`text-4xl font-bold tracking-tight ${getScoreColor(evaluationResult.overallScore)}`}>
                    {evaluationResult.overallScore}
                  </span>
                  <span className="text-sm text-white/40 mb-1">/100</span>
                </div>
                <Badge
                  className={`mt-3 text-[10px] px-3 py-1 border ${evaluationResult.overallScore >= 70
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : evaluationResult.overallScore >= 50
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                >
                  {evaluationResult.overallScore >= 70 ? '✓ Strong Match' : evaluationResult.overallScore >= 50 ? '~ Good Fit' : '✗ Needs Work'}
                </Badge>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card className="col-span-2 bg-white/[0.02] border-white/5">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-[10px] font-medium text-white/40">Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-6 gap-y-3 px-4 pb-4">
                {[
                  { label: 'Role Relevance', value: evaluationResult.roleRelevance },
                  { label: 'Skills Match', value: evaluationResult.skillsMatch },
                  { label: 'Experience', value: evaluationResult.experienceFit },
                  { label: 'Education', value: evaluationResult.educationFit },
                  { label: 'ATS Score', value: evaluationResult.atsKeywordMatch },
                  { label: 'Industry Fit', value: evaluationResult.industryAlignment },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">{metric.label}</span>
                      <span className={`font-medium ${getScoreColor(metric.value)}`}>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(metric.value)}`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skills & Analysis */}
          <div className="grid grid-cols-2 gap-4">
            {/* Skills */}
            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-white/50" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-emerald-500/80 mb-2">Matched Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluationResult.matchedSkills.length > 0 ? (
                      evaluationResult.matchedSkills.slice(0, 8).map((skill) => (
                        <Badge key={skill} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] px-2 py-0.5">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-white/30 text-xs italic">No direct matches found</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-amber-500/80 mb-2">Missing Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluationResult.missingSkills.length > 0 ? (
                      evaluationResult.missingSkills.slice(0, 8).map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-amber-500/5 border-amber-500/20 text-amber-400/80 text-[10px] px-2 py-0.5">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-white/30 text-xs italic">No skills missing</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-white/50" />
                  Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-white/40 mb-2">Strengths</h4>
                  <ul className="space-y-2">
                    {evaluationResult.strengths.slice(0, 3).map((strength, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-white/70">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="leading-snug">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-white/40 mb-2">Critical Improvements</h4>
                  <ul className="space-y-2">
                    {evaluationResult.weaknesses.slice(0, 3).map((weakness, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-white/70">
                        <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                        <span className="leading-snug">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="bg-white/[0.02] border-white/5">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-white/50" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evaluationResult.recommendations.slice(0, 4).map((rec, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-white/70 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-amber-500/20 hover:bg-amber-500/5 transition-all group">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-bold shrink-0 group-hover:bg-amber-500/20">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-medium text-white mb-2">Summary</h3>
            <p className="text-white/50 text-xs leading-relaxed">{evaluationResult.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
