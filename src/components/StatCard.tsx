import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  description: string;
  color: "blue" | "green" | "orange" | "purple";
}

const colorVariants = {
  blue: "border-l-4 border-l-info",
  green: "border-l-4 border-l-success",
  orange: "border-l-4 border-l-warning",
  purple: "border-l-4 border-l-status-pending",
};

export function StatCard({ title, value, change, changeType, description, color }: StatCardProps) {
  return (
    <Card className={`${colorVariants[color]} shadow-card transition-all duration-300 hover:shadow-elevated`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              changeType === "increase" ? "text-success" : "text-destructive"
            }`}>
              {changeType === "increase" ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {change}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}