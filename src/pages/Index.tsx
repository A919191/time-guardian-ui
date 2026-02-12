import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";
import { TimeToRiskBadge } from "@/components/TimeToRiskBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, Clock, ShieldAlert, Users } from "lucide-react";
import { useState, useEffect } from "react";

// Simulated vitals data — replace with API call
const vitalsData = [
  { time: "08:00", heartRate: 72, spO2: 98, painScore: 2 },
  { time: "09:00", heartRate: 75, spO2: 97, painScore: 3 },
  { time: "10:00", heartRate: 78, spO2: 96, painScore: 4 },
  { time: "11:00", heartRate: 82, spO2: 95, painScore: 5 },
  { time: "12:00", heartRate: 88, spO2: 93, painScore: 6 },
  { time: "13:00", heartRate: 85, spO2: 94, painScore: 5 },
  { time: "14:00", heartRate: 80, spO2: 96, painScore: 4 },
  { time: "15:00", heartRate: 76, spO2: 97, painScore: 3 },
];

const patientSummaries = [
  { id: "P001", risk: 85, timeToRisk: "30 min", urgency: "high" as const, ttrLevel: "critical" as const },
  { id: "P002", risk: 45, timeToRisk: "2 hours", urgency: "medium" as const, ttrLevel: "watch" as const },
  { id: "P003", risk: 12, timeToRisk: "6 hours", urgency: "low" as const, ttrLevel: "safe" as const },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Real-time patient risk overview</p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Patients"
            value="24"
            subtitle="Currently monitored"
            icon={<Users className="h-5 w-5" />}
            loading={loading}
          />
          <StatCard
            title="Avg Risk Probability"
            value="47%"
            subtitle="Across all patients"
            icon={<Activity className="h-5 w-5" />}
            loading={loading}
          />
          <StatCard
            title="Critical Alerts"
            value="3"
            subtitle="Require immediate action"
            icon={<ShieldAlert className="h-5 w-5" />}
            loading={loading}
          />
          <StatCard
            title="Avg Time-to-Risk"
            value="1.5 hrs"
            subtitle="Median across queue"
            icon={<Clock className="h-5 w-5" />}
            loading={loading}
          />
        </div>

        {/* Patient Summary Cards */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Patient Risk Summary</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="shadow-sm">
                    <CardContent className="space-y-3 p-5">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-6 w-28" />
                    </CardContent>
                  </Card>
                ))
              : patientSummaries.map((p) => (
                  <Card key={p.id} className="shadow-sm">
                    <CardContent className="space-y-3 p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">{p.id}</p>
                        <RiskBadge level={p.urgency} />
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Risk Probability</p>
                          <p className="text-2xl font-bold text-foreground">{p.risk}%</p>
                        </div>
                        <TimeToRiskBadge time={p.timeToRisk} level={p.ttrLevel} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>

        {/* Vitals Chart */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Vitals Trend – Patient P001</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 90%)" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(210 20% 90%)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="hsl(210 65% 45%)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Heart Rate"
                  />
                  <Line
                    type="monotone"
                    dataKey="spO2"
                    stroke="hsl(168 55% 42%)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="SpO₂"
                  />
                  <Line
                    type="monotone"
                    dataKey="painScore"
                    stroke="hsl(0 72% 51%)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Pain Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
