import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Core Pages
import LoginForm from "@/components/auth/LoginForm";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";

// Feature Pages
import Assignments from "@/pages/Assignments";
import Courses from "@/pages/Courses";
import Certificates from "@/pages/Certificates";
import Announcements from "@/pages/Announcements";
import Timetable from "@/pages/Timetable";
import Attendance from "@/pages/Attendance"; // Create this page if not exists

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
      <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />

      {/* Updated Timetable & Attendance routes */}
      <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />

      {/* Other placeholders */}
      <Route path="/students" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Students</h1><p className="text-muted-foreground mt-2">Student management coming soon...</p></div></ProtectedRoute>} />
      <Route path="/faculty" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Faculty</h1><p className="text-muted-foreground mt-2">Faculty management coming soon...</p></div></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground mt-2">Reports generation coming soon...</p></div></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground mt-2">System settings coming soon...</p></div></ProtectedRoute>} />

      {/* Fallback for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
