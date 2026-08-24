import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings, getWork } from "@/lib/sanity";
import { fallbackWorks } from "@/lib/works";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return fallbackWorks.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  return work ? { title: `${work.title} | Lelematoos`, description: work.description } : {};
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const [work, siteSettings] = await Promise.all([getWork(slug), getSiteSettings()]);

  if (!work) notFound();

  const aspectRatio = `${work.imageWidth} / ${work.imageHeight}`;

  return (
    <main>
      <SiteHeader logo={siteSettings?.logo} instagram={siteSettings?.instagram} whatsapp={siteSettings?.whatsapp} />
      <article className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 md:py-16 lg:px-12">
        <Link href="/#galeria" className="inline-flex items-center gap-2 text-[12px] text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"><ArrowLeft size={16} /> Voltar para a galeria</Link>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-20">
          <div style={{ aspectRatio }} className="relative w-full bg-[var(--canvas-soft)]">
            <Image src={work.image} alt={work.alt} fill priority sizes="(max-width: 1023px) 100vw, calc(100vw - 420px)" className="object-contain" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">{work.category}</p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,6.6rem)] leading-[0.88] tracking-[-0.09em]">{work.title}</h1>
            <p className="mt-8 max-w-[34ch] text-[14px] leading-6 text-[var(--ink-muted)]">{work.description}</p>
            <dl className="mt-10 grid gap-3 border-t border-[var(--line)] pt-4 text-[12px]">
              <div className="flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Técnica</dt><dd className="max-w-[20ch] text-right">{work.technique}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Ano</dt><dd>{work.year}</dd></div>
            </dl>
            <a href="mailto:contato@lelematoos.art" className="mt-10 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1.5 text-[13px] transition-colors hover:text-[var(--accent)]">Consultar sobre esta obra <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </article>
    </main>
  );
}
