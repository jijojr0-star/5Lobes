import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/ModalContext';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
        title: 'ERP Consulting & Implementation Services',
        description: 'We provide end-to-end ERP consulting and implementation services to help businesses streamline operations and improve efficiency.',
        serviceKey: 'erp-consulting'
    },
    {
        id: 2,
        image: '/syteline-hero.png',
        title: 'Infor SyteLine (Cloudsuite Industrials) and Mongoose',
        description: 'We provide expert Infor SyteLine (Cloudsuite Industrials) consulting to help businesses optimize ERP systems and manufacturing processes.',
        serviceKey: 'infor-syteline'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80',
        title: 'Odoo Partner Services',
        description: 'As certified Odoo Partners, we provide comprehensive services to help businesses implement, customize, and optimize their ERP solutions.',
        serviceKey: 'odoo-partner'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80',
        title: 'Human Resource Management',
        description: 'We provide end-to-end HR services including recruitment, staffing, payroll management, HR consultancy, compliance support, training, and workforce solutions.',
        serviceKey: 'hr-consulting'
    }
];

export const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const { openServiceModal } = useModal();

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section id="home" className="relative w-full h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden">
            {/* Tagline Overlay */}
            <div
                className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-20 italic text-white text-base md:text-lg whitespace-nowrap"
                style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.6)' }}
                data-testid="hero-tagline"
            >
                Best brains building a better tomorrow!
            </div>

            {/* Slides Container */}
            <div 
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="relative w-full h-full flex-shrink-0"
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                        
                        {/* Content - Centered */}
                        <div className="relative h-full flex items-center justify-center px-[8%]">
                            <div className="max-w-3xl text-center text-white">
                                <h1 
                                    className={`text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6 ${
                                        index === currentSlide ? 'animate-fade-in-up' : ''
                                    }`}
                                >
                                    {slide.title}
                                </h1>
                                <p 
                                    className={`text-base md:text-lg lg:text-xl opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed ${
                                        index === currentSlide ? 'animate-fade-in-up' : ''
                                    }`}
                                    style={{ animationDelay: '0.15s' }}
                                >
                                    {slide.description}
                                </p>
                                <div 
                                    className={`${index === currentSlide ? 'animate-fade-in-up' : ''}`}
                                    style={{ animationDelay: '0.3s' }}
                                >
                                    <Button
                                        onClick={() => openServiceModal(slide.serviceKey)}
                                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 group"
                                    >
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={() => {
                    prevSlide();
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <button
                onClick={() => {
                    nextSlide();
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-white w-6 md:w-8'
                                : 'bg-white/50 hover:bg-white/70 w-2.5 md:w-3'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};
