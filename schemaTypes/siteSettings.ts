import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      description: "Imagem exibida no lugar do nome no cabeçalho.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          description: "Descreva a logo para pessoas que usam leitor de tela.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "favicon",
      title: "Ícone da aba (favicon)",
      description: "Imagem exibida na aba e nos favoritos do navegador. Prefira uma imagem quadrada.",
      type: "image",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      description: "URL completa do perfil da artista.",
      type: "url",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      description: "URL completa para iniciar uma conversa no WhatsApp.",
      type: "url",
    }),
    defineField({
      name: "aboutTitle",
      title: "Sobre: título",
      type: "string",
    }),
    defineField({
      name: "aboutIntro",
      title: "Sobre: primeiro texto",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutDetails",
      title: "Sobre: segundo texto",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "contactTitle",
      title: "Contato: título",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contato: e-mail",
      description: "E-mail exibido no rodapé, sem o prefixo mailto:.",
      type: "string",
    }),
  ],
  preview: {
    select: { media: "logo" },
    prepare: ({ media }) => ({ title: "Configurações do site", media }),
  },
});
