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

export type WatchProps = {
  from: string;
  kind: string;
};

type WatchPropsExtended = Partial<WatchProps> & PropsWithChildren<any>

const logStyle = `
  background-color: crimson;
  color: whitesmoke;
  font-size: larger;
  font-style: italic;
  padding: 0.25rem;
`

export const watchThis = (what: any, from = '👇', kind = 'log') => {
    console.groupCollapsed(`%c === [${from}] ===`, logStyle);
    (console as any)[kind](what);
    console.groupEnd();
};

export const Watch: React.FC<WatchPropsExtended> = ({ children, from = '👀', kind = 'log' }) => {
  watchThis(children, from, kind);
  return <Fragment>{}</Fragment>;
};
