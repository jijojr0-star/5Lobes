import React, { useState, useEffect } from 'react';
import { serviceData } from '@/data/services';
import { ServiceModal } from '@/components/ServiceModal';
import { OdooPartnersModal } from '@/components/OdooPartnersModal';
import { Card, CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOdooModalOpen, setIsOdooModalOpen] = useState(false);

    const { activeServiceKey, closeServiceModal } = useModal();

    // React to context-driven modal requests
    useEffect(() => {
        if (!activeServiceKey) return;
        if (activeServiceKey === 'odoo-partner') {
            setIsOdooModalOpen(true);
        } else if (serviceData[activeServiceKey]) {
            setSelectedService({ key: activeServiceKey, ...serviceData[activeServiceKey] });
            setIsModalOpen(true);
        }
    }, [activeServiceKey]);

    // Handle URL param on first mount (e.g. ?service=erp-consulting)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        if (serviceParam && serviceData[serviceParam]) {
            setTimeout(() => {
                openLocalModal(serviceParam);
                window.history.replaceState({}, '', window.location.pathname);
            }, 100);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openLocalModal = (key) => {
        if (key === 'odoo-partner') {
            setIsOdooModalOpen(true);
        } else {
            setSelectedService({ key, ...serviceData[key] });
            setIsModalOpen(true);
        }
    };

    const handleServiceClick = (key) => {
        openLocalModal(key);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
        closeServiceModal();
    };

    const handleCloseOdooModal = () => {
        setIsOdooModalOpen(false);
        closeServiceModal();
    };

    const getIcon = (iconName) => {
        const IconComponent = Icons[iconName];
        return IconComponent ? <IconComponent className="h-6 w-6 text-primary" /> : null;
    };

    return (
        <section id="services" className="section-padding bg-muted">
            {/* Section Header */}
            <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                    Our Comprehensive Services
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Click on any service card to view full details.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {Object.entries(serviceData).map(([key, service], index) => {
                    const getCardId = () => {
                        switch(key) {
                            case 'erp-consulting': return 'erp-consulting';
                            case 'infor-syteline': return 'infor-syteline';
                            case 'odoo-partner': return 'odoo-partner';
                            case 'hr-consulting': return 'hr-consulting';
                            default: return undefined;
                        }
                    };

                    return (
                        <Card
                            key={key}
                            id={getCardId()}
                            className="bg-background border border-border rounded-xl cursor-pointer service-card-hover animate-fade-in-up scroll-mt-24 relative overflow-hidden group h-full"
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => handleServiceClick(key)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View details for ${service.title}`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleServiceClick(key);
                                }
                            }}
                        >
                            {/* Top accent line that reveals on hover */}
                            <span className="absolute inset-x-0 top-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-xl" />

                            <CardContent className="p-8 flex flex-col h-full">
                                {/* Icon with glow container */}
                                <div className="service-icon-glow w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 flex-shrink-0">
                                    {getIcon(service.icon)}
                                </div>

                                <h3 className="text-base font-semibold text-secondary mb-3 leading-snug">
                                    {service.title}
                                </h3>

                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                                    {service.content}
                                </p>

                                {/* Partnership info for HR Consulting */}
                                {key === 'hr-consulting' && service.partnership && (
                                    <>
                                        <span id="talentcorner" className="absolute -top-24" />
                                        <div className="mt-4 pt-4 border-t border-border">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold text-secondary">Partnership: </span>
                                                <a
                                                    href={service.partnership.partnerUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary font-semibold hover:underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {service.partnership.partnerName}
                                                </a>
                                            </p>
                                        </div>
                                    </>
                                )}

                                {/* CTA row — always visible, arrow animates on hover */}
                                <div className="mt-5 flex items-center gap-1.5 text-primary text-sm font-medium">
                                    <span>{key === 'odoo-partner' ? 'View Services' : 'Learn More'}</span>
                                    <Icons.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Regular Service Modal */}
            <ServiceModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />

            {/* Odoo Partners Modal */}
            <OdooPartnersModal
                isOpen={isOdooModalOpen}
                onClose={handleCloseOdooModal}
            />
        </section>
    );
};
