import SiteLayout from '@/layouts/site-layout';
import { useState } from 'react';

const cities = ['london', 'birmingham', 'manchester', 'leeds', 'wales'] as const;
type City = (typeof cities)[number];

const cityData: Record<
    City,
    {
        title: string;
        description: string;
        points: string[];
        image: string | null;
        imageAlt: string | null;
        placeholderIcon: string;
        linkLabel: string;
    }
> = {
    london: {
        title: 'London',
        description:
            "The world's most globally connected capital. With over 40 universities in Greater London, students benefit from unparalleled industry access and cultural diversity.",
        points: ['40+ universities to choose from', 'Global hub for finance, tech and media', 'Graduate route eligible'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRtLnMNAVkI-SmMTasEDqj49VEGstaQ0DFCWdxMJO4bzh_O5pG2_Ls4Wxl6VgXHZbZVTAEESfkcMai3RWbXpBUP6cratEc-9zQczS3qriN2a_ErgnzUGC5avpzADyT8anaJI_JonUZIXqRxjv_G_pD9pFg8Q4WUaZaujvMPTs7I5Tze6LXa3gA-zPXJSGGmCX24d3Tm_AFGswVLH9MmpqpO0_WynvRgG1GqYL6j7nMi3RRP-AFt8Zo4Hiz8kEpyrnrFOelZ_m26EEF',
        imageAlt: 'London skyline at dawn',
        placeholderIcon: 'location_on',
        linkLabel: 'Explore London courses',
    },
    birmingham: {
        title: 'Birmingham',
        description:
            "The UK's second city, with a thriving student population of over 80,000 and a lower cost of living than London. Home to world-class universities and a booming tech sector.",
        points: ['Lower living costs than London', 'Growing tech and business sector', 'Vibrant multicultural community'],
        image: null,
        imageAlt: null,
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Birmingham courses',
    },
    manchester: {
        title: 'Manchester',
        description:
            'A world-renowned university city with excellent research output, an iconic music scene and a multicultural character. World-class education at very affordable living costs.',
        points: ['Internationally ranked universities', 'Russell Group access', 'Affordable student lifestyle'],
        image: null,
        imageAlt: null,
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Manchester courses',
    },
    leeds: {
        title: 'Leeds',
        description:
            "One of the UK's fastest-growing cities with a huge student community. Leeds offers an exceptional quality of life and is home to major employers in law, finance and health.",
        points: ['Thriving student union and social scene', 'Strong healthcare and law programmes', 'Excellent graduate employment rate'],
        image: null,
        imageAlt: null,
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Leeds courses',
    },
    wales: {
        title: 'Wales',
        description:
            'An affordable, scenic region with excellent university provision. UWTSD and Cardiff Met offer strong vocational and academic programmes in a welcoming bilingual environment.',
        points: ['Lowest cost of living in the UK', 'Strong UWTSD partnerships', 'Beautiful scenic campus environments'],
        image: null,
        imageAlt: null,
        placeholderIcon: 'landscape',
        linkLabel: 'Explore Wales courses',
    },
};

const courses = [
    {
        title: 'MSc Business Management',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1 Year Full-time',
        description:
            'Develop strategic leadership skills and business acumen. Intakes in September and January across multiple partner universities in London and Birmingham.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoMUPye57nJmFy3zjH8y-hcY_tT3BlWbKPOPRLVz6t1HusizrkmNxHbl8L934h-0UiBQLeTVjN2Msm-KEEa33q1rQBelC3GuRHbsskODWeBLJnTI-HbwzgkLSdgN5B45zYrqMj9m9E0t7ekKxgWmfvi4XPdVAsAyQQgJBfKf4pOCk66FxadKDbSHnQXlbcamKgkekb8EIBq2P4FGMks4cuEXOZQ2hmNmkFHNLmjql-waI3atmKpHz0HJsrOQxmS-0mSaY5vtWtMHNC',
        imageAlt: 'Business management course',
        revealDelay: '',
    },
    {
        title: 'BSc Nursing & Healthcare',
        tag: 'Top-up Degree',
        tagClass: 'bg-tertiary-container/25 text-tertiary',
        duration: '1 Year',
        description:
            'Fast-track your healthcare career with a professional top-up degree. Ideal for qualified nurses seeking a full UK BSc qualification with HCPC registration support.',
        hoverClass: 'group-hover:text-tertiary',
        linkClass: 'text-tertiary',
        shadow: 'hover:shadow-[0_4px_40px_rgba(80,221,184,.08)]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2eChOQt82BlMB-WTUc117w506wuyERPQxvf1jBynR5k6UNfwLtQxf3frOd7FbbCv-bj-qGUDCMPg3FC8FD44V0r_3ulyWc-dvJdn1lRxzX04uMadMUW_Cnszn6bvyKVA0GKenwEWyqj1iLbMgWZ999jfC5FMGc_w1lpXoQQCcXAtcJuGuzGpdOidzi9eHvQKujdvYj6m9Wq0lVwc-Aq9QpA908qCW6f-vYYBWB8yLHs-pKmgKC5zFpJ92kEiFQd463ANxKY9UZE1k',
        imageAlt: 'Healthcare and nursing',
        revealDelay: 'reveal-d1',
    },
    {
        title: 'BSc Computer Science',
        tag: 'Undergraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '3 Years Full-time',
        description:
            'Industry-integrated degree with placement year options. Covering AI, software engineering, cyber security and data science at leading UK tech universities.',
        hoverClass: 'group-hover:text-[#bcc2ff]',
        linkClass: 'text-[#bcc2ff]',
        shadow: 'hover:shadow-[0_4px_40px_rgba(188,194,255,.08)]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRI_LPKBY81oDOWA4L6aHiwYWtwnj5ieJddDO628u6cBPYaV0Jaftq5TVYnvXHUcV9on7QF8lcVV8ZZAsBGP8GLwQtfglx6aC2i-F-KtGvcq0Lvb0Z2P9lDeRC3EG8J-usF9l0IPQ4M1uXlo6YzTlEDE2FOUFL-eaSGXcXMDisL6MOATteFTFhKSQAAdIIAS4RCCRKE7K-u6OxFfyAn0DW7BMmD_KK6f9NpKDIgmj7CNuGGaHyuZtw35-ME7DZnQb5z5wnLxYI3w8s',
        imageAlt: 'Computer science lab',
        revealDelay: 'reveal-d2',
    },
    {
        title: 'MA International Relations',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1-2 Years',
        description: 'Explore global policy, diplomacy and international law. Perfect for students aiming for careers in government, NGOs or international organisations.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTHlNxSkhkqni7ZRwGmVocC23siV46lB9Ri5hv1IryN12dN9wOzmGyABTKToxyT3V8inDVnFkpjXO-LoLfrn3VTUTzLViULSRC7wzAPhRjYIpWNW9yTiFhlYNYs1mW2fYT2cpJzC3GiT4v4uua18g-UYZ4oViuT3pHfhL00kkCveazX53AQK0Ph68gAf_LCl7zMbj5leAJLRzBF_KLH7wknBORvB0oCXg45YTvfFfoE8w_XEwC9O7QQKrRSAcD97nTFr-5fBTh2-h',
        imageAlt: 'International relations and policy',
        revealDelay: 'reveal-d3',
    },
];

const StarFilled = () => (
    <span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
        star
    </span>
);

export default function Welcome() {
    const [activeCity, setActiveCity] = useState<City>('london');

    const city = cityData[activeCity];

    return (
        <SiteLayout title="Smart Move Education Group | Your Journey to a UK Degree" activePage="home">
            {/* Hero */}
            <header className="relative min-h-screen flex items-center overflow-hidden bg-[#131313]">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover object-center"
                        alt="Students walking through a historic UK university campus at golden hour"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVUAuny0-qE_Bc2n1thD5RPNlXiKZEsyFkkCXD0Z0hLU-rYQ8tNJ_g2gLKj1IrwKYcvJgZ14DFVj4TVBLz4Oi1dEbjTtTehL9CZBUBngEFEp_iyAMj4nNcV_Og_duUQvNXoP6a8KUdiT2UwsXloWZIDNY-FYuEp3nnp7GqepsR54n2NfN-jPg41nt_AQi971zzy-TUOqbd-INXd7YbVksbjsZndnYxk6ljJ61YFmX9xq7AFtXuq-3kFtfMVQ4ZGiAnmd3ftjgfbiVI"
                    />
                    <div className="absolute inset-0 bg-[#131313]/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#131313]/98 via-[#131313]/80 to-[#131313]/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/85 via-transparent to-transparent"></div>
                </div>
                <div className="glow-orb w-[700px] h-[700px] bg-[#1a3172] opacity-[0.13] -left-60 top-0 rounded-full"></div>
                <div className="glow-orb w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.07] left-1/3 -top-20 rounded-full"></div>

                <div className="relative z-10 container mx-auto px-6 lg:px-10 max-w-7xl w-full pt-20 pb-44">
                    <div className="max-w-[52rem]">
                        <div className="flex items-center gap-3 mb-8 animate-fadeUp">
                            <div className="flex items-center gap-2 text-secondary-container bg-secondary-container/10 border border-secondary-container/20 px-4 py-1.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulseGlow inline-block"></span>
                                <span className="text-[11px] font-label font-bold uppercase tracking-widest">March 2026 Intake Open</span>
                            </div>
                        </div>
                        <h1 className="font-headline font-black leading-[1.14] tracking-[-0.03em] overflow-visible pb-2">
                            <span className="text-white text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp">Your Journey to a</span>
                            <span className="text-gradient-gold text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp-d1">UK Degree</span>
                            <span className="text-white text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp-d1">Starts Here.</span>
                        </h1>
                        <p className="text-white/75 text-lg md:text-xl xl:text-2xl leading-relaxed max-w-xl font-body mt-8 mb-10 animate-fadeUp-d2">
                            Smart Move connects ambitious international students with leading UK universities from first enquiry to graduation day.
                        </p>
                        <div className="flex flex-wrap gap-4 animate-fadeUp-d2">
                            <a
                                className="bg-secondary-container text-on-secondary px-8 py-4 rounded-full font-headline font-bold text-base hover:scale-105 transition-transform shadow-2xl shadow-secondary-container/20 flex items-center gap-2"
                                href="#"
                            >
                                Start Your Application{' '}
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </a>
                            <a
                                className="border border-white/20 text-white px-8 py-4 rounded-full font-headline font-bold text-base hover:bg-white/10 transition-colors backdrop-blur-sm"
                                href="#"
                            >
                                Explore Courses
                            </a>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-16 animate-fadeUp-d3">
                            <div>
                                <div className="text-3xl font-headline font-extrabold text-white leading-none">500+</div>
                                <div className="text-white/50 text-xs font-label uppercase tracking-wider mt-1">Students Placed</div>
                            </div>
                            <div className="w-px bg-white/15"></div>
                            <div>
                                <div className="text-3xl font-headline font-extrabold text-white leading-none">20+</div>
                                <div className="text-white/50 text-xs font-label uppercase tracking-wider mt-1">University Partners</div>
                            </div>
                            <div className="w-px bg-white/15"></div>
                            <div>
                                <div className="text-3xl font-headline font-extrabold text-white leading-none">4.8/5</div>
                                <div className="text-white/50 text-xs font-label uppercase tracking-wider mt-1">Trustpilot Rating</div>
                            </div>
                            <div className="w-px bg-white/15"></div>
                            <div>
                                <div className="text-3xl font-headline font-extrabold text-white leading-none">98%</div>
                                <div className="text-white/50 text-xs font-label uppercase tracking-wider mt-1">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/30 lp-bounce">
                    <span className="text-[10px] font-label tracking-widest uppercase">Scroll</span>
                    <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </div>
            </header>

            {/* Partner Strip */}
            <div className="bg-surface-container-lowest border-y border-white/[0.08] py-10">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <p className="text-center text-white/20 text-[10px] font-label uppercase tracking-[0.25em] mb-8">Our Trusted University Partners</p>
                    <div className="flex items-center justify-center flex-wrap gap-16 md:gap-24">
                        {[
                            {
                                alt: 'UWTSD University',
                                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArFhvoM6rYJSCwTbBJ0yQEWGQaG6OHYpMvr3EFu7XI2WCYTJA35hQtinQ4AyKdqawb4nbXjjc0ovezMt8NgqE5zYpFW2YpkmbL12ppj3hs5HmGq1ky0_6q-9E1I2UMzESjcbF7uS5crWFiWV7HqZ_K6IbVonm58BsiRgOLFwzYUV83WB4UoOsqSs3Vysce2e6PbRy5184canJlANF8pAjld8RuxSIoGWpoytY38woGJ7nQmmG1k1YtS_CA4iDJMGLYTPq1d_CKNGQL',
                            },
                            {
                                alt: 'Coventry University',
                                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuHxxR4mydfhQCrTHhBB5OR8bnt1KQfvwfDj09m_Khvg_LKH6hgfDa-uDm52GfbVVwEqlLdZ_6izwA9NsBJQbXpo7tlGQpGOfiZd76OWolGLt8-23FNy6d9Mc9VdB-uY35DVpHDutXe30YR7yrBqUAC_he2soHYmzC9NGkcn-tCu-gDEJ7kjxXaimlb7ShwSUkM_rOIYq3rSw3KNrQAXVq502q8xZC8-gpfQojYFbsujoCJhLbfU5PCE4IhV4W9qsMs5AwFdZonUCI',
                            },
                            {
                                alt: 'Oxford Brookes University',
                                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Y7uTsFvOEJze7KOc6Y0odzLzQ2nPPfYIaLKCT0z9lDR21cOq8P07x7O4ya1jWzszk0r36yq-tpIKqFvPkhpZTC3V2y9xpC8rZ5lTBLxAU_vu0rTOYUDCbsh9XbdqC_ardazFDdnA4aVemX8Zt6r_nP0XlhA-hFCIhulFt-gl7e4LLvsIXw5qRtvR8juE3P0GHehCWqN0dCcZzHAyiUxsSo2mLbqoXu7bHIKAottXqzTitYzPTVD77opnn8YbQ5vQVneC7GieUto6',
                            },
                            {
                                alt: 'BPP University',
                                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvOhBymIPQDWQnjNoxXTgaANxK3qpnResGZpSYqEjJidqI5QSMLq42cz7ml_oZcGMmWFvZMxlo-jd96-BE6sDNpc_gQxQBROA1AYxqPdcyef16Foc3sFix5DiZp-AUlgxWUDIA9lzcygiafJa4jHR-5gd5zqD6_CkNI8L0UMQeq0uxcWsvuJBxG9Bzcam4Y_TROcdH14mfctsYOkW0xoKgwnSJ9emy_XdU_fW3W4L6XLcBAYez2DgkAtfcHszYIm7x88_n5ce3IpZT',
                            },
                        ].map((partner) => (
                            <img
                                key={partner.alt}
                                className="h-10 object-contain opacity-55 grayscale hover:opacity-85 hover:grayscale-0 transition-all duration-300"
                                alt={partner.alt}
                                src={partner.src}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Who We Are */}
            <section className="py-28 bg-[#131313] relative overflow-hidden">
                <div className="glow-orb blob-a w-[600px] h-[600px] bg-[#1a3172] opacity-[0.08] -right-32 top-0 rounded-full"></div>
                <div className="glow-orb blob-d w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.05] -left-40 bottom-10 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative reveal">
                            <div className="relative rounded-lg overflow-hidden aspect-[4/5]">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Education consultant meeting with an international student in a London office"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoMUPye57nJmFy3zjH8y-hcY_tT3BlWbKPOPRLVz6t1HusizrkmNxHbl8L934h-0UiBQLeTVjN2Msm-KEEa33q1rQBelC3GuRHbsskODWeBLJnTI-HbwzgkLSdgN5B45zYrqMj9m9E0t7ekKxgWmfvi4XPdVAsAyQQgJBfKf4pOCk66FxadKDbSHnQXlbcamKgkekb8EIBq2P4FGMks4cuEXOZQ2hmNmkFHNLmjql-waI3atmKpHz0HJsrOQxmS-0mSaY5vtWtMHNC"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/50 via-transparent to-transparent"></div>
                            </div>
                            <div className="absolute -bottom-6 -right-4 glass-card rounded-xl p-5 w-52 shadow-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-secondary-container text-2xl">verified</span>
                                    <span className="text-white font-bold text-sm font-headline">Lorem Ipsum</span>
                                </div>
                                <p className="text-on-surface-variant text-xs leading-relaxed">British Council certified agent. Fully compliant.</p>
                            </div>
                            <div className="absolute -top-5 -left-4 glass-card rounded-xl p-4 shadow-2xl">
                                <div className="text-4xl font-headline font-black text-white">98%</div>
                                <div className="text-on-surface-variant text-xs font-label uppercase tracking-wider mt-0.5">lorem ipsum</div>
                            </div>
                        </div>
                        <div className="reveal reveal-d1">
                            <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-5 text-xs uppercase">WHO WE ARE</p>
                            <h2 className="text-white font-headline font-bold text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight mb-8">
                                We believe every student deserves a world-class education.
                            </h2>
                            <p className="text-on-surface-variant text-lg leading-relaxed mb-5 font-body">
                                Smart Move Education Group is a specialist UK university placement service based in London. We work closely with international students at every
                                stage from choosing the right course to landing at Heathrow.
                            </p>
                            <p className="text-on-surface-variant leading-relaxed mb-10 font-body text-base">
                                Our team of experienced education consultants has guided over 500 students from more than 15 countries into prestigious UK programmes. We are not
                                just an agency we are partners in your academic journey.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="bg-surface-container-low rounded-xl p-5">
                                    <span className="material-symbols-outlined text-[#bcc2ff] text-2xl mb-3 block">groups</span>
                                    <div className="text-white font-bold font-headline mb-1">Expert Team</div>
                                    <div className="text-on-surface-variant text-sm">3 dedicated consultants, all UK-educated</div>
                                </div>
                                <div className="bg-surface-container-low rounded-xl p-5">
                                    <span className="material-symbols-outlined text-tertiary text-2xl mb-3 block">workspace_premium</span>
                                    <div className="text-white font-bold font-headline mb-1">Accredited</div>
                                    <div className="text-on-surface-variant text-sm">British Council certified since 2018</div>
                                </div>
                            </div>
                            <a className="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline group" href="#">
                                Learn more about us{' '}
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Courses */}
            <section className="py-28 bg-surface-container-low relative overflow-hidden" id="courses">
                <div className="glow-orb blob-b w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.07] -left-20 bottom-0 rounded-full"></div>
                <div className="glow-orb blob-c w-[450px] h-[450px] bg-[#1a3172] opacity-[0.05] right-0 top-20 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                        <div className="reveal">
                            <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">OUR PROGRAMMES</p>
                            <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight leading-[1.1]">Find Your Course.</h2>
                        </div>
                        <div className="flex flex-wrap gap-2 reveal reveal-d1">
                            <button type="button" className="bg-secondary-container text-on-secondary px-5 py-2 rounded-full font-bold text-xs font-label">
                                All
                            </button>
                            {['Postgraduate', 'Undergraduate', 'Foundation'].map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    className="bg-surface-container-highest text-white/60 px-5 py-2 rounded-full font-bold text-xs font-label hover:text-white transition-colors"
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <a
                                key={course.title}
                                href="#"
                                className={`group relative bg-surface-container-high rounded-lg overflow-hidden flex flex-col md:flex-row ${course.shadow} transition-all duration-300 course-card-line block reveal ${course.revealDelay}`}
                            >
                                <div className="md:w-64 h-52 md:h-auto overflow-hidden flex-shrink-0">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt={course.imageAlt}
                                        src={course.image}
                                    />
                                </div>
                                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`${course.tagClass} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-label`}>
                                                {course.tag}
                                            </span>
                                            <span className="text-on-surface-variant text-xs font-label">{course.duration}</span>
                                        </div>
                                        <h3 className={`text-white font-headline font-bold text-2xl mb-3 ${course.hoverClass} transition-colors`}>{course.title}</h3>
                                        <p className="text-on-surface-variant text-sm leading-relaxed max-w-xl">{course.description}</p>
                                    </div>
                                    <div className={`flex items-center gap-2 mt-6 ${course.linkClass} font-bold text-sm font-headline`}>
                                        View course{' '}
                                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="mt-10 flex justify-center reveal">
                        <a
                            className="inline-flex items-center gap-2 border border-outline-variant/30 text-white/70 hover:text-white hover:border-outline-variant/60 px-8 py-3 rounded-full font-headline font-semibold text-sm transition-all"
                            href="#"
                        >
                            Browse All 40+ Courses{' '}
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Study Destinations */}
            <section className="py-28 relative overflow-hidden bg-[#131313]">
                <div className="glow-orb blob-c w-[500px] h-[500px] bg-[#50ddb8] opacity-[0.07] -right-20 top-32 rounded-full"></div>
                <div className="glow-orb blob-a w-[400px] h-[400px] bg-[#00b4e0] opacity-[0.05] -left-20 bottom-0 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="mb-14 reveal">
                        <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">STUDY DESTINATIONS</p>
                        <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">Choose Your City.</h2>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="w-full lg:w-56 flex lg:flex-col overflow-x-auto no-scrollbar gap-1.5 flex-shrink-0 reveal">
                            {cities.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setActiveCity(c)}
                                    className={`px-5 py-4 rounded-xl text-left font-headline font-bold text-base flex items-center justify-between transition-all capitalize ${
                                        activeCity === c
                                            ? 'bg-surface-container-high text-white border-l-[3px] border-secondary-container'
                                            : 'text-white/50 hover:bg-surface-container-low hover:text-white/80'
                                    }`}
                                >
                                    {c.charAt(0).toUpperCase() + c.slice(1)}
                                    <span
                                        className="material-symbols-outlined text-[18px] text-secondary-container"
                                        style={{ opacity: activeCity === c ? 1 : 0 }}
                                    >
                                        arrow_forward
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 reveal reveal-d1">
                            <div className="bg-surface-container-low rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl">
                                <div className="md:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                                    <h3 className="text-3xl font-headline font-bold text-white mb-5">
                                        Study in <span className="text-gradient-gold">{city.title}</span>
                                    </h3>
                                    <p className="text-on-surface-variant leading-relaxed mb-5 text-sm">{city.description}</p>
                                    <ul className="space-y-2 mb-8 text-sm text-on-surface-variant">
                                        {city.points.map((point) => (
                                            <li key={point} className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        className="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline text-sm group"
                                        href="#"
                                    >
                                        {city.linkLabel}{' '}
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </a>
                                </div>
                                <div className="md:w-1/2 h-72 md:h-auto">
                                    {city.image ? (
                                        <img className="w-full h-full object-cover" alt={city.imageAlt!} src={city.image} />
                                    ) : (
                                        <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                                            <span className="material-symbols-outlined text-6xl text-on-surface-variant/20">{city.placeholderIcon}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How We Help */}
            <section className="py-28 bg-surface-container-low relative overflow-hidden">
                <div className="glow-orb blob-a w-[400px] h-[400px] bg-[#1a3172] opacity-[0.09] right-0 bottom-0 rounded-full"></div>
                <div className="glow-orb blob-d w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.05] -left-20 top-0 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="text-center mb-16 reveal">
                        <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">HOW WE HELP</p>
                        <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">From Enquiry to Enrolment.</h2>
                        <p className="text-on-surface-variant text-lg mt-4 max-w-xl mx-auto">A fully guided experience at every step of your UK university journey.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                        {[
                            {
                                icon: 'school',
                                iconColor: 'text-[#bcc2ff]',
                                bgIcon: 'bg-primary-container/20',
                                bgCorner: 'bg-primary-container/10 group-hover:bg-primary-container/20',
                                shadow: 'hover:shadow-[0_0_40px_rgba(188,194,255,.06)]',
                                ring: '',
                                step: 'Step 01',
                                title: 'Course Selection',
                                desc: 'Our consultants analyse your background, grades and goals to match you with the right programme and university with zero pressure.',
                                delay: '',
                            },
                            {
                                icon: 'description',
                                iconColor: 'text-secondary-container',
                                bgIcon: 'bg-secondary-container/20',
                                bgCorner: 'bg-secondary-container/10 group-hover:bg-secondary-container/20',
                                shadow: 'hover:shadow-[0_0_40px_rgba(239,165,0,.08)]',
                                ring: 'ring-1 ring-secondary-container/20',
                                step: 'Step 02',
                                title: 'Application Support',
                                desc: 'Personal statement reviews, document verification and direct liaison with universities to ensure a seamless and successful application every time.',
                                delay: 'reveal-d1',
                            },
                            {
                                icon: 'flight_takeoff',
                                iconColor: 'text-tertiary',
                                bgIcon: 'bg-tertiary-container/20',
                                bgCorner: 'bg-tertiary-container/10 group-hover:bg-tertiary-container/20',
                                shadow: 'hover:shadow-[0_0_40px_rgba(80,221,184,.06)]',
                                ring: '',
                                step: 'Step 03',
                                title: 'Life in the UK',
                                desc: 'Visa guidance, accommodation finding, pre-departure briefings and ongoing student support once you arrive in the UK.',
                                delay: 'reveal-d2',
                            },
                        ].map((step) => (
                            <div
                                key={step.title}
                                className={`bg-[#131313] rounded-lg p-8 relative overflow-hidden group ${step.shadow} transition-all reveal ${step.delay} ${step.ring}`}
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 ${step.bgCorner} rounded-bl-full transition-colors`}></div>
                                <div className={`w-12 h-12 rounded-xl ${step.bgIcon} flex items-center justify-center mb-6`}>
                                    <span className={`material-symbols-outlined ${step.iconColor}`}>{step.icon}</span>
                                </div>
                                <div className="text-secondary-container font-label font-bold text-[10px] uppercase tracking-widest mb-3">{step.step}</div>
                                <h3 className="text-white font-headline font-bold text-xl mb-4">{step.title}</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
                        {[
                            { stat: '500+', label: 'Students Placed' },
                            { stat: '20+', label: 'University Partners' },
                            { stat: '98%', label: 'Lorem ipsum' },
                            { stat: '15+', label: 'Countries Served' },
                        ].map((item) => (
                            <div key={item.label} className="bg-[#131313]/50 rounded-xl p-6 text-center">
                                <div className="text-5xl font-headline font-extrabold text-white mb-2">{item.stat}</div>
                                <div className="text-on-surface-variant font-label tracking-widest text-[10px] uppercase">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-28 bg-[#131313] relative overflow-hidden">
                <div className="glow-orb blob-b w-[600px] h-[600px] bg-[#00b4e0] opacity-[0.06] left-1/2 -translate-x-1/2 -bottom-40 rounded-full"></div>
                <div className="glow-orb blob-c w-[400px] h-[400px] bg-[#1a3172] opacity-[0.05] -right-20 top-10 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
                        <div className="reveal">
                            <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">STUDENT STORIES</p>
                            <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">What Our Students Say.</h2>
                        </div>
                        <div className="flex items-center gap-2 mt-4 reveal reveal-d1">
                            <div className="flex gap-0.5">
                                {[...Array(4)].map((_, i) => (
                                    <StarFilled key={i} />
                                ))}
                                <span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star_half
                                </span>
                            </div>
                            <span className="text-white/60 text-sm font-bold">4.8 on Trustpilot</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-surface-container-low rounded-lg p-8 flex flex-col gap-5 hover:shadow-[0_0_30px_rgba(188,194,255,.05)] transition-all reveal">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <StarFilled key={i} />
                                ))}
                            </div>
                            <p className="text-white/85 leading-relaxed italic flex-1">
                                "Smart Move made my dream of studying in London a reality. The process was transparent and so much easier than I ever expected. I couldn't have
                                done it without them."
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-container/60 to-surface-container-highest flex items-center justify-center text-white font-bold text-sm font-headline">
                                    AO
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Amara Okafor</p>
                                    <p className="text-on-surface-variant text-xs">MSc Data Science - Coventry University</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary-container/10 ring-1 ring-secondary-container/20 rounded-lg p-8 flex flex-col gap-5 shadow-[0_0_40px_rgba(239,165,0,.08)] reveal reveal-d1">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <StarFilled key={i} />
                                ))}
                            </div>
                            <p className="text-white leading-relaxed italic flex-1">
                                "The visa support was outstanding. The team handled everything professionally. My consultant was available whenever I needed guidance, even outside
                                of office hours."
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-secondary-container/20">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-container/50 to-surface-container-highest flex items-center justify-center text-on-secondary font-bold text-sm font-headline">
                                    RK
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Rajesh Kumar</p>
                                    <p className="text-on-surface-variant text-xs">MBA Graduate - Oxford Brookes</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-container-low rounded-lg p-8 flex flex-col gap-5 hover:shadow-[0_0_30px_rgba(80,221,184,.05)] transition-all reveal reveal-d2">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <StarFilled key={i} />
                                ))}
                            </div>
                            <p className="text-white/85 leading-relaxed italic flex-1">
                                "Highly recommend Smart Move. They genuinely listen to your needs and find the right fit. I'm now doing my BSc Finance and absolutely loving
                                every moment of London life."
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tertiary-container/60 to-surface-container-highest flex items-center justify-center text-white font-bold text-sm font-headline">
                                    SA
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Siti Aminah</p>
                                    <p className="text-on-surface-variant text-xs">BSc Finance - BPP University</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-28 bg-surface-container-low relative overflow-hidden">
                <div className="glow-orb blob-d w-[500px] h-[500px] bg-[#1a3172] opacity-[0.06] -right-20 top-0 rounded-full"></div>
                <div className="glow-orb blob-b w-[400px] h-[400px] bg-[#50ddb8] opacity-[0.04] -left-20 bottom-0 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
                        <div className="reveal">
                            <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">WHAT'S ON</p>
                            <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">Upcoming Events.</h2>
                        </div>
                        <a className="text-[#bcc2ff] font-bold text-sm hover:underline mt-4 reveal reveal-d1" href="#">
                            See all events
                        </a>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                month: 'Apr',
                                day: '02',
                                badge: 'Online',
                                badgeClass: 'text-[#bcc2ff] bg-[#bcc2ff]/10',
                                title: 'Open Information Session: Postgraduate Degrees',
                                time: '6:00-7:00 PM BST',
                                location: 'Zoom Webinar',
                                locIcon: 'videocam',
                                delay: '',
                            },
                            {
                                month: 'Apr',
                                day: '08',
                                badge: 'In-Person',
                                badgeClass: 'text-tertiary bg-tertiary/10',
                                title: "Bachelor's Open Day - London Campus Visit",
                                time: '11:30 AM-3:30 PM BST',
                                location: 'Central London',
                                locIcon: 'location_on',
                                delay: 'reveal-d1',
                            },
                            {
                                month: 'Apr',
                                day: '15',
                                badge: 'Online',
                                badgeClass: 'text-[#bcc2ff] bg-[#bcc2ff]/10',
                                title: 'UK Student Visa Masterclass - Step by Step Guide',
                                time: '5:00-6:00 PM BST',
                                location: 'Zoom Webinar',
                                locIcon: 'videocam',
                                delay: 'reveal-d2',
                            },
                        ].map((event) => (
                            <div
                                key={event.day + event.title}
                                className={`group bg-[#131313] rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:ring-1 hover:ring-white/10 transition-all reveal ${event.delay}`}
                            >
                                <div className="flex flex-col md:flex-row gap-5 md:items-center flex-1">
                                    <div className="w-14 h-14 bg-secondary-container/10 border border-secondary-container/20 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                        <span className="text-secondary-container font-label font-bold text-[10px] uppercase">{event.month}</span>
                                        <span className="text-white font-headline font-extrabold text-xl leading-none">{event.day}</span>
                                    </div>
                                    <div>
                                        <span className={`text-[10px] font-label font-bold uppercase tracking-widest ${event.badgeClass} px-2.5 py-0.5 rounded-full`}>
                                            {event.badge}
                                        </span>
                                        <h3 className="text-white font-headline font-bold text-lg mt-1 group-hover:text-secondary-container transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-on-surface-variant text-xs font-label">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[13px]">schedule</span>
                                                {event.time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[13px]">{event.locIcon}</span>
                                                {event.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="shrink-0 inline-flex items-center gap-2 border border-outline-variant/30 text-white/70 hover:text-white hover:border-secondary-container/40 px-5 py-2.5 rounded-full text-sm font-bold font-headline transition-all"
                                >
                                    Register <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog */}
            <section className="py-28 bg-[#131313] relative overflow-hidden">
                <div className="glow-orb blob-a w-[550px] h-[550px] bg-[#00b4e0] opacity-[0.05] -left-20 top-0 rounded-full"></div>
                <div className="glow-orb blob-c w-[400px] h-[400px] bg-[#1a3172] opacity-[0.05] -right-20 bottom-0 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
                        <div className="reveal">
                            <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">LATEST UPDATES</p>
                            <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">From Our Blog.</h2>
                        </div>
                        <a className="text-[#bcc2ff] font-bold text-sm hover:underline mt-4 reveal reveal-d1" href="#">
                            View all posts
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKeKDbjQ6X5q9gPZ7NPz-Nnzi8NatXwuLWEWusQYbLw1riIaFIYs4VdJNlGuUzCd_gGBi7dFxpf8YRMCBWyhX6wPenYKSywRCD5RZH2Od84_fQtxgLUfL4Vq3WO7bwO9H0uElj8bIQhj49LnMRE-jST-pJeLBGuH1zUqsHiu2Dw2VC2s2l2kpA0goBR6jAcFO0AXflbffdm_GUsWkvIfe2aUKygk9Orf9WiPQWZT0A_tPq0_vvpsIhGSxggKB2p6iJ8pwlWJLsB6Lc',
                                imgAlt: 'Students celebrating graduation at a UK university lawn',
                                badge: 'Visa Guide',
                                date: 'March 20, 2026',
                                title: 'Everything You Need to Know About the Graduate Visa Route',
                                desc: 'Stay ahead with the latest immigration updates for international students wishing to stay and work in the UK after graduation.',
                                delay: '',
                            },
                            {
                                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWymeQnXQLF2mBnB3u9sFSlAx26NV-SAupNiggwx_YOldxKP2QbhopkkwYdRlfNK6-5fUeBxxM-Zz4HT1WoQRRW3nqvF9pBGJfw9Io17LpomCxWxRv-vTSUVNHIhWxl7tm8Q9cuRI35Uabm1TZlXjtf1L5Of6RLfcmWoaJhEXJLJKyPK3GFjL86UWsOYO64xJGg0sZY3vwGWrMD0fwjxwm_YMukiWWha5XnLh0jUhyFqIcKCEQZiwcG_2kSwipYD9rgiOQXvFTWZUl',
                                imgAlt: 'Modern university library interior',
                                badge: 'Scholarships',
                                date: 'March 14, 2026',
                                title: 'Top 5 UK Scholarships for International Students in 2026',
                                desc: 'Discover the most prestigious scholarship opportunities available to international students applying to UK universities this year.',
                                delay: 'reveal-d1',
                            },
                            {
                                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSqo2W_O8lTfiP64hOYVR_ZgiD--tggce3xPQEsbU0OTYO26Z4ujyaF1xbOCFZVm67bSl7YYjKUkHkrYctsY8Uxqg9TiJYhnqnASc5y469EkOognZ-VZm9hmascRhoY0HfbSgXOWPXBtTBcSIoanpp_TycouoXFAn2TSvwnNmx9KbNcxAB8gMj1BSL4xvb0PUlJs_f3SYjB3DZI_kut630O8AHZiH19R6wGq52ayKD_SRYrL-gzOe_uN855B3MePFjfggOgGSXyy1A',
                                imgAlt: 'Diverse students laughing in a city street',
                                badge: 'Student Life',
                                date: 'March 8, 2026',
                                title: 'How to Manage Your Budget While Studying in the UK',
                                desc: 'Practical tips on food, transport and leisure to help international students thrive financially in major UK cities.',
                                delay: 'reveal-d2',
                            },
                        ].map((post) => (
                            <article key={post.title} className={`group reveal ${post.delay}`}>
                                <div className="h-52 rounded-lg overflow-hidden mb-5 relative">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        alt={post.imgAlt}
                                        src={post.img}
                                    />
                                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-label">
                                        {post.badge}
                                    </span>
                                </div>
                                <p className="text-on-surface-variant text-xs font-label mb-2">{post.date}</p>
                                <h3 className="text-white font-headline font-bold text-xl mb-3 leading-snug group-hover:text-secondary-container transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{post.desc}</p>
                                <a className="inline-flex items-center gap-1.5 text-secondary-container font-bold text-sm font-headline group/link" href="#">
                                    Read Article{' '}
                                    <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 bg-surface-container-low relative overflow-hidden">
                <div className="glow-orb blob-b w-[600px] h-[600px] bg-[#00b4e0] opacity-[0.08] -right-32 -top-20 rounded-full"></div>
                <div className="glow-orb blob-a w-[400px] h-[400px] bg-[#1a3172] opacity-[0.07] -left-20 bottom-0 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-3xl text-center relative z-10 reveal">
                    <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">STAY INFORMED</p>
                    <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">Don't miss an update.</h2>
                    <p className="text-on-surface-variant text-lg mb-8 max-w-lg mx-auto">
                        Get intake dates, scholarship news, visa updates and student success stories delivered to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 bg-surface-container-high text-white placeholder-on-surface-variant/50 px-5 py-3.5 rounded-full border border-outline-variant/30 focus:border-secondary-container focus:outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all text-sm font-body"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-secondary-container text-on-secondary px-7 py-3.5 rounded-full font-headline font-bold text-sm hover:scale-105 transition-transform whitespace-nowrap shadow-lg shadow-secondary-container/20"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-on-surface-variant/40 text-xs font-label mt-4">No spam. Unsubscribe at any time.</p>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden bg-[#131313]">
                <div className="glow-orb blob-c w-[800px] h-[800px] bg-secondary-container opacity-[0.08] -bottom-60 left-1/2 -translate-x-1/2 rounded-full"></div>
                <div className="glow-orb blob-a w-[400px] h-[400px] bg-primary-container opacity-[0.09] -top-10 -right-20 rounded-full"></div>
                <div className="container mx-auto px-6 lg:px-10 max-w-5xl text-center relative z-10 reveal">
                    <p className="font-label text-secondary-container font-bold tracking-[0.2em] mb-5 text-xs uppercase">BE PART OF THE STORY</p>
                    <h2 className="text-white font-headline font-black text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] mb-6">
                        Ready to Take
                        <br />
                        <span className="text-gradient-gold">the Next Step?</span>
                    </h2>
                    <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Speak to one of our expert consultants today and start your application for the March 2026 intake. Places are limited.
                    </p>
                    <div className="flex flex-wrap justify-center gap-5 mb-20">
                        <a
                            className="bg-secondary-container text-on-secondary px-10 py-4 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-secondary-container/20 flex items-center gap-2"
                            href="#"
                        >
                            Start Application <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </a>
                        <a
                            className="border border-outline-variant/30 text-white px-10 py-4 rounded-full font-headline font-bold text-lg hover:bg-white/5 hover:border-outline-variant/60 transition-all flex items-center gap-2"
                            href="#"
                        >
                            <span className="material-symbols-outlined text-[20px]">call</span>Speak to a Consultant
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm font-label tracking-wide">
                        <div className="flex flex-col items-center gap-2 text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary-container text-2xl">location_on</span>
                            <span>London, United Kingdom</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary-container text-2xl">mail</span>
                            <a href="mailto:info@smartmove.org" className="hover:text-white transition-colors">
                                info@smartmove.org
                            </a>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary-container text-2xl">call</span>
                            <a href="tel:+442077909233" className="hover:text-white transition-colors">
                                020 7790 9233
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}

Welcome.layout = null;
