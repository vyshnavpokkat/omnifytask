import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilRootProps } from 'recoil';
import "../app/globals.css";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        })
    }, [])
    return (
        <RecoilRoot {...(pageProps as RecoilRootProps)}>
            <Component {...pageProps} />
        </RecoilRoot>
    );
}