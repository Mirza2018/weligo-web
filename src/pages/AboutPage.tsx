// import { SiteHeader } from "@/components/site/SiteHeader";
// import { SiteFooter } from "@/components/site/SiteFooter";
// import { PageHero, SectionHeader } from "@/components/site/PageHero";
// import { aboutContent, IMG } from "@/components/site/marketingContent";
// import { useI18n } from "@/lib/i18n";

import AllImages from "../assets/AllImages";
import { aboutContent } from "../components/familiesPage/marketingContent";
import { PageHero, SectionHeader } from "../components/familiesPage/PageHero";
import { useI18n } from "../lib/i18n";

export function AboutPage() {
  const { lang } = useI18n();
  const c = aboutContent(lang);
  return (
    <div className="min-h-screen bg-background">
      {/* <SiteHeader active="aboutUs" /> */}
      <PageHero {...c.hero} />
      <OurStory c={c.story} />
      <Values c={c.values} />
      <Mission c={c.mission} />
      {/* <SiteFooter /> */}
    </div>
  );
}

function OurStory({ c }: { c: ReturnType<typeof aboutContent>["story"] }) {
  return (
    <section className="mx-auto max-w-430 px-4 py-16 sm:py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeader
            eyebrow={c.eyebrow}
            titleA={c.titleA}
            titleB={c.titleB}
          />
          <div className="mt-6 space-y-4 text-base font-medium text-muted-foreground sm:text-xl">
            {c.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-6 border-l-4 border-primary pl-4 font-serif text-lg font-semibold italic sm:text-3xl">
            {c.quote}
          </blockquote>
          <div className="mt-6 space-y-4 text-base font-medium text-muted-foreground sm:text-xl">
            {c.paragraphs2.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <img
          src={AllImages.a1}
          alt=""
          loading="lazy"
          className="aspect-square w-full rounded-2xl object-cover lg:sticky lg:top-24"
        />
      </div>
    </section>
  );
}

function Values({ c }: { c: ReturnType<typeof aboutContent>["values"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:pb-20 lg:px-8">
      <SectionHeader eyebrow={c.eyebrow} titleA={c.titleA} titleB={c.titleB} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {c.items.map((it, i) => (
          <article
            key={it.title}
            className="rounded-2xl border border-primary/80 bg-[#EDEFFF] p-6"
          >
            <p className="font-serif text-2xl sm:text-[48px] font-semibold text-primary">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-lg font-semibold sm:text-2xl">
              {it.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Mission({ c }: { c: ReturnType<typeof aboutContent>["mission"] }) {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundImage: `url(${AllImages.a2})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center text-white sm:py-24 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold italic sm:text-5xl">
          {c.titleA}
          <br />
          {c.titleB}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base">{c.sub}</p>
      </div>
    </section>
  );
}
