import React from 'react';
import { 
    Award, 
    History, 
    Lightbulb, 
    Smile, 
    Users, 
    UserCheck 
} from 'lucide-react';

export const About = () => {
    const aboutCards = [
        {
            title: 'Who Are We?',
            content: 'We are a newly established Information Technology consultancy that steers the strategy and IT transformation aimed at boosting your organization\'s performance, productivity, and competitiveness.'
        },
        {
            title: 'Our Mission',
            content: 'We develop and implement IT solutions to improve the productivity, efficiency and profitability of clients, enabling them to become high-performance organizations in the face of disruptive market change.'
        },
        {
            title: 'What We Do',
            content: 'We offer from consulting and strategic advice to high-value software engineering delivery, complemented by a wide range of experts that include architects, security experts and consultants.'
        }
    ];

    const whyChooseUs = [
        {
            icon: Award,
            title: 'Committed to Quality',
            content: 'We choose clients that share our values. Serving network needs is a huge responsibility we take seriously with a commitment to excellence.'
        },
        {
            icon: History,
            title: 'Proven Track Record',
            content: 'We deliver peace of mind, faster problem resolution, and simplicity in IT management that saves money and protects data.'
        },
        {
            icon: Lightbulb,
            title: 'We solve YOUR problems',
            content: 'We listen to your business problems and offer strategies that resolve the root cause rather than just selling "gizmos".'
        },
        {
            icon: Smile,
            title: 'We are FUN to work with',
            content: 'Our team genuinely cares about every client, driving us to provide fanatical support with a personal touch.'
        },
        {
            icon: Users,
            title: 'We work with YOUR Team',
            content: 'We work in close cooperation with your people to ensure maximum ROI and peak organizational performance.'
        },
        {
            icon: UserCheck,
            title: 'Experienced Professionals',
            content: 'Our consultants have a wide range of skills in the latest technologies to solve your toughest IT problems.'
        }
    ];

    const mantraItems = [
        {
            title: 'Parietal Lobe',
            content: 'Responsible to sense severity, develop, design, and position the product.'
        },
        {
            title: 'Frontal Lobe',
            content: 'Responsible to identify the root cause, solve, and closely monitor.'
        },
        {
            title: 'Temporal Lobe',
            content: 'Responsible for hearing and understanding the big picture and lessons learned.'
        },
        {
            title: 'Visual System',
            content: 'Responsible to visualize the future, brainstorm, and generate ideas.'
        }
    ];

    return (
        <section id="about" className="section-padding">
            {/* Introduction */}
            <div className="text-center mb-16 animate-fade-in">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                    Welcome to 5Lobes Technologies Private Limited
                </h3>
                <p className="max-w-4xl mx-auto text-muted-foreground leading-relaxed">
                    Our consultants help organizations deal with disruptive change and legacy IT challenges. 
                    We combine deep expertise with understanding, experience, and end-to-end capabilities across 
                    all industries, from consulting to solution delivery. We provide infrastructure support, 
                    solution architecture, design, develop and implement IT solutions and supply skilled experts.
                </p>
            </div>

            {/* About Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {aboutCards.map((card, index) => (
                    <div 
                        key={index} 
                        className="about-card animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <h4 className="about-card-title">{card.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{card.content}</p>
                    </div>
                ))}
            </div>

            {/* Why Choose Us Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                    Why choose us?
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {whyChooseUs.map((item, index) => (
                    <div 
                        key={index} 
                        className="why-item animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex-shrink-0 mt-1">
                            <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h5 className="text-secondary font-semibold text-lg mb-2">
                                {item.title}
                            </h5>
                            <p className="text-muted-foreground">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mantra Section */}
            <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 md:p-12 mt-16">
                <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        Our Mantra
                    </h3>
                    <p className="text-white/80 max-w-xl mx-auto">
                        Like the human brain, our strategy is built on specific functions to reach the extra mile.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {mantraItems.map((item, index) => (
                        <div key={index} className="mantra-item group">
                            <span className="inline-block text-xs font-bold text-primary/70 uppercase tracking-widest mb-3">
                                Lobe {index + 1}
                            </span>
                            <strong className="text-white block mb-2 text-base group-hover:text-primary transition-colors duration-300">
                                {item.title}
                            </strong>
                            <p className="text-white/70 text-sm leading-relaxed">{item.content}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center p-6 bg-primary rounded-xl">
                    <p className="font-bold text-lg text-primary-foreground">
                        The 5th Lobe: "Responsible to deliver with utmost quality in optimum time at best price"
                    </p>
                </div>
            </div>
        </section>
    );
};
