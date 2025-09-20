import { Calendar, Clock, Users, MoreVertical, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FormData {
  id: string;
  name: string;
  type: string;
  status: "completed" | "in-progress" | "pending" | "review";
  progress: number;
  createdAt: string;
  deadline: string;
  contributors: Array<{
    id: string;
    name: string;
    avatar?: string;
    initials: string;
  }>;
  isOverdue?: boolean;
}

const statusConfig = {
  completed: {
    color: "bg-success text-success-foreground",
    label: "Completed",
  },
  "in-progress": {
    color: "bg-warning text-warning-foreground",
    label: "In Progress",
  },
  pending: {
    color: "bg-status-pending text-white",
    label: "Pending",
  },
  review: {
    color: "bg-status-review text-white",
    label: "In Review",
  },
};

const typeIcons: Record<string, string> = {
  "Contract": "📄",
  "Survey": "📊",
  "Application": "📝",
  "Report": "📈",
  "Proposal": "💼",
  "Agreement": "🤝",
};

export function FormCard({ form }: { form: FormData }) {
  const statusStyle = statusConfig[form.status];
  const isNearDeadline = new Date(form.deadline) <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <Card className="shadow-card transition-all duration-300 hover:shadow-elevated group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{typeIcons[form.type] || "📄"}</div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {form.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {form.isOverdue && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{form.progress}%</span>
          </div>
          <Progress value={form.progress} className="h-2" />
        </div>

        {/* Status Badge */}
        <div className="flex justify-start">
          <Badge className={statusStyle.color}>
            {statusStyle.label}
          </Badge>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium text-foreground">{form.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${isNearDeadline ? "text-destructive" : "text-muted-foreground"}`} />
            <div>
              <p className="text-muted-foreground">Deadline</p>
              <p className={`font-medium ${isNearDeadline ? "text-destructive" : "text-foreground"}`}>
                {form.deadline}
              </p>
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Contributors ({form.contributors.length})
            </span>
          </div>
          <div className="flex -space-x-2">
            {form.contributors.slice(0, 4).map((contributor) => (
              <Avatar key={contributor.id} className="h-8 w-8 border-2 border-card">
                <AvatarImage src={contributor.avatar} alt={contributor.name} />
                <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                  {contributor.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {form.contributors.length > 4 && (
              <div className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">
                  +{form.contributors.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}