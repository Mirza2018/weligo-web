// src/pages/dashboard/provider/ProfileSettingsPageProvider.tsx
import { useEffect, useRef, useState } from "react";
import { Camera, Eye, EyeOff, Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";
import { UserAvatar } from "../../../components/common/UserAvatar";
import { AddressAutocompleteField } from "../../../components/auth/AddressAutocompleteField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  useUserProfileQuery,
  useUserUpdateProviderProfileMutation,
  useUserPasswordChangeMutation,
} from "@/redux/api/authApi";
import { useGetCategoriesQuery } from "@/redux/api/websiteApi";
import { setUserInfo } from "@/redux/slices/authSlice";

import type { RootState } from "@/redux/store";
import { getImageUrl } from "@/redux/getBaseUrl";
import type { GeoPoint } from "@/types/website";

const LANGUAGES = ["Deutsch", "English", "Français", "Italiano"];

type PreferenceKey =
  | "nonSmoker"
  | "driverLicense"
  | "ownVehicle"
  | "comfortableWithPets"
  | "hasChildren";

const PREFERENCE_OPTIONS: { key: PreferenceKey; label: string }[] = [
  { key: "nonSmoker", label: "Non-smoker" },
  { key: "driverLicense", label: "Driver's license" },
  { key: "ownVehicle", label: "Own vehicle" },
  { key: "comfortableWithPets", label: "Comfortable with pets" },
  { key: "hasChildren", label: "Has children" },
];

type CertificateItem = {
  /** Local React key. Equal to the server _id for existing certs. */
  id: string;
  /** Present only for certificates that already exist on the server. */
  _id?: string;
  type: string;
  description: string;
  imgUrl?: string;
  file: File | null;
  preview: string | null;
};

const profileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(3, "Required"),
  city: z.string().min(1, "Required"),
  postalCode: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  shortBioTitle: z.string().optional(),
  shortBio: z.string().optional(),
  longBioTitle: z.string().optional(),
  longBio: z.string().optional(),
});
type ProfileValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "At least 6 characters"),
    newPassword: z.string().min(6, "At least 6 characters"),
  })
  .refine((d) => d.currentPassword !== d.newPassword, {
    message: "New password must be different",
    path: ["newPassword"],
  });
type PasswordValues = z.infer<typeof passwordSchema>;

export function ProfileSettingsPageProvider() {
  return (
    <div className="flex max-w-md flex-col gap-6 pb-24">
      <h2 className="font-serif text-3xl font-medium">Profile Settings</h2>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileForm() {
  const dispatch = useDispatch();
  const storedUser = useSelector((state: RootState) => state.auth.userInfo);
  const { data: profileData } = useUserProfileQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const [updateProfile, { isLoading: isSaving }] =
    useUserUpdateProviderProfileMutation();

  const user = profileData?.data ?? storedUser;
  const categories = categoryData?.data ?? [];

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [experience, setExperience] = useState(1);
  const [languages, setLanguages] = useState<Set<string>>(new Set());

  const [preferences, setPreferences] = useState<
    Record<PreferenceKey, boolean>
  >({
    nonSmoker: false,
    driverLicense: false,
    ownVehicle: false,
    comfortableWithPets: false,
    hasChildren: false,
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [deleteCertificateIds, setDeleteCertificateIds] = useState<string[]>(
    [],
  );

  // Google's autocomplete drives this - it's what actually gets sent as
  // `location` in the update payload. Seeded from the user's existing
  // location so saving other fields without touching the address doesn't
  // wipe it out.
  const [location, setLocation] = useState<GeoPoint | null>(null);
  const [addressValue, setAddressValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      postalCode: "",
      address: "",
      shortBioTitle: "",
      shortBio: "",
      longBioTitle: "",
      longBio: "",
    },
  });

  // IMPORTANT: depends on `user` itself, not `user?._id`. `user` is
  // `profileData?.data ?? storedUser`, and on first mount `storedUser`
  // (from Redux at login) is usually a slimmer object than what
  // `useUserProfileQuery` eventually returns. Same `_id`, different
  // object/reference — so keying off `_id` alone meant this effect never
  // reran once the full profile (certificates, preferences, bios) arrived,
  // leaving the form stuck on stale/empty values.
  useEffect(() => {
    if (!user) return;
    const providerProfile = (user as any).providerProfileId ?? {};

    reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      city: user.city ?? "",
      postalCode: user.postalCode ?? "",
      address: user.address ?? "",
      shortBioTitle: providerProfile.shortBioTitle ?? "",
      shortBio: providerProfile.shortBio ?? "",
      longBioTitle: providerProfile.longBioTitle ?? "",
      longBio: providerProfile.longBio ?? "",
    });
    setAddressValue(user.address ?? "");
    setLocation(user.location ?? null);
    setCategoryId(
      typeof user.categoryId === "string"
        ? user.categoryId
        : (user.categoryId?._id ?? null),
    );
    setHourlyRate(user.hourlyRate ?? 30);
    setExperience(user.experience ?? 1);
    setLanguages(new Set(user.lenguages ?? []));

    setPreferences({
      nonSmoker: providerProfile.preferences?.nonSmoker ?? false,
      driverLicense: providerProfile.preferences?.driverLicense ?? false,
      ownVehicle: providerProfile.preferences?.ownVehicle ?? false,
      comfortableWithPets:
        providerProfile.preferences?.comfortableWithPets ?? false,
      hasChildren: providerProfile.preferences?.hasChildren ?? false,
    });

    setCertificates(
      (providerProfile.certificates ?? []).map((c: any) => ({
        id: c._id,
        _id: c._id,
        type: c.type ?? "",
        description: c.description ?? "",
        imgUrl: c.imgUrl ?? "",
        file: null,
        preview: null,
      })),
    );
    setDeleteCertificateIds([]);
  }, [user]);

  function toggleLanguage(lang: string) {
    setLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(lang)) next.delete(lang);
      else next.add(lang);
      return next;
    });
  }

  function togglePreference(key: PreferenceKey) {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function addCertificate() {
    setCertificates((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type: "",
        description: "",
        file: null,
        preview: null,
      },
    ]);
  }

  function updateCertificate(
    id: string,
    field: "type" | "description",
    value: string,
  ) {
    setCertificates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  }

  function handleCertificateFile(id: string, file: File | null) {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              file,
              preview: file ? URL.createObjectURL(file) : c.preview,
            }
          : c,
      ),
    );
  }

  function removeCertificate(id: string) {
    setCertificates((prev) => {
      const target = prev.find((c) => c.id === id);
      if (target?._id) {
        setDeleteCertificateIds((ids) => [...ids, target._id as string]);
      }
      return prev.filter((c) => c.id !== id);
    });
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  const onSubmit = async (values: ProfileValues) => {
    if (!location) {
      toast.error(
        "Please pick your address from the suggestions so we can save your location.",
      );
      return;
    }

    const formData = new FormData();
    if (avatarFile) formData.append("image", avatarFile);

    // Keep this the single source of truth for ordering: certificateFiles
    // below are appended in this exact same iteration order.
    const certificatesPayload = certificates.map((c) => {
      const entry: Record<string, unknown> = {
        type: c.type,
        description: c.description,
      };
      if (c._id) entry._id = c._id;
      return entry;
    });

    formData.append(
      "data",
      JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: `${values.firstName} ${values.lastName}`.trim(),
        phone: values.phone,
        city: values.city,
        postalCode: values.postalCode,
        address: values.address,
        location,
        categoryId: categoryId ?? undefined,
        hourlyRate,
        experience,
        lenguages: Array.from(languages),
        shortBioTitle: values.shortBioTitle,
        shortBio: values.shortBio,
        longBioTitle: values.longBioTitle,
        longBio: values.longBio,
        preferences,
        certificates: certificatesPayload,
        deleteCertificateIds,
      }),
    );

    certificates.forEach((c) => {
      if (c.file) formData.append("certificateFiles", c.file);
    });

    try {
      const res = await updateProfile(formData).unwrap();

      dispatch(setUserInfo(res.data));
      setAvatarFile(null);
      setDeleteCertificateIds([]);
      setCertificates((prev) =>
        prev.map((c) => ({ ...c, file: null, preview: null })),
      );
      toast.success(res?.message || "Profile updated");
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't update your profile.");
    }
  };

  const avatarSrc =
    avatarPreview ??
    (user?.profileImage
      ? (getImageUrl(user.profileImage) ?? undefined)
      : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
      <div className="relative w-fit">
        <UserAvatar
          name={user?.fullName ?? ""}
          imageUrl={avatarSrc}
          size={80}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
        <button
          type="button"
          aria-label="Change avatar"
          onClick={handleAvatarClick}
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow"
        >
          <Camera className="h-3.5 w-3.5" />
        </button>
      </div>

      <Field
        id="firstName"
        label="First Name"
        error={errors.firstName?.message}
      >
        <Input id="firstName" {...register("firstName")} />
      </Field>
      <Field id="lastName" label="Last Name" error={errors.lastName?.message}>
        <Input id="lastName" {...register("lastName")} />
      </Field>
      <Field id="email" label="Email" error={errors.email?.message}>
        <Input id="email" type="email" disabled {...register("email")} />
      </Field>
      <Field id="phone" label="Phone Number" error={errors.phone?.message}>
        <Input id="phone" {...register("phone")} />
      </Field>

      <Field
        id="address"
        label="Address"
        error={errors.address?.message}
        hint="Start typing and pick your address from the list - it fills in city, postal code, and your saved location."
      >
        <AddressAutocompleteField
          value={addressValue}
          placeholder="Start typing your address..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:border-primary"
          onChange={(v) => {
            setAddressValue(v);
            setValue("address", v, { shouldValidate: true, shouldDirty: true });
          }}
          onPlaceSelected={(place) => {
            setAddressValue(place.formattedAddress);
            setValue("address", place.formattedAddress, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setLocation({ type: "Point", coordinates: [place.lng, place.lat] });

            if (place.city) {
              setValue("city", place.city, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }
            if (place.postalCode) {
              setValue("postalCode", place.postalCode, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }
          }}
        />
      </Field>

      <Field id="city" label="City" error={errors.city?.message}>
        <Input id="city" {...register("city")} />
      </Field>
      <Field
        id="postalCode"
        label="Postal Code"
        error={errors.postalCode?.message}
      >
        <Input id="postalCode" {...register("postalCode")} />
      </Field>

      <div className="space-y-1.5">
        <Label>Service category</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              disabled={
                category.status !== "active" && category._id !== categoryId
              }
              onClick={() => setCategoryId(category._id)}
              className={`h-9 rounded-lg border text-xs font-semibold transition-colors ${
                categoryId === category._id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-muted/40 text-primary hover:bg-muted/60"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Hourly rate (CHF)</Label>
        <div className="flex h-10 items-center justify-between rounded-lg border border-input bg-white px-2.5">
          <button
            type="button"
            onClick={() => setHourlyRate((r) => Math.max(10, r - 1))}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="font-serif text-sm font-bold">CHF {hourlyRate}</span>
          <button
            type="button"
            onClick={() => setHourlyRate((r) => Math.min(200, r + 1))}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Experience (years)</Label>
        <div className="flex h-10 items-center justify-between rounded-lg border border-input bg-white px-2.5">
          <button
            type="button"
            onClick={() => setExperience((r) => Math.max(0, r - 1))}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="font-serif text-sm font-bold">{experience}</span>
          <button
            type="button"
            onClick={() => setExperience((r) => Math.min(40, r + 1))}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Languages</Label>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => {
            const selected = languages.has(lang);
            return (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLanguage(lang)}
                className={`h-8 rounded-full border px-3 text-xs font-semibold transition-colors ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-white text-primary hover:bg-muted/40"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      <Field
        id="shortBioTitle"
        label="Short bio title"
        error={errors.shortBioTitle?.message}
      >
        <Input id="shortBioTitle" {...register("shortBioTitle")} />
      </Field>
      <Field id="shortBio" label="Short bio" error={errors.shortBio?.message}>
        <textarea
          id="shortBio"
          rows={3}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus:border-primary"
          {...register("shortBio")}
        />
      </Field>
      <Field
        id="longBioTitle"
        label="Long bio title"
        error={errors.longBioTitle?.message}
      >
        <Input id="longBioTitle" {...register("longBioTitle")} />
      </Field>
      <Field id="longBio" label="Long bio" error={errors.longBio?.message}>
        <textarea
          id="longBio"
          rows={6}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus:border-primary"
          {...register("longBio")}
        />
      </Field>

      <div className="space-y-1.5">
        <Label>Preferences</Label>
        <div className="space-y-2">
          {PREFERENCE_OPTIONS.map(({ key, label }) => (
            <ToggleSwitch
              key={key}
              checked={preferences[key]}
              onChange={() => togglePreference(key)}
              label={label}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Certificates</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCertificate}
          >
            Add certificate
          </Button>
        </div>

        {certificates.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No certificates added yet.
          </p>
        )}

        <div className="space-y-4">
          {certificates.map((cert) => {
            const imageSrc =
              cert.preview ??
              (cert.imgUrl ? getImageUrl(cert.imgUrl) : undefined);
            return (
              <div
                key={cert.id}
                className="space-y-2 rounded-lg border border-input p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt={cert.type || "Certificate"}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Certificate type"
                      value={cert.type}
                      onChange={(e) =>
                        updateCertificate(cert.id, "type", e.target.value)
                      }
                    />
                    <textarea
                      placeholder="Description"
                      rows={2}
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus:border-primary"
                      value={cert.description}
                      onChange={(e) =>
                        updateCertificate(
                          cert.id,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                    <div className="flex items-center justify-between">
                      <label className="cursor-pointer text-xs font-semibold text-primary">
                        {cert.file ? cert.file.name : "Upload image"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleCertificateFile(
                              cert.id,
                              e.target.files?.[0] ?? null,
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeCertificate(cert.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || isSaving}>
          {isSaving ? "Saving…" : "Edit Information"}
        </Button>
      </div>
    </form>
  );
}

function PasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [changePassword, { isLoading }] = useUserPasswordChangeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const onSubmit = async (values: PasswordValues) => {
    try {
      const res = await changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();
      toast.success(res?.message || "Password updated");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Couldn't update your password.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
      <Field
        id="currentPassword"
        label="Current Password"
        error={errors.currentPassword?.message}
      >
        <div className="relative">
          <Input
            id="currentPassword"
            type={showCurrent ? "text" : "password"}
            {...register("currentPassword")}
          />
          <ToggleEye
            shown={showCurrent}
            onClick={() => setShowCurrent((v) => !v)}
          />
        </div>
      </Field>
      <Field
        id="newPassword"
        label="New Password"
        error={errors.newPassword?.message}
      >
        <div className="relative">
          <Input
            id="newPassword"
            type={showNew ? "text" : "password"}
            {...register("newPassword")}
          />
          <ToggleEye shown={showNew} onClick={() => setShowNew((v) => !v)} />
        </div>
      </Field>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isLoading ? "Updating…" : "Update Password"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function ToggleEye({
  shown,
  onClick,
}: {
  shown: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={shown ? "Hide password" : "Show password"}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {shown ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </button>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-lg border border-input px-3 py-2 text-left"
    >
      <span className="text-sm">{label}</span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
