
"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, Globe, Trophy, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Team {
  id: string;
  name: string;
  logo: string;
  recentResults: Array<"W" | "D" | "L">;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: Date;
  league: string;
  userPrediction?: "home" | "draw" | "away";
}

export interface UserStats {
  totalPredictions: number;
  correctPredictions: number;
  winRate: number;
  currentStreak: {
    type: "win" | "lose";
    count: number;
  };
}

interface PredictionDashboardProps {
  initialMatches?: Match[];
  initialStats?: UserStats;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
  onPredictionSubmit?: (matchId: string, prediction: "home" | "draw" | "away") => void;
  onExport?: () => void;
}

export function PredictionDashboard({
  initialMatches = [],
  initialStats = {
    totalPredictions: 0,
    correctPredictions: 0,
    winRate: 0,
    currentStreak: { type: "win", count: 0 }
  },
  isLoggedIn = false,
  onLogin = () => {},
  onRegister = () => {},
  onPredictionSubmit = () => {},
  onExport = () => {}
}: PredictionDashboardProps) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [timeZone, setTimeZone] = useState("GMT");
  const [filter, setFilter] = useState<string | null>(null);
  
  // Format date for display
  const formattedDate = format(date, "MMM d, EEEE");
  
  // Function to handle prediction selection
  const handlePrediction = (matchId: string, prediction: "home" | "draw" | "away") => {
    setMatches(prevMatches => 
      prevMatches.map(match => 
        match.id === matchId ? { ...match, userPrediction: prediction } : match
      )
    );
    
    // Call the external handler if provided
    onPredictionSubmit(matchId, prediction);
  };
  
  // Filter matches based on selected date and filters
  const filteredMatches = matches.filter(match => {
    const matchDate = new Date(match.startTime);
    const isSameDate = matchDate.toDateString() === date.toDateString();
    
    if (filter && match.league !== filter) {
      return false;
    }
    
    return isSameDate;
  });
  
  // Function to navigate date
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(date);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setDate(newDate);
  };
  
  // Unique leagues from matches for filtering
  const leagues = Array.from(new Set(matches.map(match => match.league)));
  
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4">
      {/* Header with Authentication */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Predict Football Matches</h1>
        <div className="flex gap-2">
          {!isLoggedIn ? (
            <>
              <Button variant="outline" onClick={onLogin}>Login</Button>
              <Button onClick={onRegister}>Register</Button>
            </>
          ) : (
            <Button variant="ghost">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              </Avatar>
              <span>My Account</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Call to Action */}
      {!isLoggedIn && (
        <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
            <div>
              <h2 className="text-xl font-bold">Ready to test your prediction skills?</h2>
              <p className="mt-2">Register now and start predicting today's matches!</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-white text-blue-700 hover:bg-blue-50" onClick={onRegister}>
              Sign Up Now
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* User Statistics */}
      {isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalPredictions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Correct Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.correctPredictions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.winRate}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Current Streak</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Badge 
                className={cn(
                  "mr-2",
                  stats.currentStreak.type === "win" ? "bg-green-500" : "bg-red-500"
                )}
              >
                {stats.currentStreak.type === "win" ? "W" : "L"}
              </Badge>
              <p className="text-2xl font-bold">{stats.currentStreak.count}</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Action Bar with Date Selector, Export, Timezone and Filter */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>{formattedDate}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    setIsCalendarOpen(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {isLoggedIn && (
            <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
              <FileDown className="h-4 w-4" />
              <span>HTML Export</span>
            </Button>
          )}
          
          <Button variant="outline" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{timeZone}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTimeZone("GMT")}>GMT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeZone("UTC")}>UTC</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeZone("Local")}>Local Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter(null)}>All Leagues</DropdownMenuItem>
              {leagues.map(league => (
                <DropdownMenuItem key={league} onClick={() => setFilter(league)}>
                  {league}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Today's Matches */}
      <div>
        <h2 className="text-xl font-bold mb-4">Today's Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map(match => (
              <Card key={match.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{match.league}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(match.startTime), "HH:mm")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    {/* Home Team */}
                    <div className="flex flex-col items-center text-center w-2/5">
                      <Avatar className="h-12 w-12 mb-2">
                        <AvatarImage src={match.homeTeam.logo} alt={match.homeTeam.name} />
                      </Avatar>
                      <p className="font-medium text-sm">{match.homeTeam.name}</p>
                      <div className="flex gap-1 mt-1">
                        {match.homeTeam.recentResults.map((result, idx) => (
                          <Badge
                            key={idx}
                            className={cn(
                              "w-5 h-5 flex items-center justify-center text-xs rounded-full",
                              result === "W" ? "bg-green-500" : 
                              result === "D" ? "bg-yellow-500" : "bg-red-500"
                            )}
                          >
                            {result}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* VS */}
                    <div className="font-bold">VS</div>
                    
                    {/* Away Team */}
                    <div className="flex flex-col items-center text-center w-2/5">
                      <Avatar className="h-12 w-12 mb-2">
                        <AvatarImage src={match.awayTeam.logo} alt={match.awayTeam.name} />
                      </Avatar>
                      <p className="font-medium text-sm">{match.awayTeam.name}</p>
                      <div className="flex gap-1 mt-1">
                        {match.awayTeam.recentResults.map((result, idx) => (
                          <Badge
                            key={idx}
                            className={cn(
                              "w-5 h-5 flex items-center justify-center text-xs rounded-full",
                              result === "W" ? "bg-green-500" : 
                              result === "D" ? "bg-yellow-500" : "bg-red-500"
                            )}
                          >
                            {result}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 pt-2">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <Button 
                      variant={match.userPrediction === "home" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handlePrediction(match.id, "home")}
                      disabled={!isLoggedIn}
                    >
                      1
                    </Button>
                    <Button 
                      variant={match.userPrediction === "draw" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handlePrediction(match.id, "draw")}
                      disabled={!isLoggedIn}
                    >
                      X
                    </Button>
                    <Button 
                      variant={match.userPrediction === "away" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handlePrediction(match.id, "away")}
                      disabled={!isLoggedIn}
                    >
                      2
                    </Button>
                  </div>
                </CardFooter>
                {match.userPrediction && (
                  <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-center py-2 text-sm">
                    Prediction Submitted ✓
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">No matches available for this date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img 
      src={src || "/placeholder.svg"} // Fallback to placeholder if image not available
      alt={alt}
      className="h-full w-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder.svg";
      }}
    />
  );
}
