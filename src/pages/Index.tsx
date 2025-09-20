import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { FormCard, FormData } from "@/components/FormCard";

// Mock data for demonstration
const mockForms: FormData[] = [
  {
    id: "1",
    name: "Microsoft Corporation",
    type: "Proposal",
    status: "in-progress",
    progress: 75,
    createdAt: "5/2/25, 10:20 AM",
    deadline: "5/20/25, 5:00 PM",
    contributors: [
      { id: "1", name: "John Doe", initials: "JD" },
      { id: "2", name: "Jane Smith", initials: "JS" },
      { id: "3", name: "Mike Johnson", initials: "MJ" },
      { id: "4", name: "Sarah Wilson", initials: "SW" },
      { id: "5", name: "Tom Brown", initials: "TB" },
    ],
  },
  {
    id: "2",
    name: "Google LLC",
    type: "Contract",
    status: "completed",
    progress: 100,
    createdAt: "4/15/25, 1:05 PM",
    deadline: "5/1/25, 5:00 PM",
    contributors: [
      { id: "1", name: "Alice Cooper", initials: "AC" },
      { id: "2", name: "Bob Miller", initials: "BM" },
      { id: "3", name: "Carol Davis", initials: "CD" },
    ],
  },
  {
    id: "3",
    name: "Amazon Web Services",
    type: "Report",
    status: "review",
    progress: 95,
    createdAt: "4/20/25, 4:15 PM",
    deadline: "6/10/25, 11:00 AM",
    contributors: [
      { id: "1", name: "David Lee", initials: "DL" },
      { id: "2", name: "Emma Watson", initials: "EW" },
      { id: "3", name: "Frank Chen", initials: "FC" },
      { id: "4", name: "Grace Kim", initials: "GK" },
    ],
  },
  {
    id: "4",
    name: "Tesla Inc",
    type: "Agreement",
    status: "review",
    progress: 100,
    createdAt: "1/30/25, 10:50 AM",
    deadline: "5/28/25, 3:00 PM",
    contributors: [
      { id: "1", name: "Helen Park", initials: "HP" },
      { id: "2", name: "Ivan Petrov", initials: "IP" },
      { id: "3", name: "Julia Roberts", initials: "JR" },
    ],
  },
  {
    id: "5",
    name: "Apple Inc",
    type: "Application",
    status: "in-progress",
    progress: 25,
    createdAt: "1/6/25, 8:30 AM",
    deadline: "4/2/25, 1:20 PM",
    contributors: [
      { id: "1", name: "Kevin Liu", initials: "KL" },
      { id: "2", name: "Linda Zhang", initials: "LZ" },
    ],
    isOverdue: true,
  },
  {
    id: "6",
    name: "Meta Platforms",
    type: "Survey",
    status: "in-progress",
    progress: 40,
    createdAt: "10/1/24, 2:45 PM",
    deadline: "5/5/25, 9:00 AM",
    contributors: [
      { id: "1", name: "Mark Taylor", initials: "MT" },
      { id: "2", name: "Nancy Brown", initials: "NB" },
      { id: "3", name: "Oscar Garcia", initials: "OG" },
    ],
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredForms = useMemo(() => {
    if (!searchQuery) return mockForms;
    
    return mockForms.filter(
      (form) =>
        form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const stats = useMemo(() => {
    const totalForms = mockForms.length;
    const completedForms = mockForms.filter(form => form.status === "completed").length;
    const inProgressForms = mockForms.filter(form => form.status === "in-progress").length;
    const pendingForms = mockForms.filter(form => form.status === "pending" || form.status === "review").length;

    return {
      total: totalForms,
      completed: completedForms,
      inProgress: inProgressForms,
      pending: pendingForms,
    };
  }, []);

  const handleUpload = () => {
    navigate('/upload');
  };

  return (
    <DashboardLayout
      title="Rapid Comply Dashboard"
      onSearch={setSearchQuery}
      onUpload={handleUpload}
      searchPlaceholder="Search for any form"
    >
      <div className="space-y-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, Jane! 👋
          </h2>
          <p className="text-muted-foreground">
            You have {stats.inProgress} forms in progress and {stats.pending} pending review.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Forms"
            value={stats.total.toString()}
            change="30"
            changeType="increase"
            description="since last month"
            color="blue"
          />
          <StatCard
            title="Completed"
            value={stats.completed.toString()}
            change="240"
            changeType="increase"
            description="since last month"
            color="green"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress.toString()}
            change="10"
            changeType="increase"
            description="since last month"
            color="orange"
          />
          <StatCard
            title="Pending Review"
            value={stats.pending.toString()}
            change="5"
            changeType="decrease"
            description="since last month"
            color="purple"
          />
        </div>

        {/* Forms Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {filteredForms.length} Forms
            </h3>
            <div className="text-sm text-muted-foreground">
              Showing {filteredForms.length} of {mockForms.length} forms
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
