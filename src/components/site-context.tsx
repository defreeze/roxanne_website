"use client";

import { createContext, useContext } from "react";
import type { SettingsQuery } from "../../tina/__generated__/types";

export type Settings = SettingsQuery["settings"];

export const SiteContext = createContext<Settings | null>(null);

/** Live (editor-aware) site settings, available to every page view. */
export function useSite(): Settings {
  const s = useContext(SiteContext);
  if (!s) throw new Error("useSite must be used inside SiteShell");
  return s;
}

/** Where "Book" buttons go: the external booking tool if set, otherwise the contact page. */
export function bookingHref(s: Settings) {
  return s.bookingUrl?.trim() || "/contact";
}

export function whatsappHref(number: string) {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}`;
}
