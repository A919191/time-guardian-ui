import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Clock, Pill, HeartPulse, Info } from "lucide-react";
import { useState, useEffect } from "react";

type AlertSeverity = "critical" | "warning" | "info";

interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  icon: React.ElementType;
}

const alerts: Alert[] = [
  {
    id: "A001",
    severity: "critical",
    message: "Patient P004 likely to deteriorate within 30 minutes",
    timestamp: "2 min ago",
    icon: AlertTriangle,
  },
  {
    id: "A002",
    severity: "critical",
    message: "Medication dose is critical – immediate action required",
    timestamp: "5 min ago",
    icon: Pill,
  },
  {
    id: "A003",
    severity: "warning",
    message: "Patient P007 SpO₂ dropping below 94% – monitor closely",
    timestamp: "12 min ago",
    icon: HeartPulse,
  },
  {
    id: "A004",
    severity: "warning",
    message: "Patient P002 Time-to-Risk reduced to 2 hours",
    timestamp: "18 min ago",
    icon: Clock,
  },
  {
    id: "A005",
    severity: "info",
    message: "Patient P003 recovery progressing normally – low risk",
    timestamp: "25 min ago",
    icon: Info,
  },
  {
    id: "A006",
    severity: "critical",
    message: "Patient P001 heart rate elevated to 110 bpm – review required",
    timestamp: "30 min ago",
    icon: HeartPulse,
  },
];

const severityStyles: Record<AlertSeverity, string> = {
  critical: "border-l-risk-critical bg-risk-critical-bg",
  warning: "border-l-risk-watch bg-risk-watch-bg",
  info: "border-l-primary bg-primary/5",
};

const iconStyles: Record<AlertSeverity, string> = {
  critical: "text-risk-critical",
  warning: "text-risk-watch",
  info: "text-primary",
};

export default function Alerts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Alerts</h2>
            <p className="text-sm text-muted-foreground">Real-time clinical alerts</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-risk-safe animate-pulse-soft" />
            Live
          </div>
        </div>

        <div className="space-y-3">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="shadow-sm">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 shadow-sm ${severityStyles[alert.severity]}`}
                >
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className={`mt-0.5 ${iconStyles[alert.severity]}`}>
                      <alert.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                    <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {alert.severity}
                    </span>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
