import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/hooks/useAuth";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import DashboardHome from "./pages/dashboard/DashboardHome";
import Chat from "./pages/dashboard/Chat";
import Journal from "./pages/dashboard/Journal";
import MoodTracker from "./pages/dashboard/MoodTracker";
import Breathe from "./pages/dashboard/Breathe";
import LabReports from "./pages/dashboard/LabReports";
import Profile from "./pages/dashboard/Profile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    
    <AuthProvider>
      
      <TooltipProvider>
        
        <Toaster />
        <Sonner />

        <BrowserRouter>

          <div className="w-full min-h-screen overflow-x-hidden bg-white dark:bg-[#0f172a] transition-all duration-300">

            <Routes>

              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Index />} />

              <Route path="/auth" element={<Auth />} />

              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />

              <Route
                path="/reset-password"
                element={<ResetPassword />}
              />

              {/* DASHBOARD */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<DashboardHome />}
                />

                <Route
                  path="chat"
                  element={<Chat />}
                />

                <Route
                  path="chat/:id"
                  element={<Chat />}
                />

                <Route
                  path="journal"
                  element={<Journal />}
                />

                <Route
                  path="mood"
                  element={<MoodTracker />}
                />

                <Route
                  path="breathe"
                  element={<Breathe />}
                />

                <Route
                  path="lab-reports"
                  element={<LabReports />}
                />

                <Route
                  path="profile"
                  element={<Profile />}
                />
              </Route>

              {/* 404 */}
              <Route
                path="*"
                element={<NotFound />}
              />

            </Routes>
          </div>

        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;