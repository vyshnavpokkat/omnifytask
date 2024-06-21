import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilRootProps } from 'recoil';
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot {...(pageProps as RecoilRootProps)}>
            <Component {...pageProps} />
        </RecoilRoot>
    );
}