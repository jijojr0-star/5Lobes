import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { CheckCircle, ExternalLink, ChevronRight, Package, Building2, FlaskConical } from 'lucide-react';
const FullContentModal = React.lazy(() => import('./FullContentModal'));

const SubModal = ({ title, items, isOpen, onClose, icon: Icon }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg w-[90vw] p-0" data-testid={`submodal-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-secondary">{title}</h2>
                </div>
                <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
                <ul className="space-y-3">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-secondary">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                            <span className="text-base">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </DialogContent>
    </Dialog>
);

const TextSubModal = ({ title, description, image, isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl w-[90vw] p-0 overflow-hidden" data-testid={`submodal-${title?.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[300px]">
                {/* Left - Image */}
                <div className="relative min-h-[200px] md:min-h-full">
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover md:rounded-l-lg rounded-t-lg md:rounded-tr-none"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-secondary/20 to-transparent md:rounded-l-lg rounded-t-lg md:rounded-tr-none"></div>
                </div>
                {/* Right - Content */}
                <div className="flex flex-col justify-center p-8">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                        Our Services
                    </span>
                    <h2 className="text-xl lg:text-2xl font-bold text-secondary leading-tight mb-4">
                        {title}
                    </h2>
                    <div className="w-12 h-1 bg-primary rounded-full mb-4"></div>
                    <p className="text-muted-foreground leading-relaxed text-base">{description}</p>
                </div>
            </div>
        </DialogContent>
    </Dialog>
);

export const ServiceModal = ({ service, isOpen, onClose }) => {
    const [productsOpen, setProductsOpen] = useState(false);
    const [industriesOpen, setIndustriesOpen] = useState(false);
    const [activeTestingType, setActiveTestingType] = useState(null);

    if (!service) return null;

    if (service.fullContent) {
        return (
            <React.Suspense fallback={null}>
                <FullContentModal service={service} isOpen={isOpen} onClose={onClose} />
            </React.Suspense>
        );
    }

    return (
        <>
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto p-0">
                {/* Split Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Side - Content */}
                    <div className="flex flex-col justify-start p-6 lg:p-8 order-2 lg:order-1">
                        {/* Subtitle */}
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                            Our Services
                        </span>
                        
                        {/* Main Heading */}
                        <h2 className="text-2xl lg:text-3xl font-bold text-secondary leading-tight mb-6">
                            {service.title}
                        </h2>
                        
                        {/* Decorative Line */}
                        <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
                        
                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-6">
                            {service.content}
                        </p>
                        
                        {/* Partnership Section for HR Consulting */}
                        {service.partnership && (
                            <div className="bg-accent/50 border border-primary/20 rounded-lg p-5 mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                                        Partnership
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.partnership.text}{' '}
                                    <a
                                        href={service.partnership.partnerUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                                    >
                                        {service.partnership.partnerName}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                    {service.partnership.description}
                                </p>
                            </div>
                        )}
                        
                        {/* Core Services section */}
                        {service.coreServices && (
                            <div className="mt-2" data-testid="core-services-section">
                                <h3 className="text-lg lg:text-xl font-bold text-secondary mb-4">
                                    Core Services
                                </h3>
                                <div className="space-y-4">
                                    {service.coreServices.map((category, idx) => (
                                        <div key={idx} data-testid={`core-service-${idx}`}>
                                            <h4 className="text-secondary font-semibold text-base flex items-center gap-2 mb-2">
                                                <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                                                {category.category}
                                            </h4>
                                            <ul className="space-y-1.5 pl-6">
                                                {category.items.map((item, itemIdx) => (
                                                    <li
                                                        key={itemIdx}
                                                        className="flex items-start gap-2 text-muted-foreground text-sm"
                                                    >
                                                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ERP Quick Links */}
                        {(service.productsWeSupport || service.industriesServed) && (
                            <div className="flex flex-wrap gap-3 mt-6" data-testid="erp-quick-links">
                                {service.productsWeSupport && (
                                    <button
                                        onClick={() => setProductsOpen(true)}
                                        data-testid="products-we-support-link"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary/30 text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all duration-200"
                                    >
                                        <Package className="h-4 w-4" />
                                        Products We Support
                                    </button>
                                )}
                                {service.industriesServed && (
                                    <button
                                        onClick={() => setIndustriesOpen(true)}
                                        data-testid="industries-served-link"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary/30 text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all duration-200"
                                    >
                                        <Building2 className="h-4 w-4" />
                                        Industries Served
                                    </button>
                                )}
                            </div>
                        )}

                        {/* List items if available */}
                        {service.list && (
                            <div className="mt-2">
                                {/* Show header for HR service */}
                                {service.key === 'hr-consulting' && (
                                    <h4 className="text-secondary font-semibold mb-3">Our HR Services Include:</h4>
                                )}
                                <ul className="space-y-3">
                                    {service.list.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-3 text-secondary"
                                        >
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Testing Services section */}
                        {service.testingServices && (
                            <div className="mt-2" data-testid="testing-services-section">
                                <h3 className="text-lg lg:text-xl font-bold text-secondary mb-2">
                                    Our Services
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {service.testingServices.intro}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {service.testingServices.types.map((type, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTestingType(type)}
                                            data-testid={`testing-type-${idx}`}
                                            className="flex flex-col items-center rounded-lg border border-border overflow-hidden hover:border-primary/50 hover:shadow-md transition-all duration-200 group cursor-pointer"
                                        >
                                            <div className="w-full h-20 overflow-hidden">
                                                <img
                                                    src={type.image}
                                                    alt={type.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <span className="text-secondary font-medium text-xs py-2 px-2 text-center group-hover:text-primary transition-colors">
                                                {type.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Right Side - Image */}
                    <div className={`relative order-1 lg:order-2 min-h-[200px] ${service.whiteBackground ? 'bg-white flex items-center justify-center p-4' : ''}`}>
                        <img
                            src={service.image}
                            alt={service.title}
                            className={service.whiteBackground
                                ? 'w-full h-auto object-contain lg:rounded-r-lg rounded-t-lg lg:rounded-tl-none'
                                : 'absolute inset-0 w-full h-full object-cover lg:rounded-r-lg rounded-t-lg lg:rounded-tl-none'
                            }
                            loading="lazy"
                        />
                        {/* Subtle Gradient Overlay */}
                        {!service.whiteBackground && (
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-secondary/20 to-transparent lg:rounded-r-lg rounded-t-lg lg:rounded-tl-none"></div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        {service.productsWeSupport && (
            <SubModal
                title="Products We Support"
                items={service.productsWeSupport}
                isOpen={productsOpen}
                onClose={() => setProductsOpen(false)}
                icon={Package}
            />
        )}
        {service.industriesServed && (
            <SubModal
                title="Industries Served"
                items={service.industriesServed}
                isOpen={industriesOpen}
                onClose={() => setIndustriesOpen(false)}
                icon={Building2}
            />
        )}
        {activeTestingType && (
            <TextSubModal
                title={activeTestingType.title}
                description={activeTestingType.description}
                image={activeTestingType.image}
                isOpen={!!activeTestingType}
                onClose={() => setActiveTestingType(null)}
            />
        )}
        </>
    );
};
