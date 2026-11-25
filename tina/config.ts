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
        label: "Site settings",
        path: "content/settings",
        format: "json",
        match: { include: "settings" },
        ui: singleton("/"),
        fields: [
          { type: "string", name: "businessName", label: "Business name", required: true },
          {
            type: "string",
            name: "description",
            label: "Short description",
            description: "Shown in Google search results and when the site is shared.",
            ui: { component: "textarea" },
          },
          { type: "string", name: "email", label: "Email address" },
          { type: "string", name: "phone", label: "Phone number", description: "e.g. +31 6 12345678" },
          { type: "string", name: "instagram", label: "Instagram handle", description: "Without the @" },
          { type: "string", name: "location", label: "Location", description: "e.g. Groningen" },
          {
            type: "object",
            name: "nav",
            label: "Menu labels",
            fields: [
              { type: "string", name: "home", label: "Home" },
              { type: "string", name: "services", label: "Services" },
              { type: "string", name: "about", label: "About" },
              { type: "string", name: "contact", label: "Contact" },
            ],
          },
        ],
      },
      {
        name: "home",
        label: "Home page",
        path: "content/home",
        format: "md",
        match: { include: "home" },
        ui: singleton("/"),
        fields: [
          { type: "string", name: "heroTitle", label: "Headline", required: true },
          { type: "string", name: "heroText", label: "Text under headline", ui: { component: "textarea" } },
          { type: "image", name: "heroImage", label: "Main photo" },
          { type: "string", name: "ctaLabel", label: "Button text", description: "Button that links to the contact page" },
          { type: "string", name: "introTitle", label: "Introduction heading" },
          { type: "rich-text", name: "body", label: "Introduction text", isBody: true },
          { type: "string", name: "servicesTitle", label: "Services section heading" },
          { type: "string", name: "galleryTitle", label: "Gallery heading" },
          {
            type: "object",
            name: "gallery",
            label: "Gallery (examples of work)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.caption || "Photo" }) },
            fields: [
              { type: "image", name: "image", label: "Photo", required: true },
              { type: "string", name: "caption", label: "Caption" },
            ],
          },
          { type: "string", name: "testimonialsTitle", label: "Reviews heading" },
          {
            type: "object",
            name: "testimonials",
            label: "Reviews",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Review" }) },
            fields: [
              { type: "string", name: "quote", label: "Review", ui: { component: "textarea" }, required: true },
              { type: "string", name: "name", label: "Name" },
            ],
          },
        ],
      },
      {
        name: "servicesPage",
        label: "Services page",
        path: "content/services-page",
        format: "md",
        match: { include: "services" },
        ui: singleton("/services"),
        fields: [
          { type: "string", name: "title", label: "Page heading", required: true },
          { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Text below the services", isBody: true },
        ],
      },
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "md",
        ui: { router: () => "/services" },
        fields: [
          { type: "string", name: "title", label: "Name", isTitle: true, required: true },
          {
            type: "string",
            name: "summary",
            label: "Short description",
            description: "One or two sentences, shown on the home page.",
            ui: { component: "textarea" },
          },
          { type: "string", name: "price", label: "Price", description: "e.g. €45 or from €60" },
          { type: "string", name: "duration", label: "Duration", description: "e.g. 60 minutes" },
          { type: "image", name: "image", label: "Photo" },
          {
            type: "number",
            name: "order",
            label: "Position",
            description: "Lower numbers appear first.",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Show on home page",
          },
          { type: "rich-text", name: "body", label: "Full description", isBody: true },
        ],
      },
      {
        name: "about",
        label: "About page",
        path: "content/about",
        format: "md",
        match: { include: "about" },
        ui: singleton("/about"),
        fields: [
          { type: "string", name: "title", label: "Page heading", required: true },
          { type: "image", name: "image", label: "Photo" },
          { type: "rich-text", name: "body", label: "Text", isBody: true },
        ],
      },
      {
        name: "contact",
        label: "Contact page",
        path: "content/contact",
        format: "md",
        match: { include: "contact" },
        ui: singleton("/contact"),
        fields: [
          { type: "string", name: "title", label: "Page heading", required: true },
          { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
          {
            type: "string",
            name: "hours",
            label: "Opening hours / availability",
            ui: { component: "textarea" },
          },
          { type: "rich-text", name: "body", label: "Extra text", isBody: true },
        ],
      },
    ],
  },
});
