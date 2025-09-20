import {
  Calendar,
  MoreVertical,
  FileText,
  File,
  FileImage,
  FileVideo,
  FileSpreadsheet,
  FileCode,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  fileName: string;
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
  customer: {
    name: string;
    company: string;
    email: string;
  };
  isOverdue?: boolean;
}

const statusConfig = {
  completed: {
    color: "bg-status-completed",
    label: "Completed",
  },
  "in-progress": {
    color: "bg-status-in-progress",
    label: "In Progress",
  },
  pending: {
    color: "bg-status-pending",
    label: "Pending",
  },
  review: {
    color: "bg-status-review",
    label: "In Review",
  },
};

const getFileIcon = (fileName: string) => {
  const ext = fileName.toLowerCase().split(".").pop();
  switch (ext) {
    case "pdf":
      return FileText;
    case "doc":
    case "docx":
      return FileText;
    case "xls":
    case "xlsx":
      return FileSpreadsheet;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return FileImage;
    case "mp4":
    case "avi":
    case "mov":
      return FileVideo;
    case "js":
    case "ts":
    case "html":
    case "css":
      return FileCode;
    default:
      return File;
  }
};

export function FormCard({ form }: { form: FormData }) {
  const statusStyle = statusConfig[form.status];
  const FileIcon = getFileIcon(form.fileName);

  return (
    <Card className="shadow-card transition-all duration-300 hover:shadow-elevated group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <FileIcon className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {form.fileName}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {form.name}
              </p>
            </div>
          </div>
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
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Progress Bar */}
        <div className="space-y-2 flex flex-col">
          <div
            className={
              "flex items-center justify-right rounded-full space-between"
            }
            style={{ justifyContent: "space-between", lineHeight: 0 }}
          >
            <span className={`text-xs font-medium text-foreground`}>
              {statusStyle.label}
            </span>

            <div>
              <span className={`text-xs font-medium text-foreground`}>
                {form.progress} %
              </span>
            </div>
          </div>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${statusStyle.color} transition-all duration-300`}
              style={{ width: `${form.progress}%` }}
            />
          </div>
        </div>

        {/* Customer Information */}
        <div className="text-sm">
          <p className="font-medium text-foreground">{form.customer.name}</p>
          <p className="text-muted-foreground">{form.customer.company}</p>
          <p className="text-xs text-muted-foreground">{form.customer.email}</p>
        </div>

        {/* Date and Contributors */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{form.createdAt}</span>
          </div>
          {form.progress !== 100 && (
            <div className="flex items-center gap-2">
              <Clock
                className="h-4 w-4 text-muted-foreground"
                style={{ color: "#db2626ff" }}
              ></Clock>
              <span
                className="text-sm text-foreground"
                style={{ color: "#db2626ff" }}
              >
                {form.deadline}
              </span>
            </div>
          )}
          <div className="flex -space-x-2">
            {form.contributors.slice(0, 3).map((contributor) => (
              <Avatar
                key={contributor.id}
                className="h-6 w-6 border-2 border-card"
              >
                <AvatarImage src={contributor.avatar} alt={contributor.name} />
                <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                  {contributor.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {form.contributors.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">
                  +{form.contributors.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
