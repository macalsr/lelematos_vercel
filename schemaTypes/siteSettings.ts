import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  groups: [
    { name: "identity", title: "Identidade visual" },
    { name: "social", title: "Redes sociais" },
    { name: "about", title: "Seção Sobre" },
    { name: "contact", title: "Seção Contato" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Título da aba",
      description: "Texto exibido no título da aba do navegador.",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Imagem exibida no lugar do nome no cabeçalho.",
      type: "image",
      group: "identity",
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
      title: "Favicon",
      description: "Imagem exibida na aba e nos favoritos do navegador. Prefira uma imagem quadrada.",
      type: "image",
      group: "identity",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      description: "URL completa do perfil da artista.",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      description: "URL completa para iniciar uma conversa no WhatsApp.",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "aboutTitle",
      title: "Título da seção Sobre",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutIntro",
      title: "Texto da seção Sobre",
      type: "text",
      group: "about",
      rows: 4,
    }),
    defineField({
      name: "aboutDetails",
      title: "Informações da seção Sobre",
      type: "text",
      group: "about",
      rows: 4,
    }),
    defineField({
      name: "contactTitle",
      title: "Título da seção Contato",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactEmail",
      title: "E-mail da seção Contato",
      description: "E-mail exibido no rodapé, sem o prefixo mailto:.",
      type: "string",
      group: "contact",
    }),
  ],
  preview: {
    select: { media: "logo" },
    prepare: ({ media }) => ({ title: "Configurações do site", media }),
  },
});
