import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

export interface NonSSRWrapperProps {
  children: ReactNode;
}

const NonSSRWrapper = (props: NonSSRWrapperProps) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
