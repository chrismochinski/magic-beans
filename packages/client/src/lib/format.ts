/**
 * @file Formatting helpers.
 * @description Small shared formatters for the UI.
 * @author Chris "Mo" Mochinski
 */

/** Formats a number as USD currency, for example 1234.5 -> "$1,234.50". */
export const usd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
