
"use client";

import { PredictionDashboard, Match, UserStats } from "@/components/ui/prediction-dashboard";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function PredictionsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  
  // Sample data - in a real application, this would come from an API
  const sampleMatches: Match[] = [
    {
      id: "match-1",
      date: new Date(),
      homeTeam: {
        id: "team-1",
        name: "Arsenal",
        logo: "/placeholder.svg"
      },
      awayTeam: {
        id: "team-2",
        name: "Chelsea",
        logo: "/placeholder.svg"
      },
      prediction: "Home Win",
      odds: 1.75,
      status: 'upcoming',
      sport: "Soccer"
    },
    {
      id: "match-2",
      date: new Date(),
      homeTeam: {
        id: "team-3",
        name: "Barcelona",
        logo: "/placeholder.svg"
      },
      awayTeam: {
        id: "team-4",
        name: "Real Madrid",
        logo: "/placeholder.svg"
      },
      prediction: "Draw",
      odds: 3.5,
      status: 'upcoming',
      sport: "Soccer"
    },
    {
      id: "match-3",
      date: new Date(),
      homeTeam: {
        id: "team-5",
        name: "Bayern Munich",
        logo: "/placeholder.svg"
      },
      awayTeam: {
        id: "team-6",
        name: "Dortmund",
        logo: "/placeholder.svg"
      },
      prediction: "Away Win",
      odds: 2.25,
      status: 'upcoming',
      sport: "Soccer"
    }
  ];
  
  const userStats: UserStats = {
    totalPredictions: 145,
    successRate: 60,
    profitLoss: 230.5,
    streak: 3,
    bestSport: "Soccer"
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
  
  const handlePredictionSubmit = (matchId: string, prediction: string) => {
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
        onExport={handleExport}
      />
    </div>
  );
}
