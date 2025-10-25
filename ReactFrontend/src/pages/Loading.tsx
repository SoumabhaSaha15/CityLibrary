import { useState, useEffect } from 'react';
import { useTheme } from '@heroui/use-theme';
import { Spinner, Progress, Card, CardBody } from "@heroui/react";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const _theme = useTheme();

  const loadingStages = [
    { text: "Initializing...", progress: 20 },
    { text: "Loading resources...", progress: 40 },
    { text: "Preparing interface...", progress: 60 },
    { text: "Finalizing...", progress: 80 },
    { text: "Almost ready...", progress: 95 }
  ];

  useEffect(() => {
    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        setLoadingText(loadingStages[currentStage].text);
        setProgress(loadingStages[currentStage].progress);
        currentStage++;
      } else {
        setProgress(100);
        setTimeout(() => {
          currentStage = 0;
          setProgress(0);
        }, 1000);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full dark:bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardBody className="gap-6 p-8">
          {/* Logo/Icon Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-full">
                <HiLightningBolt className="text-white text-4xl" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <HiSparkles className="text-purple-500" />
              Loading Experience
              <HiSparkles className="text-blue-500" />
            </h1>
          </div>

          {/* Main Spinner */}
          <div className="flex justify-center py-4">
            <Spinner
              size="lg"
              color="secondary"
              label={loadingText}
              labelColor="secondary"
            />
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress
              size="md"
              aria-labelledby='progress-bar'
              value={progress}
              color="secondary"
              className="w-full"
              showValueLabel={true}
            />
          </div>

          {/* Status Text */}
          <div className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
            <BiLoaderAlt className="animate-spin text-purple-500" />
            <span>{loadingText}</span>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-200">
            Please wait while we prepare everything for you
          </div>
        </CardBody>
      </Card>
    </div>
  );
}