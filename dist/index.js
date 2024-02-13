"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchJson = exports.Watch = exports.watchThis = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
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
`;
const watchThis = (what, kind = 'log', from = '👇') => {
    console.groupCollapsed(`%c === [${from}] ===`, logStyle);
    console[kind](what);
    console.groupEnd();
};
exports.watchThis = watchThis;
const Watch = ({ children, kind = 'log', from = '👀' }) => {
    (0, exports.watchThis)(children, kind, from);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
};
exports.Watch = Watch;
const watchStyle = {
    container: ({ hover }) => ({
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
        textAlign: 'left',
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
const WatchJson = ({ what = '', ...rest }) => {
    const [isHidden, toggleHidden] = (0, react_1.useReducer)((state) => !state, false);
    const [hover, setHover] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)("div", { style: watchStyle.container({ hover }), onPointerOver: () => setHover(true), onPointerOut: () => setHover(false), children: Object.keys(rest).length > 0
            ? ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: watchStyle.action, children: [(0, jsx_runtime_1.jsx)("p", { style: watchStyle.para, children: what }), (0, jsx_runtime_1.jsx)("button", { style: watchStyle.button, onClick: toggleHidden, title: `click to ${isHidden ? 'show' : 'hide'}`, children: isHidden ? 'Show' : 'Hide' })] }), (0, jsx_runtime_1.jsx)("div", { style: isHidden ? watchStyle.hide : watchStyle.show, children: Object.entries(rest).map(([wk, wv], i) => ((0, jsx_runtime_1.jsxs)("details", { style: watchStyle.detail, children: [(0, jsx_runtime_1.jsx)("summary", { style: watchStyle.summary, children: wk }), (0, jsx_runtime_1.jsx)("pre", { style: watchStyle.pre, children: JSON.stringify(wv, null, 4) })] }, i))) })] }))
            : ((0, jsx_runtime_1.jsx)("span", { children: 'Nothing to watch' })) }));
};
exports.WatchJson = WatchJson;
