import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { CheckCircle, ChevronDown, Award, Zap, Star } from 'lucide-react';

export default function FullContentModal({ service, isOpen, onClose }) {
    const [openPhases, setOpenPhases] = useState({});

    const togglePhase = (idx) => {
        setOpenPhases(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    if (!service) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto p-0" data-testid="full-content-modal">
                {/* Hero Banner */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                        <span className="text-primary-foreground/80 font-semibold text-xs uppercase tracking-wider">Our Services</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">{service.title}</h2>
                        {service.subtitle && (
                            <p className="text-white/80 text-sm mt-1">{service.subtitle}</p>
                        )}
                        <div className="w-14 h-1 bg-primary rounded-full mt-3"></div>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-10">
                    {/* Introduction */}
                    <p className="text-muted-foreground text-[15px] leading-[1.7] pb-2">{service.content}</p>
                    {service.fullContent && <div className="border-b border-border"></div>}

                    {/* Expertise */}
                    {service.expertise && (
                        <div data-testid="expertise-section">
                            <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2">
                                <Award className="h-5 w-5 text-primary" />
                                {service.expertise.heading}
                            </h3>
                            <div className="space-y-4">
                                {service.expertise.paragraphs.map((p, i) => (
                                    <p key={i} className="text-muted-foreground text-[15px] leading-[1.7]">{p}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Implementation Methodology - Accordion */}
                    {service.methodology && (
                        <div data-testid="methodology-section">
                            <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                {service.methodology.heading}
                            </h3>
                            <div className="space-y-2">
                                {service.methodology.phases.map((phase, idx) => (
                                    <div key={idx} className="border border-border rounded-lg overflow-hidden" data-testid={`phase-${idx}`}>
                                        <button
                                            onClick={() => togglePhase(idx)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent/50 transition-colors"
                                        >
                                            <span className="font-semibold text-secondary text-sm flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{idx + 1}</span>
                                                {phase.title}
                                            </span>
                                            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openPhases[idx] ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openPhases[idx] && (
                                            <div className="px-4 pb-4 pt-2">
                                                <ul className="space-y-2.5 pl-8">
                                                    {phase.items.map((item, iIdx) => (
                                                        <li key={iIdx} className="flex items-start gap-2 text-muted-foreground text-[15px] leading-[1.7]">
                                                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Specialized Capabilities */}
                    {service.specializedCapabilities && (
                        <div data-testid="capabilities-section">
                            <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                Specialized Capabilities
                            </h3>
                            <ul className="space-y-2">
                                {service.specializedCapabilities.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-secondary text-[15px] leading-[1.7]">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                            <CheckCircle className="h-3 w-3 text-primary" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Key Highlights */}
                    {service.highlights && (
                        <div data-testid="highlights-section">
                            <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2">
                                <Star className="h-5 w-5 text-primary" />
                                Key Highlights
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {service.highlights.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2 bg-accent/30 rounded-lg px-4 py-3">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                        <span className="text-secondary text-[15px] leading-[1.7]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Offerings Grid */}
                    {service.offerings && (
                        <div data-testid="offerings-section">
                            <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                                <Star className="h-5 w-5 text-primary" />
                                What We Offer
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.offerings.map((item, idx) => (
                                    <div key={idx} className="border border-border rounded-lg p-4 hover:border-primary/30 hover:shadow-sm transition-all" data-testid={`offering-${idx}`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Zap className="h-4 w-4 text-primary" />
                                            </div>
                                            <h4 className="font-semibold text-secondary text-[15px]">{item.title}</h4>
                                        </div>
                                        <ul className="space-y-2 pl-1">
                                            {item.items.map((sub, sIdx) => (
                                                <li key={sIdx} className="flex items-start gap-2 text-muted-foreground text-[15px] leading-[1.7]">
                                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                                    <span>{sub}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Why Choose Us */}
                    {service.whyChooseUs && (
                        <div data-testid="why-choose-us-section">
                            <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2">
                                <Star className="h-5 w-5 text-primary" />
                                Why Choose Us?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {service.whyChooseUs.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-accent/30 rounded-lg px-4 py-3">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-secondary text-[15px] leading-[1.7] font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    {service.cta && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center" data-testid="cta-section">
                            <h3 className="text-lg font-bold text-secondary mb-2 flex items-center justify-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                {service.cta.heading}
                            </h3>
                            <p className="text-muted-foreground text-[15px] leading-[1.7] max-w-lg mx-auto">{service.cta.text}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
