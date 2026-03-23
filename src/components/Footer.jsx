import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const offices = [
    {
        region: 'India',
        flag: '🇮🇳',
        address: 'Bengaluru, Karnataka 560035',
        email: 'info@5lobestechnologies.com',
        phone: '+91 63833 93896',
    },
    {
        region: 'USA',
        flag: '🇺🇸',
        address: 'Oconomowoc, WI 53066',
        email: 'ugendran.thulasingam@5lobestechnologies.com',
        phone: null,
    },
];

const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
];

const partners = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/5lobes-technologies-pvt-ltd/',
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Odoo Partner',
        href: 'https://www.odoo.com/',
        icon: (
            <img
                src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/mn96lm9e_image.png"
                alt="Odoo"
                className="w-4 h-4 object-contain brightness-0 invert"
                loading="lazy"
            />
        ),
    },
    {
        label: 'TalentCorner',
        href: 'https://talentcorner.in/',
        icon: (
            <img
                src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/au29ykee_image.png"
                alt="TalentCorner"
                className="w-4 h-4 object-contain brightness-0 invert"
                loading="lazy"
            />
        ),
    },
];

const scrollToSection = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
};

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050c16] text-[#a8b2d1]">

            {/* ── Main grid ── */}
            <div className="px-[8%] pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* Col 1 — Brand */}
                    <div className="lg:col-span-1">
                        <a href="#home" onClick={(e) => scrollToSection(e, '#home')}>
                            <img
                                src="https://customer-assets.emergentagent.com/job_techservices-site/artifacts/7hhx7w9a_image.png"
                                alt="5Lobes Technologies"
                                className="h-10 w-auto object-contain mb-4"
                                loading="lazy"
                            />
                        </a>
                        <p className="text-sm leading-relaxed text-[#6b7a9d] mb-6">
                            Best brains building a better tomorrow. IT strategy &amp; solutions
                            for organizations navigating disruptive change.
                        </p>

                        {/* Social / partner icons */}
                        <div className="flex items-center gap-3">
                            {partners.map((p) => (
                                <a
                                    key={p.label}
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={p.label}
                                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#007bff] flex items-center justify-center text-[#a8b2d1] hover:text-white transition-all duration-200"
                                >
                                    {p.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 — Quick links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-sm text-[#6b7a9d] hover:text-[#007bff] transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#007bff] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 & 4 — Offices */}
                    {offices.map((office) => (
                        <div key={office.region}>
                            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                                <span>{office.flag}</span>
                                {office.region} Office
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-[#6b7a9d]">
                                    <MapPin className="w-4 h-4 text-[#007bff] flex-shrink-0 mt-0.5" />
                                    {office.address}
                                </li>
                                <li>
                                    <a
                                        href={`mailto:${office.email}`}
                                        className="flex items-start gap-3 text-sm text-[#6b7a9d] hover:text-[#007bff] transition-colors duration-200 break-all"
                                    >
                                        <Mail className="w-4 h-4 text-[#007bff] flex-shrink-0 mt-0.5" />
                                        {office.email}
                                    </a>
                                </li>
                                {office.phone && (
                                    <li>
                                        <a
                                            href={`tel:${office.phone.replace(/\s/g, '')}`}
                                            className="flex items-center gap-3 text-sm text-[#6b7a9d] hover:text-[#007bff] transition-colors duration-200"
                                        >
                                            <Phone className="w-4 h-4 text-[#007bff] flex-shrink-0" />
                                            {office.phone}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="mx-[8%] border-t border-white/5" />

            {/* ── Bottom bar ── */}
            <div className="px-[8%] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4a5568]">
                <p>© {currentYear} 5Lobes Technologies Private Limited. All Rights Reserved.</p>
                <a
                    href="mailto:info@5lobestechnologies.com"
                    className="hover:text-[#007bff] transition-colors duration-200 flex items-center gap-1"
                >
                    info@5lobestechnologies.com
                    <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </footer>
    );
};
