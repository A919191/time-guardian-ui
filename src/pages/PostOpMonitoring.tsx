import { DashboardLayout } from "@/components/DashboardLayout";
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
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

const recoveryData = [
  { day: "Day 1", risk: 82, vitals: 45 },
  { day: "Day 2", risk: 70, vitals: 55 },
  { day: "Day 3", risk: 55, vitals: 65 },
  { day: "Day 4", risk: 48, vitals: 70 },
  { day: "Day 5", risk: 35, vitals: 78 },
  { day: "Day 6", risk: 25, vitals: 85 },
  { day: "Day 7", risk: 18, vitals: 90 },
];

const patients = [
  {
    id: "P001",
    name: "Patient Alpha",
    surgery: "Appendectomy",
    trend: "improving" as const,
    currentRisk: 18,
    ttr: "8 hours",
    ttrLevel: "safe" as const,
    urgency: "low" as const,
  },
  {
    id: "P002",
    name: "Patient Beta",
    surgery: "Cardiac Bypass",
    trend: "deteriorating" as const,
    currentRisk: 72,
    ttr: "45 min",
    ttrLevel: "critical" as const,
    urgency: "high" as const,
  },
  {
    id: "P003",
    name: "Patient Gamma",
    surgery: "Knee Replacement",
    trend: "stable" as const,
    currentRisk: 30,
    ttr: "3 hours",
    ttrLevel: "watch" as const,
    urgency: "medium" as const,
  },
];

export default function PostOpMonitoring() {
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "improving") return <TrendingDown className="h-4 w-4 text-risk-safe" />;
    if (trend === "deteriorating") return <TrendingUp className="h-4 w-4 text-risk-critical" />;
    return <span className="h-4 w-4 text-risk-watch">—</span>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Post-Operative Monitoring</h2>
          <p className="text-sm text-muted-foreground">Individual patient recovery tracking</p>
        </div>

        {/* Patient selector */}
        <div className="grid gap-3 sm:grid-cols-3">
          {patients.map((p) => (
            <Card
              key={p.id}
              className={`cursor-pointer shadow-sm transition-all ${
                selectedPatient.id === p.id
                  ? "ring-2 ring-primary"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedPatient(p)}
            >
              <CardContent className="p-4">
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{p.id}</p>
                      <TrendIcon trend={p.trend} />
                    </div>
                    <p className="text-xs text-muted-foreground">{p.surgery}</p>
                    <div className="flex items-center justify-between">
                      <RiskBadge level={p.urgency} />
                      <TimeToRiskBadge time={p.ttr} level={p.ttrLevel} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recovery Timeline Chart */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Recovery Timeline – {selectedPatient.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[280px] w-full rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={recoveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 90%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 50%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(210 20% 90%)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="hsl(0 72% 51%)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Risk Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="vitals"
                    stroke="hsl(168 55% 42%)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Vitals Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Critical Alert */}
        {selectedPatient.urgency === "high" && !loading && (
          <Card className="border-risk-critical/30 bg-risk-critical-bg shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertTriangle className="h-5 w-5 text-risk-critical" />
              <div>
                <p className="text-sm font-semibold text-risk-critical">Critical Alert</p>
                <p className="text-xs text-risk-critical/80">
                  {selectedPatient.id} Time-to-Risk has fallen below critical threshold.
                  Immediate intervention recommended.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
