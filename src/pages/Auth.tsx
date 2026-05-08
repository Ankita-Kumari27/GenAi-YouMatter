import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Heart,
  Mail,
  Lock,
  User,
  Loader2,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

const Auth = () => {
  const { user, loading, signIn, signUp } =
    useAuth();

  const [isSignUp, setIsSignUp] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [guardianEmail, setGuardianEmail] =
    useState("");

  const [consent, setConsent] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [confirmationSent, setConfirmationSent] =
    useState(false);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:to-[#1e1b4b]">
        <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
      </div>
    );

  if (user)
    return <Navigate to="/dashboard" replace />;

  if (confirmationSent)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:to-[#1e1b4b]">

        <div className="w-full max-w-md rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-8 shadow-2xl text-center">

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Check your email
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            We've sent a confirmation link to
            <span className="font-semibold">
              {" "}
              {email}
            </span>
          </p>

          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() => {
              setConfirmationSent(false);
              setIsSignUp(false);
            }}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError(null);

    if (
      isSignUp &&
      password !== confirmPassword
    ) {
      setError("Passwords do not match");
      return;
    }

    if (isSignUp && !consent) {
      setError(
        "Please accept the consent form"
      );
      return;
    }

    setSubmitting(true);

    if (isSignUp) {
      const result = await signUp(
        email,
        password,
        fullName,
        guardianEmail
      );

      if (result.error)
        setError(result.error);

      else if (result.needsConfirmation)
        setConfirmationSent(true);

    } else {
      const result = await signIn(
        email,
        password
      );

      if (result.error)
        setError(result.error);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] transition-all duration-500 overflow-hidden">

      <div className="w-full max-w-md rounded-3xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl">

        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="flex items-center gap-2 mb-6">

          <Heart className="h-7 w-7 text-pink-500 fill-pink-300" />

          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            YouMatter
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {isSignUp
            ? "Create your safe space"
            : "Welcome back"}
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Your mental wellness companion
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* FULL NAME */}
          {isSignUp && (
            <div className="relative">

              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="pl-10 rounded-2xl h-12"
                required
              />
            </div>
          )}

          {/* EMAIL */}
          <div className="relative">

            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="pl-10 rounded-2xl h-12"
              required
            />
          </div>

          {/* GUARDIAN EMAIL */}
          {isSignUp && (
            <div className="relative">

              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                type="email"
                placeholder="Guardian Email"
                value={guardianEmail}
                onChange={(e) =>
                  setGuardianEmail(
                    e.target.value
                  )
                }
                className="pl-10 rounded-2xl h-12"
                required
              />
            </div>
          )}

          {/* PASSWORD */}
          <div className="relative">

            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="pl-10 pr-10 rounded-2xl h-12"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
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
          {isSignUp && (
            <div className="relative">

              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                type={
                  showPassword
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
                className="pl-10 rounded-2xl h-12"
                required
              />
            </div>
          )}

          {/* CONSENT */}
          {isSignUp && (
            <div className="flex items-start gap-2 rounded-2xl bg-pink-50 dark:bg-pink-900/20 p-3">

              <input
                type="checkbox"
                checked={consent}
                onChange={(e) =>
                  setConsent(
                    e.target.checked
                  )
                }
                className="mt-1"
                required
              />

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                I confirm that I have consent
                from my guardian to use this
                platform and agree to the
                privacy policy and terms.
              </p>
            </div>
          )}

          {/* FORGOT PASSWORD */}
          {!isSignUp && (
            <div className="flex justify-end">

              <Link
                to="/forgot-password"
                className="text-sm text-pink-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 text-red-500 text-sm rounded-2xl p-3">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={
              submitting ||
              (isSignUp && !consent)
            }
            className="w-full h-12 rounded-2xl text-base bg-pink-500 hover:bg-pink-600 transition-all duration-300"
          >
            {submitting ? (
              <Loader2 className="animate-spin" />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">

          {isSignUp
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="ml-2 text-pink-500 font-semibold hover:underline"
          >
            {isSignUp
              ? "Sign In"
              : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;