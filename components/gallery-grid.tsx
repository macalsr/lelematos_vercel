"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/icons/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/icons/ArrowRight";
import { X } from "@phosphor-icons/react/dist/icons/X";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Work } from "@/lib/works";

type GalleryGridProps = {
  works: Work[];
};

function distributeWorkIndexes(works: Work[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => [] as number[]);
  const columnHeights = Array.from({ length: columnCount }, () => 0);

  works.forEach((work, index) => {
    const shortestColumn = columnHeights.reduce(
      (shortestIndex, height, currentIndex) => (height < columnHeights[shortestIndex] ? currentIndex : shortestIndex),
      0,
    );

    columns[shortestColumn].push(index);
    columnHeights[shortestColumn] += work.imageHeight / Math.max(work.imageWidth, 1);
  });

  return columns;
}

export function GalleryGrid({ works }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (activeIndex === null) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((current) => (current === null ? 0 : (current + 1) % works.length));
      if (event.key === "ArrowLeft") setActiveIndex((current) => (current === null ? 0 : (current - 1 + works.length) % works.length));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeIndex, works.length]);

  const activeWork = activeIndex === null ? null : works[activeIndex];

  const renderGallery = (columnCount: number, className: string) => {
    const columns = distributeWorkIndexes(works, columnCount);

    return (
      <div className={className}>
        {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-col gap-1">
          {column.map((index) => {
            const work = works[index];

            const aspectRatio = `${work.imageWidth} / ${work.imageHeight}`;

            return (
              <motion.figure
                key={work.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.24), ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="art-frame group block w-full text-left"
                  aria-label={`Abrir ${work.title}`}
                >
                  <span style={{ aspectRatio }} className="relative block overflow-hidden bg-[var(--canvas)]">
                    <Image
                      src={work.image}
                      alt={work.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 767px) 50vw, 33.333vw"
                      className="art-image object-contain"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-0" />
                  </span>
                </button>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-1 items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-md:pointer-events-auto max-md:translate-y-0 max-md:opacity-100">
                  <Link href={`/obras/${work.slug}`} className="pointer-events-auto font-display text-[14px] tracking-[-0.02em] text-white transition-colors hover:text-[var(--focus)] sm:text-[16px]">
                    {work.title}
                  </Link>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderGallery(2, "grid grid-cols-2 gap-1 md:hidden")}
      {renderGallery(3, "hidden gap-1 md:grid md:grid-cols-3")}

      <AnimatePresence>
        {activeWork && activeIndex !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeWork.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--canvas)] p-4 text-[var(--ink)] sm:p-8"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="relative grid max-h-[92dvh] w-full max-w-[1240px] gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[58dvh] min-h-[300px] bg-[var(--canvas)] sm:h-[68dvh] lg:h-[78dvh]">
                <Image src={activeWork.image} alt={activeWork.alt} fill sizes="(max-width: 1023px) 100vw, calc(100vw - 360px)" className="object-contain" />
              </div>
              <div className="flex flex-col border-t border-[var(--line)] pt-4 text-[var(--ink)] lg:border-t-0 lg:border-l lg:pl-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">{activeWork.category}</p>
                    <h2 className="mt-2 font-display text-[25px] leading-none tracking-[-0.05em] sm:text-[30px]">{activeWork.title}</h2>
                  </div>
                  <button type="button" aria-label="Fechar imagem" onClick={() => setActiveIndex(null)} className="text-[var(--ink-muted)] transition-colors hover:text-[var(--accent-blue)]">
                    <X size={23} weight="light" />
                  </button>
                </div>
                {activeWork.technique || activeWork.year ? (
                  <dl className="mt-8 grid gap-3 border-t border-[var(--line)] pt-4 text-[12px]">
                    {activeWork.technique ? <div className="flex justify-between gap-3"><dt className="text-[var(--ink-muted)]">Técnica</dt><dd className="text-right">{activeWork.technique}</dd></div> : null}
                    {activeWork.year ? <div className="flex justify-between gap-3"><dt className="text-[var(--ink-muted)]">Ano</dt><dd>{activeWork.year}</dd></div> : null}
                  </dl>
                ) : null}
                {activeWork.description ? <p className="mt-8 max-w-[32ch] text-[13px] leading-5 text-[var(--ink-muted)]">{activeWork.description}</p> : null}
                <Link href={`/obras/${activeWork.slug}`} onClick={() => setActiveIndex(null)} className="mt-8 inline-flex w-fit border-b border-[var(--accent)] pb-1 text-[12px] text-[var(--ink)] hover:text-[var(--accent-blue)]">Ver obra</Link>
                <div className="mt-8 flex gap-2">
                  <button type="button" aria-label="Obra anterior" onClick={() => setActiveIndex((activeIndex - 1 + works.length) % works.length)} className="flex h-9 w-9 items-center justify-center border border-[var(--line-strong)] text-[var(--ink-muted)] transition-colors hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"><ArrowLeft size={17} /></button>
                  <button type="button" aria-label="Próxima obra" onClick={() => setActiveIndex((activeIndex + 1) % works.length)} className="flex h-9 w-9 items-center justify-center border border-[var(--line-strong)] text-[var(--ink-muted)] transition-colors hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"><ArrowRight size={17} /></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
