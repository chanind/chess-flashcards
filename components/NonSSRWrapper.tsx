import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

export interface NonSSRWrapperProps {
  children: ReactNode;
}

/**
 * Based on https://blog.bitsrc.io/using-non-ssr-friendly-components-with-next-js-916f38e8992c
 * Helper to selective disable SSR of components, since anytning involving Math.random() breaks in SSR
 */
const NonSSRWrapper = (props: NonSSRWrapperProps) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
