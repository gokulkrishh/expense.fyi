import { CSSProperties } from "react";
import { Config } from "tailwindcss";

export interface TailwindConfig {
  important?: Config["important"];
  prefix?: Config["prefix"];
  separator?: Config["separator"];
  safelist?: Config["safelist"];
  presets?: Config["presets"];
  future?: Config["future"];
  experimental?: Config["experimental"];
  darkMode?: Config["darkMode"];
  theme?: Config["theme"];
  corePlugins?: Config["corePlugins"];
  plugins?: Config["plugins"];
}

type Content = string | Record<string, boolean> | TemplateStringsArray | Content[];

type Options = { merge?: boolean; minify?: boolean; ignoreMediaQueries?: boolean };

export function getCSS(content: string, config?: TailwindConfig): string;

export function tailwindToCSS(params: { config?: TailwindConfig; options?: Options }): {
  twi: typeof twi;
  twj: typeof twj;
};

export function classListFormatter(content: Content, options?: Options): string;
export function classListFormatter(...content: Content[]): string;

export function twi(content: Content, options?: Options): string;
export function twi(...content: Content[]): string;

export function twj(content: Content, options?: Options): CSSProperties;
export function twj(...content: Content[]): CSSProperties;

export function tailwindInlineCSS(config?: TailwindConfig, options?: Options): typeof twi;

export function tailwindInlineJson(
  config?: TailwindConfig,
  options?: Omit<Options, "minify" | "ignoreMediaQueries">
): typeof twj;
