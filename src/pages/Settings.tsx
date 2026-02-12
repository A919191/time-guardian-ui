import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">System configuration</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url" className="text-xs">Backend API URL</Label>
                <Input id="api-url" placeholder="https://api.waitless.ai/v1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refresh" className="text-xs">Prediction Refresh Rate (seconds)</Label>
                <Input id="refresh" type="number" defaultValue={30} />
              </div>
              <Button size="sm">Save Configuration</Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Alert Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="critical" className="text-xs">Critical Time-to-Risk Threshold (minutes)</Label>
                <Input id="critical" type="number" defaultValue={30} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warning" className="text-xs">Warning Time-to-Risk Threshold (minutes)</Label>
                <Input id="warning" type="number" defaultValue={120} />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="sound" className="text-xs">Enable Audio Alerts</Label>
                <Switch id="sound" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push" className="text-xs">Push Notifications</Label>
                <Switch id="push" />
              </div>
              <Button size="sm">Save Thresholds</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
