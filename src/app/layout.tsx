import type { Metadata, Viewport } from "next";
// Fonts come from npm (Fontsource), never from Google at build time. Each file covers
// Vietnamese, since names and wishes people type can be in any language.
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/merriweather-sans/400.css";
import "@fontsource/merriweather-sans/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/barlow/400.css";
// The boo design system: tokens first, then the component styles, then the app's own.
import "../../design-system/tokens.css";
import "../styles/boo-components.css";
import "./globals.css";
import { copy } from "@/copy";

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="christmas-night">
      <body>{children}</body>
    </html>
  );
}
