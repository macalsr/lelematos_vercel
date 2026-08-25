import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "Obra",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "technique", title: "Técnica", type: "string" }),
    defineField({ name: "year", title: "Ano", type: "string" }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3 }),
    defineField({
      name: "displayOrder",
      title: "Ordem de exibição",
      description: "Número menor aparece primeiro na galeria. Deixe vazio para usar o destaque e o ano como fallback.",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({ name: "featured", title: "Destacar na galeria", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", media: "image", subtitle: "year" } },
});
