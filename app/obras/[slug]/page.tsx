import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings, getWork } from "@/lib/sanity";
import { fallbackWorks } from "@/lib/works";

export const revalidate = 60;

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return fallbackWorks.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  return work
    ? {
        title: `${work.title} | Portfólio`,
        ...(work.description ? { description: work.description } : {}),
      }
    : {};
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const [work, siteSettings] = await Promise.all([getWork(slug), getSiteSettings()]);

  if (!work) notFound();

  const isLandscape = work.imageWidth >= work.imageHeight;
  const imageFrameClass = isLandscape
    ? "relative mx-auto aspect-[4/3] w-full max-w-[960px] bg-[var(--canvas-soft)]"
    : "relative mx-auto aspect-[3/4] w-full max-w-[560px] bg-[var(--canvas-soft)]";
  const contactEmail = siteSettings?.contactEmail || "email@exemplo.com";

  return (
    <main>
      <SiteHeader
        logoType={siteSettings?.logoType}
        logoImage={siteSettings?.logoImage}
        logoText={siteSettings?.logoText}
        logoAlt={siteSettings?.logoAlt}
        instagram={siteSettings?.instagram}
        whatsapp={siteSettings?.whatsapp}
      />
      <article className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 md:py-16 lg:px-12">
        <Link href="/#galeria" className="inline-flex items-center gap-2 text-[12px] text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"><ArrowLeft size={16} /> Voltar para a galeria</Link>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-20">
          <div className={imageFrameClass}>
            <Image src={work.image} alt={work.alt} fill priority sizes="(max-width: 1023px) calc(100vw - 2.5rem), 960px" className="object-contain" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">{work.category}</p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,6.6rem)] leading-[0.88] tracking-[-0.09em]">{work.title}</h1>
            {work.description ? <p className="mt-8 max-w-[34ch] text-[14px] leading-6 text-[var(--ink-muted)]">{work.description}</p> : null}
            {work.technique || work.year ? (
              <dl className="mt-10 grid gap-3 border-t border-[var(--line)] pt-4 text-[12px]">
                {work.technique ? <div className="flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Técnica</dt><dd className="max-w-[20ch] text-right">{work.technique}</dd></div> : null}
                {work.year ? <div className="flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Ano</dt><dd>{work.year}</dd></div> : null}
              </dl>
            ) : null}
            <a href={`mailto:${contactEmail}`} className="mt-10 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1.5 text-[13px] transition-colors hover:text-[var(--accent)]">Consultar sobre esta obra <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </article>
    </main>
  );
}
