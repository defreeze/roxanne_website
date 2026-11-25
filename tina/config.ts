import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  "main";

// Each page is a single file the customer can edit but not delete or duplicate.
const singleton = (route: string) => ({
  allowedActions: { create: false, delete: false },
  router: () => route,
});

const ICONS = [
  { value: "lotus", label: "Lotus" },
  { value: "sun", label: "Zon" },
  { value: "moon", label: "Maan" },
  { value: "leaf", label: "Blad" },
  { value: "wave", label: "Golf" },
  { value: "heart", label: "Hart" },
  { value: "sparkle", label: "Sterretje" },
];

const eyebrow = (name = "eyebrow") => ({
  type: "string" as const,
  name,
  label: "Klein label boven de kop",
  description: "Kort, bijv. 'Welkom' of 'Aanbod'",
});

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Algemene instellingen",
        path: "content/settings",
        format: "json",
        match: { include: "settings" },
        ui: singleton("/"),
        fields: [
          { type: "string", name: "businessName", label: "Naam praktijk", required: true },
          { type: "string", name: "tagline", label: "Ondertitel", description: "Staat onder de naam, bijv. 'Energiewerk · Roxanne Mireya'" },
          {
            type: "string",
            name: "description",
            label: "Korte omschrijving",
            description: "Wordt getoond in Google en als de site gedeeld wordt.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "bookingUrl",
            label: "Boekingslink",
            description: "Link naar je boekingspagina (bijv. Hipsy). Leeg = 'Boek'-knoppen gaan naar de contactpagina.",
          },
          { type: "string", name: "bookingLabel", label: "Tekst boekingsknop", description: "bijv. 'Boek een sessie'" },
          { type: "string", name: "email", label: "E-mailadres", description: "Optioneel" },
          { type: "string", name: "phone", label: "Telefoonnummer", description: "bijv. +31 6 12345678" },
          {
            type: "string",
            name: "whatsapp",
            label: "WhatsApp-nummer",
            description: "Optioneel. Internationaal formaat, bijv. +31612345678",
          },
          { type: "string", name: "instagram", label: "Instagram-naam", description: "Optioneel, zonder @" },
          { type: "string", name: "location", label: "Plaats", description: "bijv. Groningen" },
          {
            type: "object",
            name: "nav",
            label: "Menu",
            fields: [
              { type: "string", name: "home", label: "Home" },
              { type: "string", name: "services", label: "Aanbod" },
              { type: "string", name: "about", label: "Over mij" },
              { type: "string", name: "contact", label: "Contact" },
            ],
          },
        ],
      },
      {
        name: "home",
        label: "Homepagina",
        path: "content/home",
        format: "md",
        match: { include: "home" },
        ui: singleton("/"),
        fields: [
          eyebrow("heroEyebrow"),
          { type: "string", name: "heroTitle", label: "Hoofdkop", required: true },
          { type: "string", name: "heroText", label: "Tekst onder de hoofdkop", ui: { component: "textarea" } },
          { type: "image", name: "heroImage", label: "Hoofdfoto", description: "Een staande (portret) foto werkt het mooist." },
          {
            type: "object",
            name: "highlights",
            label: "Drie pijlers",
            description: "Korte punten onder de hoofdfoto. Drie werkt het best.",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Pijler" }) },
            fields: [
              { type: "string", name: "icon", label: "Icoon", options: ICONS },
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
            ],
          },
          eyebrow("introEyebrow"),
          { type: "string", name: "introTitle", label: "Kop introductie" },
          { type: "image", name: "introImage", label: "Foto introductie" },
          { type: "rich-text", name: "body", label: "Tekst introductie", isBody: true },
          eyebrow("servicesEyebrow"),
          { type: "string", name: "servicesTitle", label: "Kop aanbod" },
          { type: "string", name: "servicesText", label: "Tekst aanbod", ui: { component: "textarea" } },
          { type: "string", name: "testimonialsTitle", label: "Kop ervaringen" },
          {
            type: "object",
            name: "testimonials",
            label: "Ervaringen van klanten",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Ervaring" }) },
            fields: [
              { type: "string", name: "quote", label: "Ervaring", ui: { component: "textarea" }, required: true },
              { type: "string", name: "name", label: "Naam" },
            ],
          },
          {
            type: "string",
            name: "reviewsNote",
            label: "Regel over reviews",
            description: "bijv. 'Beoordeeld met 5,0 uit 10 reviews op Hipsy'. Linkt naar je boekingspagina.",
          },
          { type: "string", name: "galleryTitle", label: "Kop fotogalerij" },
          {
            type: "object",
            name: "gallery",
            label: "Fotogalerij",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.caption || "Foto" }) },
            fields: [
              { type: "image", name: "image", label: "Foto", required: true },
              { type: "string", name: "caption", label: "Bijschrift" },
            ],
          },
          { type: "string", name: "closingTitle", label: "Kop onderaan" },
          { type: "string", name: "closingText", label: "Tekst onderaan", ui: { component: "textarea" } },
        ],
      },
      {
        name: "servicesPage",
        label: "Pagina Aanbod",
        path: "content/services-page",
        format: "md",
        match: { include: "services" },
        ui: singleton("/services"),
        fields: [
          eyebrow(),
          { type: "string", name: "title", label: "Paginakop", required: true },
          { type: "string", name: "intro", label: "Introductie", ui: { component: "textarea" } },
          { type: "string", name: "scheduleTitle", label: "Kop agenda" },
          { type: "string", name: "scheduleText", label: "Tekst agenda", ui: { component: "textarea" } },
          {
            type: "object",
            name: "schedule",
            label: "Vaste momenten (optioneel)",
            description: "Laat leeg als je alleen op afspraak werkt; dan verschijnt een knop naar je boekingspagina.",
            list: true,
            ui: { itemProps: (item) => ({ label: [item?.day, item?.time, item?.name].filter(Boolean).join(" · ") || "Moment" }) },
            fields: [
              { type: "string", name: "day", label: "Dag", required: true },
              { type: "string", name: "time", label: "Tijd", description: "bijv. 19:30 – 21:30" },
              { type: "string", name: "name", label: "Sessie", required: true },
              { type: "string", name: "location", label: "Locatie" },
            ],
          },
          { type: "string", name: "faqTitle", label: "Kop veelgestelde vragen" },
          {
            type: "object",
            name: "faq",
            label: "Veelgestelde vragen",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question || "Vraag" }) },
            fields: [
              { type: "string", name: "question", label: "Vraag", required: true },
              { type: "string", name: "answer", label: "Antwoord", ui: { component: "textarea" } },
            ],
          },
          { type: "rich-text", name: "body", label: "Praktische informatie (onderaan)", isBody: true },
        ],
      },
      {
        name: "service",
        label: "Sessies",
        path: "content/services",
        format: "md",
        ui: { router: () => "/services" },
        fields: [
          { type: "string", name: "title", label: "Naam", isTitle: true, required: true },
          { type: "string", name: "icon", label: "Icoon", options: ICONS },
          {
            type: "string",
            name: "summary",
            label: "Korte omschrijving",
            description: "Een of twee zinnen, voor de homepagina.",
            ui: { component: "textarea" },
          },
          { type: "string", name: "price", label: "Prijs", description: "bijv. € 80,80 (leeg laten mag)" },
          { type: "string", name: "duration", label: "Duur", description: "bijv. ca. 2 uur" },
          { type: "image", name: "image", label: "Foto" },
          { type: "number", name: "order", label: "Volgorde", description: "Lagere nummers staan eerder." },
          { type: "boolean", name: "featured", label: "Tonen op homepagina" },
          { type: "rich-text", name: "body", label: "Volledige omschrijving", isBody: true },
        ],
      },
      {
        name: "about",
        label: "Pagina Over mij",
        path: "content/about",
        format: "md",
        match: { include: "about" },
        ui: singleton("/about"),
        fields: [
          eyebrow(),
          { type: "string", name: "title", label: "Paginakop", required: true },
          { type: "image", name: "image", label: "Portretfoto" },
          { type: "rich-text", name: "body", label: "Verhaal", isBody: true },
          { type: "string", name: "quote", label: "Persoonlijke quote", ui: { component: "textarea" } },
          { type: "image", name: "secondImage", label: "Tweede foto" },
          { type: "string", name: "qualificationsTitle", label: "Kop opleidingen" },
          { type: "string", name: "qualifications", label: "Opleidingen & achtergrond", list: true },
        ],
      },
      {
        name: "contact",
        label: "Pagina Contact",
        path: "content/contact",
        format: "md",
        match: { include: "contact" },
        ui: singleton("/contact"),
        fields: [
          eyebrow(),
          { type: "string", name: "title", label: "Paginakop", required: true },
          { type: "string", name: "intro", label: "Introductie", ui: { component: "textarea" } },
          { type: "string", name: "hours", label: "Beschikbaarheid", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Extra tekst", isBody: true },
        ],
      },
    ],
  },
});
