"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, Globe, Trophy, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface Match {
  id: string;
  date: Date;
  homeTeam: Team;
  awayTeam: Team;
  prediction: string;
  odds: number;
  result?: string;
  status: 'upcoming' | 'live' | 'completed';
  sport: string;
}

export interface UserStats {
  totalPredictions: number;
  successRate: number;
  profitLoss: number;
  streak: number;
  bestSport: string;
}

export interface PredictionDashboardProps {
  initialMatches: Match[];
  initialStats: UserStats;
  onExport?: () => void;
  onFilterChange?: (filters: any) => void;
  onDateChange?: (date: Date) => void;
}

export function PredictionDashboard({
  initialMatches = [],
  initialStats = {
    totalPredictions: 0,
    successRate: 0,
    profitLoss: 0,
    streak: 0,
    bestSport: "None"
  },
  onFilterChange = () => {},
  onDateChange = () => {},
  onExport = () => {}
}: PredictionDashboardProps) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [stats] = useState<UserStats>(initialStats);
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [timeZone, setTimeZone] = useState("GMT");

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateChange(newDate);
    }
    setIsCalendarOpen(false);
  };

  const previousDay = () => {
    const prevDate = new Date(date);
    prevDate.setDate(date.getDate() - 1);
    setDate(prevDate);
    onDateChange(prevDate);
  };

  const nextDay = () => {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    setDate(nextDate);
    onDateChange(nextDate);
  };

  const handleTimeZoneChange = (newTimeZone: string) => {
    setTimeZone(newTimeZone);
  };

  const handleFilterChange = (filters: any) => {
    onFilterChange(filters);
  };

  const handleExport = () => {
    onExport();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Predictions Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPredictions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.successRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profit/Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.profitLoss}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.streak}</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={previousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    size="sm"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date > new Date() || date < new Date("2020-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button size="sm" onClick={nextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    {timeZone}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleTimeZoneChange("GMT")}>
                    GMT
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTimeZoneChange("EST")}>
                    EST
                  </DropdownMenuItem>
                  {/* Add more time zones as needed */}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleFilterChange({})}>
                    All Sports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange({ sport: "Soccer" })}>
                    Soccer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange({ sport: "Basketball" })}>
                    Basketball
                  </DropdownMenuItem>
                  {/* Add more filters as needed */}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm" onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Matches for {format(date, "PPP")}</h3>
            {matches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prediction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Odds
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {matches.map((match) => (
                      <tr key={match.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(match.date, "Pp")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{match.prediction}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{match.odds}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{match.result || "Pending"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No matches found for this date.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
