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
    slug: "materia-em-suspensao",
    title: "Matéria em suspensão",
    technique: "Óleo e pigmento mineral sobre tela",
    year: "2024",
    category: "Pintura",
    description: "Uma investigação sobre peso, transparência e o instante antes da forma se fixar.",
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=1600&q=85",
    alt: "Tatuadora trabalhando em uma tatuagem com máquina e luvas pretas",
    imageWidth: 1600,
    imageHeight: 1100,
    featured: true,
  },
  {
    slug: "intervalo-azul",
    title: "Intervalo azul",
    technique: "Acrílica e grafite sobre madeira",
    year: "2023",
    category: "Pintura",
    description: "Planos de cor e marcas de grafite organizam um silêncio entre duas superfícies.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",
    alt: "Detalhe abstrato em magenta e azul com textura fluida",
    imageWidth: 1000,
    imageHeight: 1400,
  },
  {
    slug: "linha-de-fuga",
    title: "Linha de fuga",
    technique: "Carvão, pastel e papel algodão",
    year: "2024",
    category: "Desenho",
    description: "Uma linha contínua atravessa o papel e transforma o espaço em direção.",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=85",
    alt: "Pintura figurativa antiga em tons terrosos e azul escuro",
    imageWidth: 1000,
    imageHeight: 1400,
  },
  {
    slug: "campo-quieto",
    title: "Campo quieto",
    technique: "Óleo e cera sobre tela",
    year: "2022",
    category: "Pintura",
    description: "Uma paisagem reduzida a campos, bordas e pequenas mudanças de temperatura.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1400&q=85",
    alt: "Paisagem pintada em estilo clássico com árvores e animais",
    imageWidth: 1400,
    imageHeight: 1000,
  },
  {
    slug: "corpo-de-luz",
    title: "Corpo de luz",
    technique: "Fotografia e impressão pigmentada",
    year: "2021",
    category: "Imagem",
    description: "A luz recorta uma presença e deixa o restante do corpo para a imaginação.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1100&q=85",
    alt: "Pintura abstrata saturada em vermelho, amarelo e azul",
    imageWidth: 1100,
    imageHeight: 1300,
  },
  {
    slug: "resto-do-dia",
    title: "Resto do dia",
    technique: "Técnica mista sobre papel",
    year: "2020",
    category: "Desenho",
    description: "Fragmentos do cotidiano são sobrepostos até se tornarem uma nova superfície.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=85",
    alt: "Pincéis com tinta vermelha sobre uma mesa de trabalho",
    imageWidth: 1400,
    imageHeight: 1000,
  },
];

export function getFallbackWork(slug: string) {
  return fallbackWorks.find((work) => work.slug === slug);
}
