import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Loader2,
  Mail,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const handleReset = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            window.location.origin +
            "/reset-password",
        }
      );

    if (error) {
      alert(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] transition-all duration-500">

      <div className="w-full max-w-md bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl animate-in fade-in duration-500">

        <Link
          to="/auth"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 mb-6 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Enter your email to receive a password reset link.
        </p>

        {sent ? (
          <div className="text-center space-y-4">

            <div className="text-green-500 font-medium">
              Reset link sent successfully!
            </div>

            <Button
              asChild
              className="w-full rounded-2xl bg-pink-500 hover:bg-pink-600"
            >
              <Link to="/auth">
                Back to Login
              </Link>
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleReset}
            className="space-y-4"
          >

            <div className="relative">

              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="pl-10 rounded-2xl h-12"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl h-12 bg-pink-500 hover:bg-pink-600 transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;