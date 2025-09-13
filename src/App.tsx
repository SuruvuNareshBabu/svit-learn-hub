import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">My Courses</h1>
            <p className="text-muted-foreground mt-2">Course management coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/timetable" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Timetable</h1>
            <p className="text-muted-foreground mt-2">Timetable view coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/attendance" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Attendance</h1>
            <p className="text-muted-foreground mt-2">Attendance tracking coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/assignments" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Assignments</h1>
            <p className="text-muted-foreground mt-2">Assignment portal coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/certificates" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Certificates</h1>
            <p className="text-muted-foreground mt-2">Certificate management coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/announcements" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Announcements</h1>
            <p className="text-muted-foreground mt-2">Announcements coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/students" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Students</h1>
            <p className="text-muted-foreground mt-2">Student management coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/faculty" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Faculty</h1>
            <p className="text-muted-foreground mt-2">Faculty management coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground mt-2">Reports generation coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">System settings coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
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
