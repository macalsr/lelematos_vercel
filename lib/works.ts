export type Work = {
  slug: string;
  title: string;
  technique: string;
  year: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
  featured?: boolean;
};

export const fallbackWorks: Work[] = [
  {
    slug: "obra-de-exemplo-01",
    title: "Obra de exemplo 01",
    technique: "Técnica",
    year: "Ano",
    category: "Categoria",
    description: "Descrição da obra de exemplo.",
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=1600&q=85",
    alt: "Imagem de exemplo de uma obra artística",
    imageWidth: 1600,
    imageHeight: 1100,
  },
  {
    slug: "obra-de-exemplo-02",
    title: "Obra de exemplo 02",
    technique: "Técnica",
    year: "Ano",
    category: "Categoria",
    description: "Descrição da obra de exemplo.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",
    alt: "Imagem de exemplo de uma obra artística",
    imageWidth: 1000,
    imageHeight: 1400,
  },
  {
    slug: "obra-de-exemplo-03",
    title: "Obra de exemplo 03",
    technique: "Técnica",
    year: "Ano",
    category: "Categoria",
    description: "Descrição da obra de exemplo.",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=85",
    alt: "Imagem de exemplo de uma obra artística",
    imageWidth: 1000,
    imageHeight: 1400,
  },
  {
    slug: "obra-de-exemplo-04",
    title: "Obra de exemplo 04",
    technique: "Técnica",
    year: "Ano",
    category: "Categoria",
    description: "Descrição da obra de exemplo.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1400&q=85",
    alt: "Imagem de exemplo de uma obra artística",
    imageWidth: 1400,
    imageHeight: 1000,
  },
  {
    slug: "obra-de-exemplo-05",
    title: "Obra de exemplo 05",
    technique: "Técnica",
    year: "Ano",
    category: "Categoria",
    description: "Descrição da obra de exemplo.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1100&q=85",
    alt: "Imagem de exemplo de uma obra artística",
    imageWidth: 1100,
    imageHeight: 1300,
  },
  {
    slug: "obra-de-exemplo-06",
    title: "Obra de exemplo 06",
    technique: "Técnica",
    year: "Ano",
    category: "Categoria",
    description: "Descrição da obra de exemplo.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=85",
    alt: "Imagem de exemplo de uma obra artística",
    imageWidth: 1400,
    imageHeight: 1000,
  },
];

export function getFallbackWork(slug: string) {
  return fallbackWorks.find((work) => work.slug === slug);
}
