import React from 'react';

export const Hero = () => {
    return (
        <section
            id="home"
            className="gradient-hero min-h-[45vh] flex items-center text-primary-foreground px-[8%]"
        >
            <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                    IT Strategy Targeted at<br />Peak Performance
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                    Empowering organizations through disruptive market change.
                </p>
            </div>
        </section>
    );
};
