import Hero2 from "@/components/home/Hero2";
import {
  useAllFeedbackQuery,
  useGetCategoriesQuery,
  useSearchProvidersQuery,
} from "@/redux/api/websiteApi";
import { getImageUrl } from "@/redux/getBaseUrl";
import {
  ArrowLeft,
  // ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AllImages from "../assets/AllImages";
import { useI18n } from "../lib/i18n";
import { FavoriteButton } from "@/components/servicePage/FavoriteButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode";

// export const Route = createFileRoute("/")({
//   component: Home,
// });

export function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);

      // Small delay so the animation can start smoothly
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Start closing animation
    setIsVisible(false);

    // Remove from DOM after animation finishes
    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  if (!showPopup) {
    return (
      <div>
        {" "}
        <Hero2 />
        <ServicesStrip />
        <CaregiverPreview />
        <Testimonial />
        <HowItWorks />
        <FAQ />
        <ProviderCTA />
      </div>
    );
  }
  return (
    <div>
      <Hero2 />
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
          isVisible ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0"
        }`}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className={`relative w-full max-w-3xl transform transition-all duration-500 ease-out ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-95 opacity-0"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all duration-200 hover:scale-110 hover:bg-gray-100 active:scale-95"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <img
              src={AllImages.popup}
              alt="Popup"
              className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// function Hero() {
//   const { data } = useSearchProvidersQuery({});
//   const { t } = useI18n();
//   return (
//     <section className="bg-background">
//       <div className="mx-auto   pt-12 sm:px-6 ">
//         <div className="mx-auto max-w-4xl text-center fade-up">
//           <h1 className="text-5xl leading-[1.05] tracking-tight sm:text-[72px] font-bold">
//             {t("home.titleA")}
//             <br />
//             <span className="">
//               {t("home.titleB").split(" ").slice(0, -1).join(" ")}{" "}
//               <span className="font-serif-italic ">
//                 {t("home.titleB").split(" ").slice(-1)}
//               </span>
//             </span>
//           </h1>
//           <p className="mx-auto mt-5 max-w-xl text-base text-[#313233] font-medium">
//             {t("home.sub")}
//           </p>
//           <SearchBar />
//         </div>
//         <div className="mt-10">
//           <MasonryRail />
//         </div>
//       </div>
//     </section>
//   );
// }

// function SearchBar() {
//   const router = useNavigate();
//   return (
//     <div className="mx-auto mt-8 flex flex-col max-w-4xl gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm lg:flex-row lg:items-center ">
//       <Field label="What are you looking for?" icon={Baby} divider>
//         Childcare
//       </Field>

//       <Field label="Location" icon={MapPin} divider>
//         Zürich, 8001
//       </Field>

//       <Field label="Date & Time" icon={CalendarDays}>
//         Sat, 18 May, 09:00
//       </Field>

//       <button
//         onClick={() => {
//           router("/sign-up");
//         }}
//         className="cursor-pointer shrink-0 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] whitespace-nowrap"
//       >
//         <Search className="h-4 w-4" /> Search
//       </button>
//     </div>
//   );
// }
// function Field({
//   label,
//   icon: Icon,
//   divider,
//   children,
// }: {
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
//   divider?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-muted-bg ! ${divider ? "sm:rounded-none sm:border-r sm:border-border" : ""}`}
//     >
//       <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-muted">
//         <Icon className="h-5 w-5 text-primary" />
//       </span>
//       <div className="min-w-0 w-42">
//         <p className="text-sm text-[#313233] font-semibold">{label}</p>
//         <p className="truncate text-lg font-bold text-foreground">{children}</p>
//       </div>
//     </div>
//   );
// }

function ServicesStrip() {
  const { data, isLoading } = useGetCategoriesQuery({});
  const { t } = useI18n();

  const categories = [...(data?.data ?? [])].sort((a, b) => a.order - b.order);

  // Your existing 6 color combinations
  const colorStyles = [
    {
      tint: "bg-primary/10",
      iconColor: "text-primary",
      ring: "ring-primary/40",
      badge: "text-primary bg-[#DCD2F2]!",
    },
    {
      tint: "bg-[color:var(--tint-yellow)]",
      iconColor: "text-amber-500",
      ring: "ring-amber-400/40",
      badge: "text-amber-600 bg-[#F9E7B5]!",
    },
    {
      tint: "bg-[color:var(--tint-blue)]",
      iconColor: "text-sky-500",
      ring: "ring-sky-400/40",
      badge: "text-sky-600 bg-[#D3E6FA]!",
    },
    {
      tint: "bg-[color:var(--tint-green)]!",
      iconColor: "text-emerald-500",
      ring: "ring-emerald-400/40",
      badge: "text-emerald-600 bg-[#CCEBDC]!",
    },
    {
      tint: "bg-[color:var(--tint-red)]",
      iconColor: "text-rose-500",
      ring: "ring-rose-400/40",
      badge: "text-rose-600 bg-[#F6CFD4]!",
    },
    {
      tint: "bg-primary-muted",
      iconColor: "text-primary",
      ring: "ring-primary/40",
      badge: "text-primary bg-[#DCD2F2]!",
    },
  ];

  // Change this according to your API environment
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <section className="mx-auto max-w-430 px-4 py-20 sm:px-6 lg:px-8">
      <p className="eyebrow">{t("home.servicesEyebrow")}</p>

      <h2 className="mt-2 text-3xl font-semibold sm:text-[48px]">
        {t("home.servicesTitleA")}
        <span className="font-serif-italic">{t("home.servicesTitleB")}</span>
        {t("home.servicesTitleC")}
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[260px] animate-pulse rounded-3xl bg-muted"
              />
            ))
          : categories.map((category, index) => {
              // Repeat the 6 colors
              const color = colorStyles[index % colorStyles.length];

              const isAvailable = category.status === "active";

              // Handle both full URL and relative API path
              const iconUrl = category.icon?.startsWith("http")
                ? category.icon
                : `${getImageUrl(category.icon)}`;

              return (
                <Link
                  key={category?._id}
                  to={`/services/${category?._id}/providers`}
                  // to={`/services/category?._id`}
                  className={`group flex flex-col items-center justify-start gap-4 rounded-3xl ${
                    color.tint
                  } ${
                    isAvailable ? `ring-2 ${color.ring}` : ""
                  } p-6 text-center transition-transform hover:-translate-y-1`}
                >
                  {/* Category Icon */}
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <img
                      src={iconUrl}
                      alt={category.name}
                      className={`h-8 w-8 object-contain ${color.iconColor}`}
                    />
                  </span>

                  {/* Category Name */}
                  <h3 className="text-foreground font-semibold xl:text-xl">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#5E6062]">
                    {category.description}
                  </p>

                  {/* Coming Soon */}
                  {!isAvailable && (
                    <span
                      className={`mt-auto inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium ${color.badge}`}
                    >
                      {t("services.comingSoon")}
                    </span>
                  )}
                </Link>
              );
            })}
      </div>
    </section>
  );
}

interface DecodedToken {
  fullName: string;
  email: string;
  phone?: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
function CaregiverPreview() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useSearchProvidersQuery({
    page: 1,
    limit: 8,
  });

  const providers = data?.data ?? [];

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const decodedToken = accessToken
    ? jwtDecode<DecodedToken>(accessToken)
    : null;

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card
      ? card.offsetWidth + 24 /* gap-6 */
      : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-430 px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{t("home.providersEyebrow")}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">
            {t("home.providersTitleA")}
            <span className="font-serif-italic">
              {t("home.providersTitleB")}
            </span>
          </h2>
        </div>

        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:bg-foreground/5"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:bg-foreground/5"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse rounded-3xl bg-foreground/5"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="mt-8 text-sm text-foreground/60">
          {t("home.providersLoadError") ?? "Couldn't load providers right now."}
        </p>
      )}

      {!isLoading && !isError && (
        <div
          ref={scrollRef}
          className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {providers.map((provider) => {
            const categoryId = provider.categoryId?._id;
            const providerId = provider._id;
            const canLink = Boolean(categoryId && providerId);
            const purchaseHref = canLink
              ? `/services/${categoryId}/providers/${providerId}`
              : undefined;

            // Sizing classes must live on whichever element is the actual flex
            // child (the wrapper), not on an inner element — otherwise linked
            // and non-linked cards end up different sizes.
            const wrapperClassName =
              "group relative block aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl shadow-sm transition-transform hover:-translate-y-1 sm:w-[45%] md:w-[calc(33.333%-16px)]";

            const cardInner = (
              <>
                <img
                  src={
                    provider.profileImage
                      ? getImageUrl(provider.profileImage)
                      : AllImages.hc1
                  }
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {provider.averageRating?.toFixed(1) ?? "0.0"} (
                  {provider.totalReview ?? 0})
                </div>

                {decodedToken?.role === "family" && (
                  <FavoriteButton
                    providerId={provider._id}
                    providerName={provider.fullName}
                    className="absolute right-0 top-2"
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="font-serif text-xl">{provider.fullName}</p>
                  <p className="text-xs text-white/80">
                    {provider.categoryId?.name ??
                      t("home.providersGenericCategory") ??
                      "Service"}{" "}
                    · {provider.city}
                    {provider.postalCode ? ` ${provider.postalCode}` : ""}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                    CHF {provider.hourlyRate ?? 0} / hr
                  </span>
                </div>
              </>
            );

            return purchaseHref ? (
              <Link
                key={provider._id}
                to={purchaseHref}
                data-card
                className={wrapperClassName}
              >
                {cardInner}
              </Link>
            ) : (
              <div key={provider._id} data-card className={wrapperClassName}>
                {cardInner}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

type FeedbackItem = {
  _id: string;
  text: string;
  rating: number;
  adminVerified: string;
  isDeleted: boolean;
  userId?: {
    _id: string;
    fullName: string;
    profileImage: string;
    role: string;
  };
};
const collage = [
  { img: AllImages.hr1, className: "left-[6%] top-[2%] h-[36%] w-[34%]" },
  { img: AllImages.hr2, className: "right-[4%] top-0 h-[44%] w-[40%]" },
  { img: AllImages.hr3, className: "left-0 bottom-[6%] h-[32%] w-[28%]" },
  { img: AllImages.hr4, className: "left-[30%] bottom-0 h-[44%] w-[34%]" },
  { img: AllImages.hr5, className: "right-0 bottom-[12%] h-[30%] w-[30%]" },
];

function Testimonial() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);

  const { data, isLoading, isError } = useAllFeedbackQuery({ limit: 20 });

  const reviews: FeedbackItem[] = (data?.data?.result ?? []).filter(
    (f: FeedbackItem) => f.adminVerified === "verified" && !f.isDeleted,
  );

  const hasReviews = reviews.length > 0;
  const r = hasReviews ? reviews[idx % reviews.length] : null;

  const prev = () => setIdx((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIdx((i) => (i + 1) % reviews.length);

  return (
    <section className="bg-muted-bg">
      <div className="mx-auto max-w-430 px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="eyebrow">{t("home.familiesEyebrow")}</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground font-semibold sm:text-[48px]">
            {t("home.familiesTitleA")}
            <span className="font-serif-italic text-primary">
              {t("home.familiesTitleB")}
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Quote + navigation on the left */}
          <div key={idx} className="fade-up">
            {isLoading && (
              <div className="space-y-4">
                <div className="h-5 w-32 animate-pulse rounded bg-foreground/10" />
                <div className="h-24 w-full animate-pulse rounded bg-foreground/10" />
                <div className="h-11 w-40 animate-pulse rounded-full bg-foreground/10" />
              </div>
            )}

            {!isLoading && isError && (
              <p className="text-sm text-muted-foreground">
                {t("home.feedbackLoadError") ??
                  "Couldn't load reviews right now."}
              </p>
            )}

            {!isLoading && !isError && !hasReviews && (
              <p className="text-sm text-muted-foreground">
                {t("home.feedbackEmpty") ??
                  "No reviews yet — be the first to share yours."}
              </p>
            )}

            {!isLoading && !isError && hasReviews && r && (
              <>
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < r.rating
                          ? "h-5 w-5 fill-current"
                          : "h-5 w-5 fill-none text-amber-400/30"
                      }
                    />
                  ))}
                </div>
                <p className="mt-6 font-serif text-5xl font-semibold leading-snug text-foreground sm:text-4xl">
                  "{r.text}"
                </p>
                <div className="mt-10 flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        r.userId?.profileImage
                          ? getImageUrl(r.userId.profileImage)
                          : AllImages.hr4
                      }
                      alt={r.userId?.fullName ?? "User"}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold">
                        {r.userId?.fullName ??
                          t("home.anonymous") ??
                          "Weligo user"}
                      </p>
                      {r.userId?.role && (
                        <p className="text-xs capitalize text-muted-foreground">
                          {r.userId.role}
                        </p>
                      )}
                    </div>
                  </div>

                  {reviews.length > 1 && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={prev}
                        aria-label="Previous review"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next review"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Static asymmetric collage on the right */}
          <div className="relative mx-auto h-[460px] w-full sm:h-[520px]">
            {collage.map((c, i) => (
              <div
                key={i}
                className={`absolute overflow-hidden shadow-md ${c.className}`}
              >
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    {
      n: "01",
      title: t("home.step1Title"),
      desc: t("home.step1Desc"),
      img: AllImages.ht1,
    },
    {
      n: "02",
      title: t("home.step2Title"),
      desc: t("home.step2Desc"),
      img: AllImages.ht2,
    },
    {
      n: "03",
      title: t("home.step3Title"),
      desc: t("home.step3Desc"),
      img: AllImages.ht3,
    },
  ];
  return (
    <section className="mx-auto max-w-430 px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="eyebrow">{t("home.howEyebrow")}</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-[48px]">
          <span className="font-serif-italic">{t("home.howTitleA")}</span>
          {t("home.howTitleB")}
        </h2>
      </div>
      <div className="mt-12 space-y-8">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <p className="font-mono text-primary text-4xl font-bold">{s.n}</p>
              <p className="mt-2 text-4xl font-bold">{s.title}</p>
              <p className="mt-3  text-xl font-medium  ">{s.desc}</p>
            </div>
            <div className="aspect-20/10 overflow-hidden rounded-3xl">
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const { t } = useI18n();
  const items = [
    {
      q: "How are providers verified?",
      a: "Every provider on Weligo undergoes a strict vetting process. This includes identity verification, a criminal background check (strafregisterauszug), a review of certifications, and a personal interview. We only accept about 15% of applicants to ensure highest quality care.",
    },
    {
      q: "How do payments work?",
      a: "Secure payments via TWINT, credit card or invoice. Caregivers are paid automatically each week.",
    },
    {
      q: "Are the services insured?",
      a: "Yes, all bookings are covered by Weligo's liability insurance.",
    },
    // {
    //   q: "Do I need to declare AHV / social security?",
    //   a: "Weligo handles all the paperwork for compliant Swiss employment.",
    // },
    {
      q: "What if I need to cancel?",
      a: "Free cancellation up to 24h before the booking.",
    },
    {
      q: "Is Weligo available across all of Switzerland?",
      a: "We launch in Zürich, Genève, Basel, Bern and expand quickly.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-muted-bg">
      <div className="mx-auto grid max-w-430 gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <p className="eyebrow">{t("home.faqEyebrow")}</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-[48px]">
            {t("home.faqTitleA")}
            <span className="font-serif-italic text-primary">
              {t("home.faqTitleB")}
            </span>
          </h2>
        </div>
        <div className="divide-y divide-border">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">
                    {it.q}
                  </p>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground fade-up">
                      {it.a}
                    </p>
                  )}
                </div>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary text-primary transition-transform">
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProviderCTA() {
  const { t } = useI18n();
  return (
    <section className="">
      <div className="rounded-3xl bg-primary-muted p-8 md:p-14 flex flex-col justify-center items-center">
        <div className=" max-w-430 px-4 py-20 sm:px-6 lg:px-8 ">
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-serif text-4xl leading-[1.1] text-foreground font-bold sm:text-6xl text-center">
              {t("home.earnTitle")}
              <br />
              {t("home.earnTitle2")}{" "}
              <span className="font-serif-italic text-primary">
                {" "}
                {t("home.earnTitle3")}
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              {t("home.earnDesc")}
            </p>
            <Link
              to="/sign-up"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {t("common.joinWaitlist")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
//Main//
// function ProviderCTA() {
//   const { t } = useI18n();
//   return (
//     <section className="">
//       <div className="rounded-3xl bg-primary-muted p-8 md:p-14">
//         <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 mx-auto max-w-430 px-4 py-20 sm:px-6 lg:px-8">
//           <div>
//             <h2 className="font-serif text-4xl leading-[1.1] text-foreground font-bold sm:text-6xl">
//               {t("home.earnTitle")}
//               <br />
//               {t("home.earnTitle2")}
//             </h2>
//             <p className="mt-5 max-w-md text-base text-muted-foreground">
//               {t("home.earnDesc")}
//             </p>
//             <Link
//               to="/sign-up"
//               className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
//             >
//               {t("home.becomeProvider")} <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//           <div className="relative mx-auto h-64 w-full max-w-md">
//             <Stat
//               label={t("home.statRateLabel")}
//               value="CHF 20"
//               className="absolute left-0 top-2 w-44"
//             />
//             <Stat
//               label={t("home.statRatingLabel")}
//               value="4.9"
//               className="absolute right-0 top-0 w-40"
//             />
//             <Stat
//               label={t("home.statBookingsLabel")}
//               value="12k+"
//               className="absolute left-12 bottom-2 w-44"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// function Stat({
//   label,
//   value,
//   className = "",
// }: {
//   label: string;
//   value: string;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`rounded-2xl bg-[#1B164D] p-5 text-white shadow-md transition-transform hover:-translate-y-1 animate-[shake_3s_ease-in-out_infinite] ${className}`}
//     >
//       <p className="font-serif text-2xl font-semibold">{value}</p>
//       <p className="mt-1 text-xs text-white/75">{label}</p>
//     </div>
//   );
// }
