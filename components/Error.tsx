import React from 'react';

export const Error: React.FC = () => {
    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="bg-primary rounded-lg shadow-md p-10 mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something&apos;s missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.</p>
                </div>
            </div>
        </section>
    );
};
