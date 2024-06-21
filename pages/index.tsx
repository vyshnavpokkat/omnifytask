import React, { useState, useEffect } from 'react';
import { ContentPanel } from "@/components/ContentPanel";
import Loader from "@/components/Loader";
import { MobileNavbar } from "@/components/MobileNavbar";
import { Sidebar } from "@/components/Sidebar";

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        };

        // Check if the document is already fully loaded
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <MobileNavbar />
            <Sidebar />
            <ContentPanel />
        </>
    );
}
