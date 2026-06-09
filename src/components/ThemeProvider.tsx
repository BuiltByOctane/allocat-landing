import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * App-wide theme provider (light / dark via the `class` strategy).
 *
 * Future extension point — accent system:
 * The app ships 5 accent presets (lime/tangerine/lemon/purple/blue) by toggling
 * a `data-accent` attribute on <html> and overriding --accent-color /
 * --accent-strong / --accent-ink. The landing intentionally ships lime only.
 * To add accents later: persist the choice, set document.documentElement.dataset.accent,
 * and add `[data-accent="..."]` overrides for those three vars in index.css.
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
