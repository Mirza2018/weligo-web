// src/routes/auth/provider/AddCertificates.tsx
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


import {
  useProviderOnboarding,
  type OnboardingCertificate,
} from "@/context/ProviderOnboardingContext";
import { useI18n } from "@/lib/i18n";
import { AuthLayout } from "@/components/authPage/AuthLayout";

const MAX_FILE_SIZE_MB = 20;

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb < 0.1 ? "<0.1" : mb.toFixed(1)}MB`;
}

export function AddCertificates() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { state, update } = useProviderOnboarding();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [certificates, setCertificates] = useState<OnboardingCertificate[]>(
    state.certificates,
  );
  const [confirmed, setConfirmed] = useState(false);

  const handleAddClick = () => fileInputRef.current?.click();

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const next: OnboardingCertificate[] = [];
    Array.from(files).forEach((file) => {
      const sizeMb = file.size / (1024 * 1024);
      if (sizeMb > MAX_FILE_SIZE_MB) {
        toast.error(`${file.name} is over ${MAX_FILE_SIZE_MB}MB`);
        return;
      }
      // Filename without extension is a reasonable starting "type" title -
      // the person can rename it below.
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      next.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        type: baseName,
        description: "",
      });
    });

    if (next.length) setCertificates((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const handleRemove = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  };

  const updateCert = (id: string, patch: Partial<OnboardingCertificate>) => {
    setCertificates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  };

  const handleBack = () => navigate(-1);

  const handleContinue = () => {
    if (certificates.length === 0) {
      toast.error(
        t("provider.addAtLeastOneCert") ??
          "Please add at least one certificate.",
      );
      return;
    }
    if (certificates.some((c) => !c.type.trim())) {
      toast.error("Please give every certificate a title.");
      return;
    }
    if (!confirmed) {
      toast.error(
        t("provider.confirmDocsRequired") ??
          "Please confirm your documents are valid.",
      );
      return;
    }

    update({ certificates });
    navigate("/about-you");
  };

  return (
    <AuthLayout
      title={t("auth.certificateA")}
      description={t("auth.certificateDesc")}
    >
      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />

        {certificates.length > 0 && (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="space-y-2 rounded-xl border border-input bg-white px-4 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground">
                    {cert.file.name} &middot; {formatSize(cert.file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(cert.id)}
                    aria-label={`Remove ${cert.file.name}`}
                    className="shrink-0 text-red-500 transition-colors hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <input
                  value={cert.type}
                  onChange={(e) =>
                    updateCert(cert.id, { type: e.target.value })
                  }
                  placeholder="Certificate title, e.g. First aid certificate"
                  className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-primary"
                />
                <textarea
                  value={cert.description}
                  onChange={(e) =>
                    updateCert(cert.id, { description: e.target.value })
                  }
                  placeholder="Short description (optional)"
                  rows={2}
                  className="w-full resize-none rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddClick}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          + {t("auth.certificateCta")}
        </button>

        <label className="flex cursor-pointer items-start gap-2.5 pt-2">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
              confirmed
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-white"
            }`}
          >
            {confirmed && <span className="text-xs">✓</span>}
          </span>
          <span className="text-sm text-foreground">
            {t("auth.certificateConfirmation")}
          </span>
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary/10 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("auth.back")}
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            {t("auth.continue")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
