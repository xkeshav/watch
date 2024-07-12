import { Fragment, useReducer, useState } from "react";

export type WatchJsonProps = {
  [key: string]: unknown;
  what?: string;
};

const watchJsonStyle = {
  container: ({ hover }: { hover: boolean }) => ({
    padding: "0.5rem",
    border: `2px ${hover ? "solid" : "dashed"} mediumvioletred`,
    margin: "0.5rem",
  }),
  show: {
    height: "auto",
    opacity: "1",
    transition: "height 600ms, opacity 500ms ease-out",
  },
  hide: {
    overflow: "hidden",
    height: "0",
    opacity: "0",
    transition: "height 400ms, opacity 500ms ease-out",
  },
  pre: {
    margin: "0.5rem",
    padding: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.8)",
    fontSize: "x-large",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    textWrap: "balance",
  } as React.CSSProperties,
  action: {
    display: "flex",
    alignItems: "center",
  },
  para: {
    marginLeft: "0.25rem",
    fontWeight: "500",
  },
  button: {
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
    padding: "0.25rem 1rem",
    marginLeft: "auto",
    color: "#112d43",
    backgroundColor: "#75f191",
    width: "4rem",
  },
  detail: {
    margin: "0.25rem",
    cursor: "pointer",
    paddingBlock: "0.5rem",
    backgroundColor: "#92bef1",
  },
  summary: {
    color: "#2e112f",
    fontSize: "large",
    paddingInline: "0.5rem",
    backgroundColor: "#e9e8bb",
  },
  mark: {
    marginInline: "1rem",
  },
};

/**
 * This is another method to see output within the page instead of in the console,
 * use <WatchJson> in following format
 * @example
 * <WatchJson what='title' data={data} name={'Keshav'} date={new Date()}/>
 * @prop String what'; optional, if you want to set heading of the debug block.
 */

export const WatchJson: React.FC<WatchJsonProps> = ({ what = "", ...rest }) => {
  const [isHidden, toggleHidden] = useReducer(
    (state: boolean) => !state,
    false
  );
  const [hover, setHover] = useState(false);

  return (
    <div
      style={watchJsonStyle.container({ hover })}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      className="container"
    >
      {Object.keys(rest).length > 0 ? (
        <Fragment>
          <div style={watchJsonStyle.action}>
            <p style={watchJsonStyle.para}>{what}</p>
            <button
              style={watchJsonStyle.button}
              onClick={toggleHidden}
              title={`click to ${isHidden ? "show" : "hide"}`}
            >
              {isHidden ? "Show" : "Hide"}
            </button>
          </div>
          <div style={isHidden ? watchJsonStyle.hide : watchJsonStyle.show}>
            {Object.entries(rest).map(([wk, wv], i) => (
              <Fragment key={i}>
                <DetailBlock wk={wk} wv={wv} />
              </Fragment>
            ))}
          </div>
        </Fragment>
      ) : (
        <span>{"Nothing to watch"}</span>
      )}
    </div>
  );
};

const DetailBlock = ({ wk, wv }: { wk: string; wv: unknown }) => {
  const detail =
    wv instanceof Map
      ? { type: "Map", data: Object.fromEntries(wv.entries()) }
      : wv instanceof Set
      ? { type: "Set", data: Array.from(wv.values())[0] }
      : { type: wv instanceof Array ? "Array" : "Object", data: wv };
  return (
    <details style={watchJsonStyle.detail}>
      <summary style={watchJsonStyle.summary}>
        {wk} <mark style={watchJsonStyle.mark}>{detail.type}</mark>
      </summary>
      <pre style={watchJsonStyle.pre}>
        {JSON.stringify(detail.data, null, 4)}
      </pre>
    </details>
  );
};
