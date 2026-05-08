import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Loader2,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleResetPassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Password updated successfully!"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] transition-all duration-500">

      <div className="w-full max-w-md rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl shadow-2xl p-6 sm:p-8 animate-in fade-in duration-500">

        <Link
          to="/auth"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 mb-6 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Reset Password
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Enter your new password below.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="space-y-4"
        >

          {/* PASSWORD */}
          <div className="relative">

            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="pl-10 pr-10 h-12 rounded-2xl"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">

            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="pl-10 pr-10 h-12 rounded-2xl"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="text-sm text-center rounded-2xl p-3 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300">
              {message}
            </div>
          )}

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full h-12 rounded-2xl bg-pink-500 hover:bg-pink-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;