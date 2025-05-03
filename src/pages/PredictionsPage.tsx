
"use client";

import { PredictionDashboard } from "@/components/ui/prediction-dashboard";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function PredictionsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  
  // Sample data - in a real application, this would come from an API
  const sampleMatches = [
    {
      id: "match-1",
      homeTeam: {
        id: "team-1",
        name: "Arsenal",
        logo: "/placeholder.svg", // Replace with actual team logo
        recentResults: ["W", "W", "D", "L", "W"] as Array<"W" | "D" | "L">
      },
      awayTeam: {
        id: "team-2",
        name: "Chelsea",
        logo: "/placeholder.svg", // Replace with actual team logo
        recentResults: ["L", "W", "W", "D", "W"] as Array<"W" | "D" | "L">
      },
      startTime: new Date(),
      league: "Premier League"
    },
    {
      id: "match-2",
      homeTeam: {
        id: "team-3",
        name: "Barcelona",
        logo: "/placeholder.svg", // Replace with actual team logo
        recentResults: ["W", "W", "W", "D", "W"] as Array<"W" | "D" | "L">
      },
      awayTeam: {
        id: "team-4",
        name: "Real Madrid",
        logo: "/placeholder.svg", // Replace with actual team logo
        recentResults: ["W", "W", "D", "W", "W"] as Array<"W" | "D" | "L">
      },
      startTime: new Date(),
      league: "La Liga"
    },
    {
      id: "match-3",
      homeTeam: {
        id: "team-5",
        name: "Bayern Munich",
        logo: "/placeholder.svg", // Replace with actual team logo
        recentResults: ["W", "D", "W", "W", "L"] as Array<"W" | "D" | "L">
      },
      awayTeam: {
        id: "team-6",
        name: "Dortmund",
        logo: "/placeholder.svg", // Replace with actual team logo
        recentResults: ["L", "W", "D", "W", "W"] as Array<"W" | "D" | "L">
      },
      startTime: new Date(),
      league: "Bundesliga"
    }
  ];
  
  const userStats = {
    totalPredictions: 145,
    correctPredictions: 87,
    winRate: 60,
    currentStreak: { type: "win" as const, count: 3 }
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Logged In",
      description: "You have been successfully logged in.",
    });
  };
  
  const handleRegister = () => {
    setIsLoggedIn(true);
    toast({
      title: "Account Created",
      description: "Your account has been created successfully.",
    });
  };
  
  const handlePredictionSubmit = (matchId: string, prediction: "home" | "draw" | "away") => {
    console.log(`Prediction submitted for match ${matchId}: ${prediction}`);
    toast({
      title: "Prediction Submitted",
      description: `Your prediction has been recorded.`,
      variant: "default",
    });
    // In a real app, you would send this to your API
  };
  
  const handleExport = () => {
    console.log("Exporting predictions");
    toast({
      title: "Export Started",
      description: "Your predictions are being exported to HTML.",
    });
    // In a real app, you would generate and download an HTML export
  };
  
  return (
    <div className="container py-8">
      <PredictionDashboard 
        initialMatches={sampleMatches}
        initialStats={userStats}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onPredictionSubmit={handlePredictionSubmit}
        onExport={handleExport}
      />
    </div>
  );
}
