import React, { Fragment, useReducer, useState } from 'react';

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

const logStyle = `
  background-color: crimson;
  color: whitesmoke;
  font-size: larger;
  font-style: italic;
  padding: 0.25rem;
`

export const watchThis = (what:any, kind = 'log', from = '👇') => {
    console.groupCollapsed(`%c === [${from}] ===`, logStyle);
    (console as any)[kind](what);
    console.groupEnd();
};

type WatchParams = {
  children: any;
  kind?: string;
  from?: string;
};

export const Watch: React.FC<WatchParams> = ({ children, kind = 'log', from = '👀' }) => {
  watchThis(children, kind, from);
  return <>{}</>;
};


const watchStyle = {
  container: ({hover}: {hover: boolean}) => ({
    padding: '0.5rem',
    border: `2px ${hover ? 'solid' : 'dashed'} mediumvioletred`,
    margin: '0.5rem',
    backgroundColor: 'aliceblue'
  }),
    show: {
      height: 'auto',
      opacity: '1',
      transition: 'height 600ms, opacity 500ms ease-out',
    },
    hide: {
      overflow: 'hidden',
      height: '0',
      opacity: '0',
      transition: 'height 400ms, opacity 500ms ease-out',
    },
    pre: {
      margin: '0.5rem',
      padding: '0.5rem',
      border: '1px solid rgba(0, 0, 0, 0.8)',
      fontSize: 'x-large',
      textAlign: 'left' as const,
      display: 'flex',
      alignItems: 'center',
    },
		action: {
			display: 'flex',
			alignItems: 'center'
		},
    para: {
      marginLeft: '0.25rem',
      fontWeight: '500',
    },
    button: {
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      padding: '0.25rem 1rem',
      marginLeft: 'auto',
      color: '#112d43',
      backgroundColor: '#75f191',
      width: '4rem',
    },
    detail: {
      margin: '0.25rem',
			cursor: 'pointer',
      paddingBlock: '0.5rem',
      backgroundColor: '#92bef1',
    },
    summary: {
      color: '#2e112f',
      fontSize: 'large',
      paddingInline: '0.5rem',
      backgroundColor: '#e9e8bb',
    }
};


/**
* This is another method to see output within the page instead of in the console,
* use <WatchJson> in following format
* @example
* <WatchJson what='myself' data={data} name={'Keshav'} date={new Date()}/>
* @prop String what'; optional, if you want to set heading of the debug block.
*/

export type WatchJsonProps = {
  [ket:string]: any;
  what?: string;
};

export const WatchJson: React.FC<WatchJsonProps> = ({ what = '', ...rest }: WatchJsonProps) => {
  const [isHidden, toggleHidden] = useReducer((state: boolean) => !state, false);
  const [hover, setHover] = useState(false);

  return (
    <div 
      style={watchStyle.container({ hover })} 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
      >
      { Object.keys(rest).length > 0
        ? (
          <Fragment>
            <div style={watchStyle.action}>
              <p style={watchStyle.para}>{what}</p>
              <button
                style={watchStyle.button}
                onClick={toggleHidden}
                title={`click to ${isHidden ? 'show' : 'hide'}`}
              >
              {isHidden ? 'Show' : 'Hide'}
              </button>
            </div>
            <div style={isHidden ? watchStyle.hide : watchStyle.show}>
              {Object.entries(rest).map(([wk, wv], i) => (
                <details key={i} style={watchStyle.detail}>
                  <summary style={watchStyle.summary}>{wk}</summary>
                  <pre style={watchStyle.pre}>{JSON.stringify(wv, null, 4)}</pre>
                </details>
              ))}
            </div>
          </Fragment>
        ) 
        : (<span>{'Nothing to watch'}</span>)
    }
    </div>
  );
};



