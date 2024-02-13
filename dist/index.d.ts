import React from 'react';
export declare const watchThis: (what: any, kind?: string, from?: string) => void;
type WatchParams = {
    children: any;
    kind?: string;
    from?: string;
};
export declare const Watch: React.FC<WatchParams>;
/**
* This is another method to see output within the page instead of in the console,
* use <WatchJson> in following format
* @example
* <WatchJson what='myself' data={data} name={'Keshav'} date={new Date()}/>
* @prop String what'; optional, if you want to set heading of the debug block.
*/
export type WatchJsonProps = {
    [ket: string]: any;
    what?: string;
};
export declare const WatchJson: React.FC<WatchJsonProps>;
export {};
