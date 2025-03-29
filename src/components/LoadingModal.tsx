"use client";

import { useEffect, useState } from "react";

interface LoadingModalProps {
    promise?: Promise<any>;
    estimatedDuration?: number;
}

export default function LoadingModal({
    promise,
    estimatedDuration = 8000
}: LoadingModalProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!promise) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    const newProgress = prev + (100 / (estimatedDuration / 100));
                    return newProgress >= 95 ? 95 : newProgress;
                });
            }, 100);
            return () => clearInterval(interval);
        }

        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const calculatedProgress = Math.min(95, (elapsed / estimatedDuration) * 100);
            setProgress(calculatedProgress);
        }, 100);

        promise.finally(() => {
            setProgress(100);
            setTimeout(() => {
            }, 300);
        });

        return () => clearInterval(interval);
    }, [promise, estimatedDuration]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4 w-72">
                <div className="w-12 h-12 border-[3px] border-gray-200 border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
                <div className="text-center space-y-1">
                    <p className="font-medium text-gray-800">Loading Content ...</p>
                    <p className="text-sm text-gray-500">{Math.min(100, Math.floor(progress))}% Complete</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}