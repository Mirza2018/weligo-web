import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import {  useI18n } from "../../lib/i18n";
import { useNavigate } from "react-router-dom";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 45;

export function SubmitCodeProvider({
  email = "user......@gmail.com",
}: {
  email?: string;
}) {
  const { t } = useI18n();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/[^0-9]/g, "");
    if (!clean) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    const chars = clean.split("");
    setDigits((prev) => {
      const next = [...prev];
      let i = index;
      for (const char of chars) {
        if (i >= CODE_LENGTH) break;
        next[i] = char;
        i += 1;
      }
      return next;
    });

    const nextIndex = Math.min(index + chars.length, CODE_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    const chars = pasted.slice(0, CODE_LENGTH).split("");
    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((char, i) => {
        next[i] = char;
      });
      return next;
    });
    const nextIndex = Math.min(chars.length, CODE_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    setDigits(Array(CODE_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    toast.success(t("auth.codeResent") ?? "Code resent");
  };

  const handleVerify = async () => {
    const code = digits.join("");
    if (code.length !== CODE_LENGTH) {
      toast.error(t("auth.enterFullCode") ?? "Please enter the full code.");
      return;
    }

    setSubmitting(true);

    const toastId = toast.loading("Please wait...");
    navigate("/serice-selection");
    return;
    try {
      // TODO: call verify-code mutation with { email, code }
      toast.success(t("auth.codeVerified") ?? "Code verified", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Verification failed", {
        id: toastId,
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          {t("auth.verifyA")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("auth.verifyB")} {email}
        </p>

        <div className="mt-8 flex justify-center gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`h-14 w-14 rounded-xl border text-center text-xl font-bold outline-none transition-colors ${
                digit
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input bg-white text-muted-foreground focus:border-primary"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("auth.didNotCode")}
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className={`font-semibold ${
                secondsLeft > 0
                  ? "cursor-not-allowed text-primary/40"
                  : "text-primary hover:underline"
              }`}
            >
              {t("auth.resend")}
            </button>
          </p>

          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {secondsLeft}s
          </span>
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={submitting}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
        >
          {t("auth.verifyCode")}
        </button>
      </div>

      <p className="absolute bottom-6 left-6 text-sm text-primary">
        © Weligo 2026
      </p>
    </div>
  );
}
