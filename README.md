# Lelematoos

Site de portfólio para uma artista visual, com galeria responsiva, lightbox, páginas individuais para cada obra e painel privado do Sanity em `/studio`.

## Stack

- Next.js 15 com App Router e TypeScript
- Tailwind CSS v4
- Motion para revelações e transições da galeria
- Phosphor Icons para ícones de interface
- Sanity CMS para cadastro e publicação das obras
- Deploy preparado para Vercel

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador.

Comandos disponíveis:

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Estrutura

```text
app/
  obras/[slug]/       Página individual de cada obra
  studio/             Sanity Studio
  page.tsx            Página inicial da galeria
components/
  gallery-grid.tsx    Grid e lightbox da galeria
  site-header.tsx     Navegação responsiva
  site-footer.tsx     Rodapé e contato
lib/
  works.ts            Conteúdo de fallback para desenvolvimento
  sanity.ts           Cliente e consultas do Sanity
sanity.config.ts      Configuração do painel Sanity
schemaTypes/          Schema de obras editável no Sanity
```

## Sanity

Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

Com o Sanity CLI autenticado, use:

```bash
npx sanity login
npx sanity manage
```

O site usa o conteúdo estático de `content/works.ts` quando as variáveis do Sanity não estão configuradas. Assim, o projeto continua navegável antes da criação do dataset.

Para configurar a ordem da galeria, preencha o campo `Ordem de exibição` em cada documento `Obra` no Sanity. Use `1` para a primeira obra, `2` para a segunda e assim por diante. Obras sem esse campo ficam depois das obras ordenadas e usam destaque e ano como fallback. A alteração pode levar até 60 segundos para aparecer no site.

## Rotas

- `/` Galeria inicial, seção sobre e contato
- `/obras/[slug]` Página individual de uma obra
- `/studio` Painel de publicação do Sanity

## Imagens

As imagens atuais são placeholders remotos do Picsum. Substitua-as por imagens reais no Sanity antes do lançamento.
