interface Options {
    pretty?: boolean;
    plainText?: boolean;
}
declare const render: (component: React.ReactElement, options?: Options) => string;

declare const renderAsync: (component: React.ReactElement, options?: {
    pretty?: boolean;
    plainText?: boolean;
}) => Promise<string>;

export { Options, render, renderAsync };
