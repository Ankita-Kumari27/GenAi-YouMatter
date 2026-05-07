

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 cloud-bg">
      <div className="glass-card-strong rounded-3xl p-6 sm:p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2">
          Reset Password
        </h1>

        <p className="text-muted-foreground text-sm mb-6">
          Enter your new password below.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="space-y-4"
        >
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="pl-10 pr-10 rounded-xl"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

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
              className="pl-10 pr-10 rounded-xl"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {message && (
            <p className="text-sm text-center">
              {message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
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

