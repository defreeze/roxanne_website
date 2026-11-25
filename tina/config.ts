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

const ICONS = ["lotus", "sun", "moon", "leaf", "wave", "heart", "sparkle"];

const eyebrow = (name = "eyebrow", label = "Small label above heading") => ({
  type: "string" as const,
  name,
  label,
  description: "Short, e.g. 'Welcome' or 'Offerings'",
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
          { type: "string", name: "tagline", label: "Tagline", description: "Shown under the name, e.g. 'Yoga & Energy Healing'" },
          {
            type: "string",
            name: "description",
            label: "Short description",
            description: "Shown in Google search results and when the site is shared.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "bookingUrl",
            label: "Booking link",
            description:
              "Optional. Link to an online booking tool (e.g. Momoyoga, Calendly). If empty, 'Book' buttons go to the contact page.",
          },
          { type: "string", name: "bookingLabel", label: "Booking button text", description: "e.g. 'Book a session'" },
          { type: "string", name: "email", label: "Email address" },
          { type: "string", name: "phone", label: "Phone number", description: "e.g. +31 6 12345678" },
          {
            type: "string",
            name: "whatsapp",
            label: "WhatsApp number",
            description: "Optional. International format, e.g. +31612345678",
          },
          { type: "string", name: "instagram", label: "Instagram handle", description: "Without the @" },
          { type: "string", name: "location", label: "Location", description: "e.g. Groningen" },
          {
            type: "object",
            name: "nav",
            label: "Menu labels",
            fields: [
              { type: "string", name: "home", label: "Home" },
              { type: "string", name: "services", label: "Offerings" },
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
          eyebrow("heroEyebrow"),
          { type: "string", name: "heroTitle", label: "Headline", required: true },
          { type: "string", name: "heroText", label: "Text under headline", ui: { component: "textarea" } },
          { type: "image", name: "heroImage", label: "Main photo", description: "A portrait (tall) photo works best." },
          {
            type: "object",
            name: "highlights",
            label: "Three pillars",
            description: "Short points shown under the main photo. Three works best.",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Pillar" }) },
            fields: [
              { type: "string", name: "icon", label: "Icon", options: ICONS },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
            ],
          },
          eyebrow("introEyebrow"),
          { type: "string", name: "introTitle", label: "Introduction heading" },
          { type: "image", name: "introImage", label: "Introduction photo" },
          { type: "rich-text", name: "body", label: "Introduction text", isBody: true },
          eyebrow("servicesEyebrow"),
          { type: "string", name: "servicesTitle", label: "Offerings heading" },
          { type: "string", name: "servicesText", label: "Offerings introduction", ui: { component: "textarea" } },
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
          { type: "string", name: "galleryTitle", label: "Gallery heading" },
          {
            type: "object",
            name: "gallery",
            label: "Gallery",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.caption || "Photo" }) },
            fields: [
              { type: "image", name: "image", label: "Photo", required: true },
              { type: "string", name: "caption", label: "Caption" },
            ],
          },
          { type: "string", name: "closingTitle", label: "Closing heading" },
          { type: "string", name: "closingText", label: "Closing text", ui: { component: "textarea" } },
        ],
      },
      {
        name: "servicesPage",
        label: "Offerings page",
        path: "content/services-page",
        format: "md",
        match: { include: "services" },
        ui: singleton("/services"),
        fields: [
          eyebrow(),
          { type: "string", name: "title", label: "Page heading", required: true },
          { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
          { type: "string", name: "scheduleTitle", label: "Schedule heading" },
          { type: "string", name: "scheduleText", label: "Schedule note", ui: { component: "textarea" } },
          {
            type: "object",
            name: "schedule",
            label: "Weekly schedule",
            list: true,
            ui: { itemProps: (item) => ({ label: [item?.day, item?.time, item?.name].filter(Boolean).join(" · ") || "Class" }) },
            fields: [
              { type: "string", name: "day", label: "Day", required: true },
              { type: "string", name: "time", label: "Time", description: "e.g. 19:00 – 20:15" },
              { type: "string", name: "name", label: "Class", required: true },
              { type: "string", name: "location", label: "Location" },
            ],
          },
          { type: "string", name: "faqTitle", label: "FAQ heading" },
          {
            type: "object",
            name: "faq",
            label: "Frequently asked questions",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question || "Question" }) },
            fields: [
              { type: "string", name: "question", label: "Question", required: true },
              { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
            ],
          },
          { type: "rich-text", name: "body", label: "Practical notes (bottom of page)", isBody: true },
        ],
      },
      {
        name: "service",
        label: "Offerings",
        path: "content/services",
        format: "md",
        ui: { router: () => "/services" },
        fields: [
          { type: "string", name: "title", label: "Name", isTitle: true, required: true },
          { type: "string", name: "icon", label: "Icon", options: ICONS },
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
          { type: "number", name: "order", label: "Position", description: "Lower numbers appear first." },
          { type: "boolean", name: "featured", label: "Show on home page" },
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
          eyebrow(),
          { type: "string", name: "title", label: "Page heading", required: true },
          { type: "image", name: "image", label: "Portrait photo" },
          { type: "rich-text", name: "body", label: "Story", isBody: true },
          { type: "string", name: "quote", label: "Personal quote", ui: { component: "textarea" } },
          { type: "image", name: "secondImage", label: "Second photo" },
          { type: "string", name: "qualificationsTitle", label: "Training heading" },
          { type: "string", name: "qualifications", label: "Training & qualifications", list: true },
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
          eyebrow(),
          { type: "string", name: "title", label: "Page heading", required: true },
          { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
          { type: "string", name: "hours", label: "Availability", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Extra text", isBody: true },
        ],
      },
    ],
  },
});
