import React, { Fragment, PropsWithChildren } from 'react';
/**
 * A simple utility to create stylish console logs in the browser within collapsed groups.
 * It can be used as a component or a method.
 *
 * In JSX, it is used as a match component.
 * In React components, outside JSX, we can write it as 'watchThis' method.
 *
 * @param {any} what - The value/variable/data you need to console. If it's an object, send it as an object.
 * @param {string} kind - Optional. Property of console. Default is 'log'. Other values for kind could be 'warn', 'error', etc.
 * @param {string} from - Optional. Additional details, such as filename or date.
 */

const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";



type ConsoleKind = "log" | "warn" | "error" | "info" | "debug" |"trace" | "table" | "dir" | "dirxml" | "group" | "groupCollapsed" | "groupEnd";

const getLogStyle = (background?: string, color?: string) => `
  background-color: ${background ?? "crimson"};
  color: ${color ?? "whitesmoke"};
  font-size: larger;
  font-style: italic;
  padding: 0.25rem;
`;

export type WatchOptions = {
  from?: string;
  kind?: ConsoleKind;
  level?: number;
  color?: string;
  background?: string;
};

export const watchThis = (what: unknown, options: WatchOptions = {}) => {
  if (!isDev) return;
  const { from = "👇", kind = "log", level = 1, background, color } = options;
  const group = level > 1 ? console.group : console.groupCollapsed;
  const logStyle = getLogStyle(background, color);
  group(`%c === [${from}] ===`, logStyle);
  console[kind](what);
  console.groupEnd();
};


type WatchComponentProps = React.PropsWithChildren<Partial<WatchOptions>>;

export const Watch = ({
  children,
  ...options
}: WatchComponentProps) => {
  watchThis(children, { ...options, from: "👀" });
  return null;
};
