'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    title: "Account created!",
                    description: "Please log in with your new credentials.",
                });
                router.push('/login');
            } else {
                const error = await response.text();
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error || "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to connect to the server.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
            <div className="w-full max-w-md animate-fadeInUp">
                <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm">
                    <CardHeader className="space-y-1 text-center pb-8">
                        <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
                        <CardDescription className="text-white/40 text-xs">
                            Enter your details to get started with Resumate AI
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-white/30" />
                                    <Input
                                        placeholder="Full Name"
                                        className="pl-10 bg-white/5 border-white/10 text-white h-10 text-sm focus:ring-white/20"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/30" />
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="pl-10 bg-white/5 border-white/10 text-white h-10 text-sm focus:ring-white/20"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-white/30" />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="pl-10 bg-white/5 border-white/10 text-white h-10 text-sm focus:ring-white/20"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-white/90 h-10 font-semibold group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        Sign Up
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                        <div className="mt-6 text-center text-xs text-white/40">
                            Already have an account?{' '}
                            <Link href="/login" className="text-white hover:underline transition-all">
                                Log in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
