import Link from "next/link";

export default function WorkNotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-5 text-center">
      <div>
        <h1 className="font-display text-5xl tracking-[-0.08em]">Obra não encontrada</h1>
        <Link href="/#galeria" className="mt-7 inline-block border-b border-[var(--accent)] pb-1 text-sm">Voltar para a galeria</Link>
      </div>
    </main>
  );
}
