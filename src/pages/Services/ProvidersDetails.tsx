// src/pages/ProvidersDetails.tsx
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Flag,
  Heart,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllImages from "../../assets/AllImages";
import { Separator } from "../../components/ui/separator";
import { useProviderDetailsQuery } from "@/redux/api/websiteApi";
// import { getImageUrl } from "@/redux/slices/getBaseUrl";
import { useGoogleMaps } from "@/lib/googleMaps";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { StarRating } from "@/components/providers/StarRating";
import { ProviderDetailsSkeleton } from "@/components/providers/ProviderDetailsSkeleton";
import {
  buildCalendarGrid,
  capitalize,
  dayStatus,
  formatRelativeTime,
  formatSlotRange,
  weekdayFromDate,
  WEEKDAYS_MON_FIRST,
} from "@/lib/providerDate";
import type { ProviderDetailsData, Review } from "@/types/providerDetails";
import { getImageUrl } from "@/redux/getBaseUrl";

const navItemDefs = [
  { key: "overview", href: "#overview" },
  { key: "experience", href: "#experience" },
  { key: "reviews", href: "#reviews" },
  { key: "availability", href: "#availability" },
  { key: "location", href: "#location" },
] as const;

const ProvidersDetails = () => {
  const navigate = useNavigate();
  const { serviceId, providerId } = useParams<{
    serviceId: string;
    providerId: string;
  }>();

  const { data, isLoading, isError } = useProviderDetailsQuery(
    providerId ?? "",
    {
      skip: !providerId,
    },
  );

  if (isLoading) return <ProviderDetailsSkeleton />;

  if (isError || !data?.data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#F8F9FC] px-6 text-center">
        <p className="font-serif text-2xl font-semibold text-[#1E1E22]">
          We couldn&apos;t load this profile
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          It may have been removed, or something went wrong on our end.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
        >
          Go back
        </button>
      </main>
    );
  }

  return (
    <ProvidersDetailsContent
      data={data.data}
      serviceId={serviceId}
      providerId={providerId}
      onBack={() => navigate(-1)}
    />
  );
};

function ProvidersDetailsContent({
  data,
  serviceId,
  providerId,
  onBack,
}: {
  data: ProviderDetailsData;
  serviceId?: string;
  providerId?: string;
  onBack: () => void;
}) {
  const { user, profile, reviews, ratingSummary, availability, bookings } =
    data;

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-[#202126]">
      <HeroSection
        user={user}
        profile={profile}
        ratingSummary={ratingSummary}
        onBack={onBack}
      />
      <DetailsNav reviewCount={ratingSummary.totalReviews} />

      <div className="mx-auto grid max-w-430 gap-10 px-6 pb-16 pt-13 sm:px-10 lg:grid-cols-[1fr_377px] lg:px-16">
        <div className="min-w-0 space-y-18">
          <OverviewSection user={user} profile={profile} />
          <QualificationsSection profile={profile} />
          <ReviewsSection reviews={reviews} ratingSummary={ratingSummary} />
          <AvailabilitySection
            user={user}
            availability={availability}
            bookings={bookings}
          />
          <LocationSection user={user} />
        </div>

        <aside className="lg:sticky lg:top-16 lg:self-start">
          <BookingRequestCard
            user={user}
            availability={availability}
            serviceId={serviceId}
            providerId={providerId}
          />
        </aside>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------- */
/* Hero                                                                  */
/* -------------------------------------------------------------------- */

function HeroSection({
  user,
  profile,
  ratingSummary,
  onBack,
}: Pick<ProviderDetailsData, "user" | "profile" | "ratingSummary"> & {
  onBack: () => void;
}) {
  const tags = useMemo(() => buildProfileTags(user, profile), [user, profile]);

  return (
    <section className="bg-[#EEF0FF]">
      <div className="mx-auto max-w-430 px-6 py-4 sm:px-10 lg:px-19.75">
        <div className="flex items-center justify-between">
          <IconButton
            label="Go back"
            icon={ChevronLeft}
            variant="solid"
            onClick={onBack}
          />
          <IconButton label="Report profile" icon={Flag} />
        </div>

        <div className="grid items-end gap-12 pt-3 lg:grid-cols-[1fr_1.02fr]">
          <ProfileSummary
            user={user}
            profile={profile}
            ratingSummary={ratingSummary}
            tags={tags}
          />
          <HeroImage
            src={getImageUrl(user.profileImage) || AllImages.s2}
            alt={user.fullName}
          />
        </div>
      </div>
    </section>
  );
}

function buildProfileTags(
  user: ProviderDetailsData["user"],
  profile: ProviderDetailsData["profile"],
): string[] {
  const tags: string[] = [];
  if (user.experience) tags.push(`${user.experience} years experience`);
  if (user.lenguages?.length) tags.push(user.lenguages.join(", "));
  if (profile.preferences.nonSmoker) tags.push("Non-smoker");
  if (profile.preferences.comfortableWithPets)
    tags.push("Comfortable with pets");
  if (profile.preferences.driverLicense) tags.push("Driver's license");
  return tags;
}

function IconButton({
  label,
  icon: Icon,
  variant = "outline",
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "solid" | "outline";
  onClick?: () => void;
}) {
  const isSolid = variant === "solid";
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 ${
        isSolid
          ? "bg-primary text-primary-foreground"
          : "border border-primary text-primary"
      }`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function ProfileSummary({
  user,
  profile,
  ratingSummary,
  tags,
}: Pick<ProviderDetailsData, "user" | "profile" | "ratingSummary"> & {
  tags: string[];
}) {
  const [firstName, ...rest] = user.fullName.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="max-w-[545px] pb-3">
      <ProfileAvatar
        src={getImageUrl(user.profileImage) || AllImages.s1}
        alt={user.fullName}
      />

      <div className="mt-5">
        <h1 className="max-w-[300px] font-serif text-[58px] font-semibold leading-[1.05] tracking-tight text-[#1E1E22] sm:text-[62px]">
          {firstName}
          {lastName && (
            <>
              <br />
              <span className="font-serif-italic">{lastName}</span>
            </>
          )}
          <span className="ml-1 inline-block h-2.5 w-2.5 rounded-full bg-primary align-middle" />
        </h1>

        <div className="mt-4 flex items-center gap-2 font-serif text-xl text-[#1E1E22]">
          <StarRating rating={ratingSummary.averageRating} />
          <span>
            {ratingSummary.averageRating} ({ratingSummary.totalReviews} Reviews)
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 font-sans text-lg font-semibold text-[#363842]">
          <MapPin className="h-5 w-5" />
          <span>
            {user.city}
            {user.postalCode ? `, ${user.postalCode}` : ""}
          </span>
        </div>

        {profile.shortBioTitle && (
          <h2 className="mt-8 font-serif text-[28px] font-semibold leading-tight text-[#1E1E22]">
            {profile.shortBioTitle}
          </h2>
        )}

        {profile.shortBio && (
          <p className="mt-5 max-w-[530px] font-sans text-xl leading-[1.35] text-[#2F3037]">
            {profile.shortBio}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[166px] w-[166px]">
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-full object-cover bg-muted"
      />
      <span className="absolute bottom-2 right-3 h-6 w-6 rounded-full border-2 border-[#EEF0FF] bg-[#22C55E]" />
    </div>
  );
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg bg-primary px-4 py-3 font-sans text-sm font-bold text-primary-foreground">
      {children}
    </span>
  );
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-bl-[18px] rounded-br-[80px] rounded-tl-[140px] rounded-tr-[18px]">
      <img
        src={src}
        alt={alt}
        className="h-[615px] w-full object-cover bg-muted"
      />
    </div>
  );
}

function DetailsNav({ reviewCount }: { reviewCount: number }) {
  return (
    <nav className="sticky top-0 z-20 border-b border-transparent bg-[#F8F9FC]/95 backdrop-blur">
      <div className="mx-auto flex max-w-430 gap-7 overflow-x-auto px-6 pt-8 sm:px-10 lg:px-16">
        {navItemDefs.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={`shrink-0 border-b-3 pb-2 font-sans text-lg font-bold ${
              index === 0
                ? "border-primary text-[#303139]"
                : "border-transparent text-[#5E6068]"
            }`}
          >
            {item.key === "reviews"
              ? `Reviews (${reviewCount})`
              : navLabel(item.key)}
          </a>
        ))}
      </div>
    </nav>
  );
}

function navLabel(key: string) {
  const labels: Record<string, string> = {
    overview: "Overview",
    experience: "Experience & Qualifications",
    availability: "Availability",
    location: "Location",
  };
  return labels[key] ?? key;
}

/* -------------------------------------------------------------------- */
/* Overview                                                              */
/* -------------------------------------------------------------------- */

function OverviewSection({
  user,
  profile,
}: Pick<ProviderDetailsData, "user" | "profile">) {
  const paragraphs = (profile.longBio ?? "").split("\n").filter(Boolean);

  return (
    <section id="overview" className="scroll-mt-28">
      <SectionKicker>About {user.firstName}</SectionKicker>
      <div className="grid gap-9 lg:grid-cols-[1fr_310px]">
        <div>
          {profile.longBioTitle && (
            <SectionTitle>{profile.longBioTitle}</SectionTitle>
          )}
          <div className="mt-8 max-w-[520px] space-y-5 font-sans text-xl leading-[1.18] text-[#2F3037]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <AtGlanceCard user={user} profile={profile} />
      </div>
    </section>
  );
}

function AtGlanceCard({
  user,
  profile,
}: Pick<ProviderDetailsData, "user" | "profile">) {
  const items: [string, string][] = [
    ["Experience", `${user.experience} years`],
    ["Languages", user.lenguages?.join(", ") || "—"],
    ["Smoker", profile.preferences.nonSmoker ? "No" : "Yes"],
    ["Has Children", profile.preferences.hasChildren ? "Yes" : "No"],
    ["Drives", profile.preferences.driverLicense ? "Yes" : "No"],
    ["Own Vehicle", profile.preferences.ownVehicle ? "Yes" : "No"],
    [
      "Comfortable with Pets",
      profile.preferences.comfortableWithPets ? "Yes" : "No",
    ],
  ];

  return (
    <InfoCard className="mt-24 bg-[#EEF0FF] p-4.5">
      <SectionKicker>At a glance</SectionKicker>
      <div className="mt-4 divide-y divide-border">
        {items.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between py-4">
            <span className="font-sans text-lg text-[#60616A]">{label}</span>
            <span className="font-sans text-lg font-bold text-[#202126]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}

/* -------------------------------------------------------------------- */
/* Booking card                                                          */
/* -------------------------------------------------------------------- */

function BookingRequestCard({
  user,
  availability,
  serviceId,
  providerId,
}: Pick<ProviderDetailsData, "user" | "availability"> & {
  serviceId?: string;
  providerId?: string;
}) {
  const navigate = useNavigate();

  const todaySchedule = availability.weeklySchedule.find(
    (d) => d.day === weekdayFromDate(new Date()),
  );
  const acceptingToday =
    availability.bookingRules.acceptingBookings &&
    dayStatus(todaySchedule) !== "booked";

  return (
    <InfoCard className="bg-white p-4 sm:p-6">
      <div className="font-serif text-[44px] font-semibold leading-none text-primary">
        {user.hourlyRate}{" "}
        <span className="font-sans text-xl text-[#44454C]">/ hour</span>
      </div>

      <p
        className={`mt-6 flex items-center gap-2 font-sans text-base font-bold ${
          acceptingToday ? "text-[#22C55E]" : "text-[#9CA0AE]"
        }`}
      >
        <span
          className={`h-3 w-3 rounded-full ${acceptingToday ? "bg-[#22C55E]" : "bg-[#9CA0AE]"}`}
        />
        {acceptingToday ? "Available Today" : "Not available today"}
      </p>

      <a
        href="#availability"
        className="mt-5 flex h-11 w-full items-center justify-between rounded-lg border border-border bg-white px-3 font-sans text-sm font-bold text-[#303139]"
      >
        <span className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5" />
          Pick your Dates
        </span>
        <ChevronRight className="h-5 w-5" />
      </a>

      <button
        onClick={() =>
          navigate(`/services/${serviceId}/providers/${providerId}/purchase`)
        }
        className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary font-sans text-sm font-bold text-primary-foreground"
      >
        Send booking request
        <ArrowRight className="h-5 w-5" />
      </button>

      <button className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-primary bg-white font-sans text-sm font-bold text-primary">
        <MessageCircle className="h-5 w-5" />
        Send message
      </button>

      <button className="mx-auto mt-5 flex items-center justify-center gap-2 font-sans text-sm font-bold text-[#24252A]">
        <Heart className="h-5 w-5" />
        Add to favorites
      </button>

      <div className="mt-7 space-y-4 border-t border-border pt-7">
        <TrustItem icon={ShieldCheck} label="Verified Profile" />
        <TrustItem icon={CreditCard} label="Secure payment" />
        <TrustItem
          icon={Check}
          label={`Min. booking ${availability.bookingRules.minimumBookingHours}h`}
        />
      </div>
    </InfoCard>
  );
}

function TrustItem({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 font-sans text-sm font-bold">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D7FBE6] text-[#22C55E]">
        <Icon className="h-5 w-5" />
      </span>
      {label}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Qualifications                                                        */
/* -------------------------------------------------------------------- */

function QualificationsSection({
  profile,
}: Pick<ProviderDetailsData, "profile">) {
  const certificates = profile.certificates ?? [];

  return (
    <section id="experience" className="scroll-mt-28">
      <SectionKicker>Experience & Qualifications</SectionKicker>
      <SectionTitle>Trained. Certified. Trusted.</SectionTitle>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_336px]">
        <InfoCard className="bg-white px-8 py-8">
          {certificates.length === 0 ? (
            <p className="font-sans text-base text-muted-foreground">
              No certificates listed yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {certificates.map((cert, index) => (
                <NumberedDetail
                  key={cert._id}
                  index={index + 1}
                  title={cert.type}
                  text={cert.description}
                />
              ))}
            </div>
          )}
        </InfoCard>
        {certificates[0] && <CertificateCard certificate={certificates[0]} />}
      </div>
    </section>
  );
}

function NumberedDetail({
  index,
  title,
  text,
}: {
  index: number;
  title: string;
  text: string;
}) {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-4 py-7 first:pt-0 last:pb-0">
      <span className="font-serif text-4xl text-[#C7C9CF]">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-serif text-xl font-semibold text-[#1E1E22]">
          {title}
        </h3>
        <p className="mt-2 font-sans text-base leading-relaxed text-[#555866]">
          {text}
        </p>
      </div>
    </div>
  );
}

function CertificateCard({
  certificate,
}: {
  certificate: ProviderDetailsData["profile"]["certificates"][number];
}) {
  return (
    <InfoCard className="self-start bg-white p-8">
      <h3 className="font-serif text-2xl font-semibold">{certificate.type}</h3>
      {certificate.imgUrl && (
        <img
          src={getImageUrl(certificate.imgUrl) ?? undefined}
          alt={certificate.type}
          className="mt-5 h-[205px] w-full rounded-xl object-cover bg-muted"
        />
      )}
      <p className="mt-4 font-mono text-xs leading-relaxed text-[#9CA0AE]">
        {certificate.description}
      </p>
    </InfoCard>
  );
}

/* -------------------------------------------------------------------- */
/* Reviews                                                               */
/* -------------------------------------------------------------------- */

function ReviewsSection({
  reviews,
  ratingSummary,
}: Pick<ProviderDetailsData, "reviews" | "ratingSummary">) {
  const left = reviews.filter((_, i) => i % 2 === 0);
  const right = reviews.filter((_, i) => i % 2 === 1);

  return (
    <section id="reviews" className="scroll-mt-28">
      <SectionKicker>Reviews</SectionKicker>
      <h2 className="font-serif text-[32px] font-semibold leading-tight text-[#1E1E22]">
        {ratingSummary.totalReviews} reviews, {ratingSummary.averageRating}{" "}
        average.
      </h2>

      {reviews.length === 0 ? (
        <p className="mt-8 font-sans text-base text-muted-foreground">
          No reviews yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr_1fr]">
          <ReviewStatsCard ratingSummary={ratingSummary} />
          <div className="space-y-4">
            {left.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
          <div className="space-y-4">
            {right.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ReviewStatsCard({
  ratingSummary,
}: Pick<ProviderDetailsData, "ratingSummary">) {
  return (
    <InfoCard className="self-start bg-[#EEF0FF] p-7">
      <div className="font-serif text-[64px] font-semibold leading-none text-primary">
        {ratingSummary.averageRating}
      </div>
      <StarRating rating={ratingSummary.averageRating} className="mt-7" />
      <p className="mt-4 font-mono text-[10px] leading-tight text-[#9CA0AE]">
        Based on {ratingSummary.totalReviews} verified review
        {ratingSummary.totalReviews === 1 ? "" : "s"}
      </p>
      <div className="mt-5 space-y-2">
        {ratingSummary.ratings.map((bucket) => (
          <div
            key={bucket.rating}
            className="grid grid-cols-[44px_1fr_30px] gap-2"
          >
            <span className="font-sans text-xs">{bucket.rating} stars</span>
            <span className="mt-1 h-2 rounded-full bg-[#DDE1EE]">
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${bucket.percentage}%` }}
              />
            </span>
            <span className="text-right font-sans text-xs">
              {bucket.percentage}%
            </span>
          </div>
        ))}
      </div>
      <Separator
        orientation="horizontal"
        className="mt-7 text-amber-500 bg-amber-400"
      />
      <button className="mt-7 h-10 w-full rounded-full bg-primary font-sans text-xs font-bold text-primary-foreground">
        Give Review
      </button>
    </InfoCard>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <InfoCard className="bg-white p-5">
      <div className="flex items-start gap-3">
        {review.reviewerId.profileImage ? (
          <img
            src={getImageUrl(review.reviewerId.profileImage) ?? undefined}
            alt={review.reviewerId.fullName}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="h-7 w-7 shrink-0 rounded-full bg-[#A92A2A]" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-serif text-sm font-semibold">
              {review.reviewerId.fullName}
            </p>
            <span className="font-mono text-[10px] text-[#9CA0AE]">
              {formatRelativeTime(review.createdAt)}
            </span>
          </div>
          <StarRating rating={review.rating} size="xs" />
        </div>
      </div>
      <p className="mt-3 font-serif-italic text-black text-sm font-semibold leading-relaxed">
        {review.comment}
      </p>

      {review.reply && (
        <div className="mt-4 rounded-e-sm border-l-3 border-primary bg-[#FAF9F6] px-3 py-3 font-sans text-[11px] leading-snug text-[#555866]">
          {review.reply.comment}
        </div>
      )}
    </InfoCard>
  );
}

/* -------------------------------------------------------------------- */
/* Availability                                                          */
/* -------------------------------------------------------------------- */

function AvailabilitySection({
  user,
  availability,
  bookings,
}: Pick<ProviderDetailsData, "user" | "availability" | "bookings">) {
  return (
    <section id="availability" className="scroll-mt-28">
      <SectionKicker>Availability</SectionKicker>
      <h2 className="font-serif text-[34px] font-semibold leading-tight">
        When{" "}
        <span className="font-serif-italic text-primary">{user.firstName}</span>{" "}
        is free.
      </h2>
      <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
        <WeeklyHoursCard availability={availability} />
        <CalendarCard availability={availability} bookings={bookings} />
      </div>
    </section>
  );
}

function WeeklyHoursCard({
  availability,
}: Pick<ProviderDetailsData, "availability">) {
  const byDay = new Map(availability.weeklySchedule.map((d) => [d.day, d]));

  return (
    <InfoCard className="bg-white p-5">
      <SectionKicker className="text-[9px]">Weekly Hours</SectionKicker>
      <div className="mt-4 divide-y divide-border">
        {WEEKDAYS_MON_FIRST.map((day) => {
          const schedule = byDay.get(day);
          const status = dayStatus(schedule);
          const label =
            status === "available"
              ? formatSlotRange(schedule!.slots)
              : status === "partial"
                ? "No slot"
                : "Unavailable";

          return (
            <div key={day} className="flex items-center justify-between py-3">
              <span className="flex items-center gap-2 font-serif text-xs">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "available"
                      ? "bg-[#10B981]"
                      : status === "partial"
                        ? "bg-[#F59E0B]"
                        : "bg-[#A8ADB8]"
                  }`}
                />
                {capitalize(day)}
              </span>
              <span className="font-mono text-[10px] text-[#4D5160]">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </InfoCard>
  );
}

function CalendarCard({
  availability,
  bookings,
}: Pick<ProviderDetailsData, "availability" | "bookings">) {
  const [month, setMonth] = useState(() => new Date());

  const grid = useMemo(
    () => buildCalendarGrid(month, availability, bookings),
    [month, availability, bookings],
  );

  const monthLabel = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <InfoCard className="bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="font-serif text-sm">{monthLabel}</p>
        <div className="flex gap-4">
          <button
            aria-label="Previous month"
            onClick={() =>
              setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next month"
            onClick={() =>
              setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
            }
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-2 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day} className="font-mono text-[8px] text-[#4D5160]">
            {day}
          </span>
        ))}
        {grid.map((cell, i) => (
          <span
            key={i}
            className={`flex h-8 items-center justify-center rounded-md font-mono text-[10px] ${
              cell.status === "available"
                ? "bg-[#22C55E] text-white"
                : cell.status === "booked"
                  ? "bg-[#E5E8EF] text-[#8E94A1]"
                  : cell.status === "partial"
                    ? "bg-[#FDE9C8] text-[#8A6116]"
                    : "bg-[#FAFBFD] text-[#D5D9E2]"
            }`}
          >
            {cell.day || ""}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-5 font-sans text-[10px]">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-[#22C55E]" />
          Available
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-[#FDE9C8]" />
          No slot
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-[#E5E8EF]" />
          Booked
        </span>
      </div>
    </InfoCard>
  );
}

/* -------------------------------------------------------------------- */
/* Location                                                              */
/* -------------------------------------------------------------------- */

function LocationSection({ user }: Pick<ProviderDetailsData, "user">) {
  return (
    <section id="location" className="scroll-mt-28">
      <SectionKicker>Location</SectionKicker>
      <h2 className="font-serif text-[34px] font-semibold leading-tight">
        Where{" "}
        <span className="font-serif-italic text-primary">{user.firstName}</span>{" "}
        works.
      </h2>
      <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr] items-start">
        <LocationInfoCard user={user} />
        <div className="h-[360px] w-full overflow-hidden rounded-xl">
          <ProviderLocationMap user={user} />
        </div>
      </div>
    </section>
  );
}

function ProviderLocationMap({ user }: Pick<ProviderDetailsData, "user">) {
  const { isLoaded, loadError } = useGoogleMaps();
  const center = {
    lat: user.location.coordinates[1],
    lng: user.location.coordinates[0],
  };

  if (loadError) {
    return (
      <img
        src={AllImages.map}
        alt="Provider service area map"
        className="h-[360px] w-full object-cover"
      />
    );
  }

  if (!isLoaded) {
    return <div className="h-[360px] w-full animate-pulse bg-muted" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "360px" }}
      center={center}
      zoom={13}
      options={{
        disableDefaultUI: false,
        gestureHandling: "greedy",
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}

function LocationInfoCard({ user }: Pick<ProviderDetailsData, "user">) {
  return (
    <InfoCard className="bg-[#EEF0FF] p-5">
      <SectionKicker className="text-[9px]">Based in</SectionKicker>
      <h3 className="mt-3 font-serif text-xl font-semibold">
        {user.city}
        {user.postalCode ? `, ${user.postalCode}` : ""}
        {user.address && (
          <>
            {" "}
            &bull;
            <br />
            {user.address}
          </>
        )}
      </h3>
      <p className="mt-4 font-sans text-[11px] leading-relaxed text-[#555866]">
        Serves the {user.city} area.
      </p>
    </InfoCard>
  );
}

/* -------------------------------------------------------------------- */
/* Shared bits                                                           */
/* -------------------------------------------------------------------- */

function SectionKicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-sm font-bold uppercase tracking-wider text-primary ${className}`}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 max-w-[680px] font-serif text-[46px] font-semibold leading-[1.15] tracking-tight text-[#1E1E22]">
      {children}
    </h2>
  );
}

function InfoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default ProvidersDetails;
