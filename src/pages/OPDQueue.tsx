import { DashboardLayout } from "@/components/DashboardLayout";
import { RiskBadge } from "@/components/RiskBadge";
import { TimeToRiskBadge } from "@/components/TimeToRiskBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

type UrgencyLevel = "low" | "medium" | "high";
type TTRLevel = "safe" | "watch" | "critical";

interface Patient {
  id: string;
  risk: number;
  timeToRisk: string;
  timeMinutes: number;
  urgency: UrgencyLevel;
  ttrLevel: TTRLevel;
}

const patients: Patient[] = [
  { id: "P004", risk: 92, timeToRisk: "15 min", timeMinutes: 15, urgency: "high", ttrLevel: "critical" },
  { id: "P001", risk: 85, timeToRisk: "30 min", timeMinutes: 30, urgency: "high", ttrLevel: "critical" },
  { id: "P007", risk: 68, timeToRisk: "45 min", timeMinutes: 45, urgency: "medium", ttrLevel: "watch" },
  { id: "P002", risk: 45, timeToRisk: "2 hours", timeMinutes: 120, urgency: "medium", ttrLevel: "watch" },
  { id: "P005", risk: 30, timeToRisk: "3 hours", timeMinutes: 180, urgency: "low", ttrLevel: "safe" },
  { id: "P003", risk: 12, timeToRisk: "6 hours", timeMinutes: 360, urgency: "low", ttrLevel: "safe" },
  { id: "P006", risk: 8, timeToRisk: "8 hours", timeMinutes: 480, urgency: "low", ttrLevel: "safe" },
];

// Original FIFO order (arrival order)
const originalOrder: Patient[] = [
  patients[4], // P005
  patients[5], // P003
  patients[3], // P002
  patients[6], // P006
  patients[0], // P004
  patients[2], // P007
  patients[1], // P001
];

function QueueTable({ data, loading }: { data: Patient[]; loading: boolean }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Queue #</TableHead>
          <TableHead>Patient ID</TableHead>
          <TableHead>Current Risk %</TableHead>
          <TableHead>Time-to-Risk</TableHead>
          <TableHead>Urgency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <TableCell key={j}><Skeleton className="h-5 w-16" /></TableCell>
                ))}
              </TableRow>
            ))
          : data.map((p, idx) => (
              <TableRow key={p.id} className={p.urgency === "high" ? "bg-risk-critical-bg/50" : ""}>
                <TableCell className="font-mono text-sm">{idx + 1}</TableCell>
                <TableCell className="font-semibold">{p.id}</TableCell>
                <TableCell>
                  <span className="font-semibold">{p.risk}%</span>
                </TableCell>
                <TableCell>
                  <TimeToRiskBadge time={p.timeToRisk} level={p.ttrLevel} />
                </TableCell>
                <TableCell>
                  <RiskBadge level={p.urgency} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

export default function OPDQueue() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">OPD Queue</h2>
          <p className="text-sm text-muted-foreground">
            Patients sorted by predicted Time-to-Risk
          </p>
        </div>

        <Tabs defaultValue="ai">
          <TabsList>
            <TabsTrigger value="ai">AI-Prioritized Queue</TabsTrigger>
            <TabsTrigger value="original">Original Queue (FIFO)</TabsTrigger>
          </TabsList>

          <TabsContent value="ai">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  Sorted by shortest Time-to-Risk first
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <QueueTable data={patients} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="original">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  Original arrival order (First-In-First-Out)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <QueueTable data={originalOrder} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
