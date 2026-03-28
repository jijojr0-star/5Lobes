import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/ModalContext';

export const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isPartnersOpen, setIsPartnersOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [isMobilePartnersOpen, setIsMobilePartnersOpen] = useState(false);
    const servicesDropdownRef = useRef(null);
    const partnersDropdownRef = useRef(null);
    const { openServiceModal } = useModal();

    const navLinks = [
        { href: '#home', label: 'HOME' },
        { href: '#about', label: 'ABOUT US' }
    ];

    const serviceLinks = [
        { href: '#erp-consulting', label: 'ERP Consulting & Implementation Services', openModal: true, serviceKey: 'erp-consulting' },
        { href: '#infor-syteline', label: 'Infor SyteLine (Cloudsuite Industrials)', openModal: true, serviceKey: 'infor-syteline' },
        { href: '#odoo-partner', label: 'Odoo', openModal: true, serviceKey: 'odoo-partner' },
        { href: '#hr-consulting', label: 'Human Resource Management', openModal: true, serviceKey: 'hr-consulting' }
    ];

    const partnerLinks = [
        { href: '#odoo-partner', label: 'Odoo', openModal: true, serviceKey: 'odoo-partner', logo: 'https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/mn96lm9e_image.png' },
        { href: '#talentcorner', label: 'TalentCorner', openModal: true, serviceKey: 'hr-consulting', logo: 'https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/au29ykee_image.png' }
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
                setIsServicesOpen(false);
            }
            if (partnersDropdownRef.current && !partnersDropdownRef.current.contains(event.target)) {
                setIsPartnersOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
            // Calculate offset for fixed header (approximately 96px)
            const headerOffset = 96;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close all menus and dropdowns
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
        setIsPartnersOpen(false);
        setIsMobileServicesOpen(false);
        setIsMobilePartnersOpen(false);
    };

    const handleOpenServiceModal = (serviceKey) => {
        openServiceModal(serviceKey);
        
        // Close all menus and dropdowns
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
        setIsPartnersOpen(false);
        setIsMobileServicesOpen(false);
        setIsMobilePartnersOpen(false);
    };

    const handleServiceLinkClick = (e, link) => {
        e.preventDefault();
        
        if (link.openModal && link.serviceKey) {
            // Open modal via context
            handleOpenServiceModal(link.serviceKey);
        } else {
            // Scroll to section
            scrollToSection(e, link.href);
        }
    };

    return (
        <nav className="flex justify-between items-center h-[90px] px-[8%] bg-background shadow-nav sticky top-0 z-50">
            {/* Logo + Tagline */}
            <a
                href="#home"
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex flex-col items-start no-underline justify-center h-full"
            >
                <img
                    src="/5lobes-logo.jpg"
                    alt="5Lobes Technologies"
                    className="h-14 md:h-16 w-auto object-contain rounded-lg"
                    loading="eager"
                />
                <span className="text-xs md:text-sm italic text-secondary font-medium mt-0.5 leading-tight">
                    Best brains building a better tomorrow!
                </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex list-none items-center h-full m-0 p-0">
                {navLinks.map((link) => (
                    <li key={link.href} className="ml-10 flex items-center h-full">
                        <a
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline leading-none"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
                
                {/* Services Dropdown */}
                <li className="ml-10 relative flex items-center h-full" ref={servicesDropdownRef}>
                    <div className="flex items-center">
                        {/* Services Text - Navigates to Services Section */}
                        <a
                            href="#services"
                            onClick={(e) => scrollToSection(e, '#services')}
                            className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline leading-none"
                        >
                            SERVICES
                        </a>
                        {/* Dropdown Arrow - Opens Dropdown */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsServicesOpen(!isServicesOpen);
                                setIsPartnersOpen(false);
                            }}
                            className="ml-1 p-1 rounded hover:bg-accent transition-colors duration-200"
                            aria-expanded={isServicesOpen}
                            aria-haspopup="true"
                            aria-label="Toggle services dropdown"
                        >
                            <ChevronDown 
                                className={`h-4 w-4 text-secondary transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                            />
                        </button>
                    </div>
                    
                    {/* Services Dropdown Menu */}
                    {isServicesOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg py-2 animate-fade-in z-50">
                            {serviceLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.openModal ? '#' : link.href}
                                    onClick={(e) => handleServiceLinkClick(e, link)}
                                    className="block px-4 py-2.5 text-secondary font-medium hover:bg-accent hover:text-primary transition-colors duration-200 text-sm"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </li>
                
                {/* Partners Dropdown */}
                <li className="ml-10 relative flex items-center h-full" ref={partnersDropdownRef}>
                    <div className="flex items-center">
                        {/* Partners Text - Navigates to first partner (Odoo Partner) */}
                        <a
                            href="#odoo-partner"
                            onClick={(e) => scrollToSection(e, '#odoo-partner')}
                            className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline leading-none"
                        >
                            PARTNERS
                        </a>
                        {/* Dropdown Arrow - Opens Dropdown */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsPartnersOpen(!isPartnersOpen);
                                setIsServicesOpen(false);
                            }}
                            className="ml-1 p-1 rounded hover:bg-accent transition-colors duration-200"
                            aria-expanded={isPartnersOpen}
                            aria-haspopup="true"
                            aria-label="Toggle partners dropdown"
                        >
                            <ChevronDown 
                                className={`h-4 w-4 text-secondary transition-transform duration-200 ${isPartnersOpen ? 'rotate-180' : ''}`} 
                            />
                        </button>
                    </div>
                    
                    {/* Partners Dropdown Menu */}
                    {isPartnersOpen && (
                        <div className="absolute top-full left-0 mt-2 w-52 bg-background border border-border rounded-lg shadow-lg py-2 animate-fade-in z-50">
                            {partnerLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.openModal ? '#' : link.href}
                                    onClick={(e) => handleServiceLinkClick(e, link)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-secondary font-medium hover:bg-accent hover:text-primary transition-colors duration-200"
                                >
                                    {link.logo && (
                                        <img src={link.logo} alt={link.label} className="w-6 h-6 object-contain flex-shrink-0" loading="lazy" />
                                    )}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </li>

                <li className="ml-10 flex items-center h-full">
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline leading-none"
                    >
                        CONTACT
                    </a>
                </li>

                {/* External Platform Icons */}
                <li className="ml-8 flex items-center gap-3 h-full">
                    <a
                        href="https://www.linkedin.com/company/5lobes-technologies-pvt-ltd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        data-testid="linkedin-icon"
                        className="hover:scale-110 transition-all duration-200"
                    >
                        <img src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/7jv8hnhp_image.png" alt="LinkedIn" className="w-5 h-5 object-contain rounded-sm" loading="lazy" />
                    </a>
                    <a
                        href="https://www.odoo.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Odoo Partner"
                        data-testid="odoo-icon"
                        className="hover:scale-110 transition-all duration-200"
                    >
                        <img src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/mn96lm9e_image.png" alt="Odoo" className="w-5 h-5 object-contain" loading="lazy" />
                    </a>
                    <a
                        href="https://talentcorner.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="TalentCorner Partner"
                        data-testid="talentcorner-icon"
                        className="hover:scale-110 transition-all duration-200"
                    >
                        <img src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/au29ykee_image.png" alt="TalentCorner" className="w-6 h-6 object-contain" loading="lazy" />
                    </a>
                </li>
            </ul>

            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background shadow-lg md:hidden animate-fade-in z-40">
                    <ul className="list-none py-4">
                        {navLinks.map((link) => (
                            <li key={link.href} className="px-[8%] py-3">
                                <a
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline block"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        
                        {/* Mobile Services Dropdown */}
                        <li className="px-[8%] py-3">
                            <div className="flex items-center justify-between">
                                {/* Services Text - Navigates to Services Section */}
                                <a
                                    href="#services"
                                    onClick={(e) => scrollToSection(e, '#services')}
                                    className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline"
                                >
                                    SERVICES
                                </a>
                                {/* Dropdown Arrow - Opens Dropdown */}
                                <button
                                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                    className="p-2 rounded hover:bg-accent transition-colors duration-200"
                                    aria-label="Toggle services dropdown"
                                >
                                    <ChevronDown 
                                        className={`h-4 w-4 text-secondary transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} 
                                    />
                                </button>
                            </div>
                            
                            {/* Mobile Services Sub-links */}
                            {isMobileServicesOpen && (
                                <div className="mt-2 ml-4 border-l-2 border-primary/20 pl-4">
                                    {serviceLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.openModal ? '#' : link.href}
                                            onClick={(e) => handleServiceLinkClick(e, link)}
                                            className="block py-2 text-muted-foreground font-medium hover:text-primary transition-colors duration-200 text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>
                        
                        {/* Mobile Partners Dropdown */}
                        <li className="px-[8%] py-3">
                            <div className="flex items-center justify-between">
                                {/* Partners Text - Navigates to Partners Section */}
                                <a
                                    href="#odoo-partner"
                                    onClick={(e) => scrollToSection(e, '#odoo-partner')}
                                    className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline"
                                >
                                    PARTNERS
                                </a>
                                {/* Dropdown Arrow - Opens Dropdown */}
                                <button
                                    onClick={() => setIsMobilePartnersOpen(!isMobilePartnersOpen)}
                                    className="p-2 rounded hover:bg-accent transition-colors duration-200"
                                    aria-label="Toggle partners dropdown"
                                >
                                    <ChevronDown 
                                        className={`h-4 w-4 text-secondary transition-transform duration-200 ${isMobilePartnersOpen ? 'rotate-180' : ''}`} 
                                    />
                                </button>
                            </div>
                            
                            {/* Mobile Partner Sub-links */}
                            {isMobilePartnersOpen && (
                                <div className="mt-2 ml-4 border-l-2 border-primary/20 pl-4">
                                    {partnerLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.openModal ? '#' : link.href}
                                            onClick={(e) => handleServiceLinkClick(e, link)}
                                            className="flex items-center gap-3 py-2 text-muted-foreground font-medium hover:text-primary transition-colors duration-200"
                                        >
                                            {link.logo && (
                                                <img src={link.logo} alt={link.label} className="w-6 h-6 object-contain flex-shrink-0" loading="lazy" />
                                            )}
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>

                        <li className="px-[8%] py-3">
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, '#contact')}
                                className="text-secondary font-semibold transition-colors duration-300 hover:text-primary no-underline block"
                            >
                                CONTACT
                            </a>
                        </li>

                        {/* Mobile External Icons */}
                        <li className="px-[8%] py-3 flex items-center gap-4 border-t border-border mt-2 pt-4">
                            <a href="https://www.linkedin.com/company/5lobes-technologies-pvt-ltd/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:scale-110 transition-all duration-200">
                                <img src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/7jv8hnhp_image.png" alt="LinkedIn" className="w-5 h-5 object-contain rounded-sm" loading="lazy" />
                            </a>
                            <a href="https://www.odoo.com/" target="_blank" rel="noopener noreferrer" title="Odoo Partner" className="hover:scale-110 transition-all duration-200">
                                <img src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/mn96lm9e_image.png" alt="Odoo" className="w-5 h-5 object-contain" loading="lazy" />
                            </a>
                            <a href="https://talentcorner.in/" target="_blank" rel="noopener noreferrer" title="TalentCorner Partner" className="hover:scale-110 transition-all duration-200">
                                <img src="https://customer-assets.emergentagent.com/job_33424166-e621-4602-bbca-dc46b9531d7e/artifacts/au29ykee_image.png" alt="TalentCorner" className="w-6 h-6 object-contain" loading="lazy" />
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};
