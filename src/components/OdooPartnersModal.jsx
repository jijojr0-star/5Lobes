import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { 
    Rocket, 
    Wrench, 
    GraduationCap, 
    HeadphonesIcon,
    ArrowRight,
    ChevronRight
} from 'lucide-react';

// Odoo sub-services data with detailed content
const odooServices = [
    {
        id: 'implementation',
        title: 'Odoo Implementation',
        icon: Rocket,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        description: 'We provide end-to-end Odoo ERP implementation services, guiding your business through every phase—from initial consultation and requirement analysis to deployment and post-launch support. Our certified consultants ensure a seamless transition tailored to your unique business processes.',
        features: [
            'Requirement gathering & business process mapping',
            'Module selection & system configuration',
            'Data migration from legacy systems',
            'User acceptance testing (UAT)',
            'Go-live deployment & post-implementation support'
        ]
    },
    {
        id: 'customization',
        title: 'Odoo Customization',
        icon: Wrench,
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
        description: 'Custom module development and modifications to extend Odoo functionality for your unique business needs. We build tailored solutions that integrate seamlessly with your existing workflows.',
        features: [
            'Custom module development',
            'Workflow automation & business logic',
            'Report customization & dashboards',
            'Third-party API integrations',
            'UI/UX enhancements'
        ]
    },
    {
        id: 'training',
        title: 'Odoo Training',
        icon: GraduationCap,
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
        description: 'Comprehensive training programs to empower your team with Odoo expertise and best practices. We ensure your staff can effectively utilize all features of the system.',
        features: [
            'End-user training sessions',
            'Administrator & technical training',
            'Customized training materials & guides',
            'Hands-on workshop sessions',
            'Ongoing learning support'
        ]
    },
    {
        id: 'support',
        title: 'Odoo Support',
        icon: HeadphonesIcon,
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
        description: 'Reliable support and maintenance services to ensure your Odoo system runs smoothly. Our dedicated team provides timely assistance for all your technical needs.',
        features: [
            '24/7 technical support availability',
            'Bug fixes & system updates',
            'Performance optimization & tuning',
            'System health monitoring',
            'Regular maintenance & backups'
        ]
    }
];

export const OdooPartnersModal = ({ isOpen, onClose }) => {
    const [selectedSubService, setSelectedSubService] = useState(null);

    const handleServiceClick = (service) => {
        setSelectedSubService(service);
    };

    const handleBack = () => {
        setSelectedSubService(null);
    };

    const handleCloseModal = () => {
        setSelectedSubService(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleCloseModal}>
            <DialogContent 
                className="max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto p-0"
                aria-label="Odoo Partners Services"
            >
                {!selectedSubService ? (
                    // Main view with 4 service buttons
                    <div className="p-8 lg:p-12">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3 block">
                                Odoo Partner Services
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-bold text-secondary leading-tight mb-4">
                                Maximize Your Odoo Investment
                            </h2>
                            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4"></div>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                As certified Odoo Partners, we provide comprehensive services to help businesses 
                                implement, customize, and optimize their ERP solutions.
                            </p>
                        </div>

                        {/* Service Buttons Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {odooServices.map((service) => {
                                const IconComponent = service.icon;
                                return (
                                    <button
                                        key={service.id}
                                        className="w-full p-6 flex flex-col items-start text-left bg-background border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                                        onClick={() => handleServiceClick(service)}
                                        aria-label={`Learn more about ${service.title}`}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                                            <IconComponent className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-secondary mb-2 w-full">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground w-full break-words line-clamp-3">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-4 text-primary font-medium text-sm">
                                            Learn More
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    // Detail view - Image LEFT, Content RIGHT
                    <div className="flex flex-col lg:flex-row min-h-[500px]">
                        {/* Left Side - Image (50%) */}
                        <div className="relative w-full lg:w-1/2 min-h-[280px] lg:min-h-[500px] flex-shrink-0">
                            <img
                                src={selectedSubService.image}
                                alt={selectedSubService.title}
                                className="absolute inset-0 w-full h-full object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
                                loading="lazy"
                            />
                            {/* Subtle Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-secondary/10 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"></div>
                        </div>
                        
                        {/* Right Side - Content (50%) */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-10 overflow-y-auto">
                            {/* Back Button */}
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-primary font-medium text-sm mb-6 hover:underline self-start"
                                aria-label="Go back to all Odoo services"
                            >
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                Back to Services
                            </button>

                            {/* Main Heading */}
                            <h2 className="text-2xl lg:text-3xl font-bold text-secondary leading-tight mb-6">
                                {selectedSubService.title}
                            </h2>
                            
                            {/* Description Paragraph */}
                            <p className="text-muted-foreground leading-relaxed text-base mb-8">
                                {selectedSubService.description}
                            </p>
                            
                            {/* Features List with Arrow Icons */}
                            <ul className="space-y-4">
                                {selectedSubService.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-secondary"
                                    >
                                        <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="font-medium text-sm lg:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
