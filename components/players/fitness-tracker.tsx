"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FitnessMetric {
  label: string;
  value: number;
  target: number;
  color: string;
}

export function FitnessTracker() {
  const fitnessMetrics: FitnessMetric[] = [
    { label: "Stamina", value: 85, target: 100, color: "bg-blue-500" },
    { label: "Speed", value: 90, target: 100, color: "bg-green-500" },
    { label: "Strength", value: 75, target: 100, color: "bg-yellow-500" },
    { label: "Recovery", value: 95, target: 100, color: "bg-purple-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Fitness Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {fitnessMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{metric.label}</span>
                <span className="text-muted-foreground">
                  {metric.value}/{metric.target}
                </span>
              </div>
              <Progress value={metric.value} className={metric.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}