// src/pages/dashboard/family/ProfileSettingsPage.tsx
import { useEffect, useRef, useState } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
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
  useUserUpdateFamilyProfileMutation,
  useUserPasswordChangeMutation,
} from "@/redux/api/authApi";
import { setUserInfo } from "@/redux/slices/authSlice";

import type { RootState } from "@/redux/store";
import { getImageUrl } from "@/redux/getBaseUrl";
import type { GeoPoint } from "@/types/website";

const profileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(3, "Required"),
  city: z.string().min(1, "Required"),
  postalCode: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
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

export function ProfileSettingsPage() {
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
  // Refetches on mount so settings always reflects the latest server state,
  // even if the Redux copy is stale.
  const { data: profileData } = useUserProfileQuery({});
  const [updateProfile, { isLoading: isSaving }] =
    useUserUpdateFamilyProfileMutation();

  const user = profileData?.data ?? storedUser;

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Google's autocomplete drives this - it's what actually gets sent as
  // `location` in the update payload. Seeded from the user's existing
  // location so saving other fields (name, phone...) without touching the
  // address doesn't wipe it out.
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
    },
  });

  // Populate the form once real user data has loaded.
  useEffect(() => {
    if (!user) return;
    reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      city: user.city ?? "",
      postalCode: user.postalCode ?? "",
      address: user.address ?? "",
    });
    setAddressValue(user.address ?? "");
    setLocation(user.location ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

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
      }),
    );

    try {
      const res = await updateProfile(formData).unwrap();

      dispatch(setUserInfo(res.data));
      setAvatarFile(null);
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
  console.log("====================================");
  console.log(avatarSrc);
  console.log("====================================");
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

            // Google doesn't always return these (rural addresses, some
            // countries, etc). When it does, auto-fill; when it doesn't,
            // leave whatever the person already typed so the "Required"
            // validation forces them to fill it in by hand before saving.
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
