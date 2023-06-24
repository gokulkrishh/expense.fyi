import * as React from 'react';
import { TailwindConfig } from 'tw-to-css';

interface TailwindProps {
    children: React.ReactNode;
    config?: TailwindConfig;
}
declare const Tailwind: React.FC<TailwindProps>;

export { Tailwind, TailwindProps };
