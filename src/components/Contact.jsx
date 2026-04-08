import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

// ============================================================
// EmailJS Configuration — Replace these placeholders with your
// actual EmailJS credentials from https://www.emailjs.com/
// ============================================================
const EMAILJS_SERVICE_ID = 'service_6sdx8aa';
const EMAILJS_TEMPLATE_ID = 'template_2id66w4';
const EMAILJS_PUBLIC_KEY = '_3oc1lrp1VVcgDTMC';

emailjs.init(EMAILJS_PUBLIC_KEY);

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        console.error('EmailJS error:', xhr.status, xhr.responseText);
                        reject(new Error(xhr.responseText || 'Request failed'));
                    }
                };
                xhr.onerror = function () {
                    reject(new Error('Network error'));
                };
                xhr.send(JSON.stringify({
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    user_id: EMAILJS_PUBLIC_KEY,
                    template_params: {
                        from_name: formData.name,
                        from_email: formData.email,
                        phone: formData.phone,
                        message: formData.message,
                    },
                }));
            });

            toast.success('Your inquiry has been submitted successfully.');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('EmailJS error:', error);
            toast.error('Failed to submit inquiry. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const offices = [
        {
            title: 'India Office',
            address: 'Astro Maison Douce D, MB3 212, Rainbow Residency, K-Halli, Bengaluru, Karnataka 560035',
            email: 'info@5lobestechnologies.com'
        },
        {
            title: 'USA Office',
            address: '5Lobes Technologies LLC, W376N7995, McMohan Rd, Oconomowoc, WI 53066 - 1027',
            email: 'ugendran.thulasingam@5lobestechnologies.com'
        }
    ];

    return (
        <section id="contact" className="section-padding">
            {/* Section Header */}
            <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                    Book an Inquiry
                </h2>
            </div>

            {/* Contact Container */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
                {/* Office Information */}
                <div className="space-y-6">
                    {offices.map((office, index) => (
                        <Card
                            key={index}
                            className="bg-accent border border-border animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardContent className="p-8">
                                <h3 className="text-secondary font-semibold text-lg mb-4 flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    {office.title}
                                </h3>
                                <address className="text-muted-foreground not-italic leading-relaxed mb-4">
                                    {office.address}
                                </address>
                                <div className="space-y-2">
                                    {office.phone && (
                                        <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                            <Phone className="h-4 w-4 text-primary" />
                                            {office.phone}
                                        </a>
                                    )}
                                    <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                                        <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                                        {office.email}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Booking Form */}
                <Card className="bg-background shadow-form border border-border animate-fade-in-up">
                    <CardContent className="p-8 md:p-10">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="block font-semibold text-secondary text-sm"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="h-11"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="block font-semibold text-secondary text-sm"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="h-11"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <label
                                    htmlFor="phone"
                                    className="block font-semibold text-secondary text-sm"
                                >
                                    Phone Number
                                </label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="h-11"
                                    placeholder="Enter your phone number"
                                    data-testid="phone-input"
                                />
                            </div>

                            <div className="space-y-2 mb-6">
                                <label
                                    htmlFor="message"
                                    className="block font-semibold text-secondary text-sm"
                                >
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
