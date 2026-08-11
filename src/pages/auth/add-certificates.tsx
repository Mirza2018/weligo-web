import { ArrowLeft, ArrowRight, Check, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useI18n } from "../../lib/i18n";
import { AuthLayout } from "../../components/authPage/AuthLayout";

type CertificateFile = {
  id: string;
  name: string;
  sizeLabel: string;
  file?: File;
};

const MAX_FILE_SIZE_MB = 20;

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb < 0.1 ? "<0.1" : mb.toFixed(1)}MB`;
}

export function AddCertificates() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [certificates, setCertificates] = useState<CertificateFile[]>([
    { id: "seed-1", name: "Name of document.pdf", sizeLabel: "13MB" },
    { id: "seed-2", name: "Name of document.pdf", sizeLabel: "13MB" },
  ]);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const next: CertificateFile[] = [];
    Array.from(files).forEach((file) => {
      const sizeMb = file.size / (1024 * 1024);
      if (sizeMb > MAX_FILE_SIZE_MB) {
        toast.error(`${file.name} is over ${MAX_FILE_SIZE_MB}MB`);
        return;
      }
      next.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        name: file.name,
        sizeLabel: formatSize(file.size),
        file,
      });
    });

    if (next.length) {
      setCertificates((prev) => [...prev, ...next]);
    }

    e.target.value = "";
  };

  const handleRemove = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = async () => {



    navigate("/about-you");
    if (certificates.length === 0) {
      toast.error(
        t("provider.addAtLeastOneCert") ??
          "Please add at least one certificate.",
      );
      return;
    }
    if (!confirmed) {
      toast.error(
        t("provider.confirmDocsRequired") ??
          "Please confirm your documents are valid.",
      );
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Please wait...");
    try {
      // TODO: upload certificates and move to next onboarding step
      toast.success(t("provider.certsSaved") ?? "Certificates saved", {
        id: toastId,
        duration: 2000,
      });
      navigate("/onboarding/review");
    } catch (error: any) {
      toast.error(error?.data?.message || "Upload failed", {
        id: toastId,
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={t("auth.certificateA")}
      // italic={t("provider.addYourB") ?? "certificates."}
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
                className="flex items-center justify-between rounded-xl border border-input bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {cert.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {cert.sizeLabel}
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(cert.id)}
                  aria-label={`Remove ${cert.name}`}
                  className="text-red-500 transition-colors hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
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
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center  border transition-colors ${
              confirmed
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-white"
            }`}
          >
            {confirmed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
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
            disabled={submitting}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {t("auth.continue")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
