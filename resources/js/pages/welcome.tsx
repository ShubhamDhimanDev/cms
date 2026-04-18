import SiteLayout from '@/layouts/site-layout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import * as publicEventRoutes from '@/routes/events';
import type { Event } from '@/types/cms';

const cities = ['london', 'manchester', 'birmingham', 'cardiff', 'swansea', 'leeds', 'nottingham', 'newcastle'] as const;
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
            "Study in one of the world’s most dynamic cities. From global business hubs to cultural landmarks, London offers unmatched career opportunities, networking potential, and a truly international student experience.",
        points: [],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRtLnMNAVkI-SmMTasEDqj49VEGstaQ0DFCWdxMJO4bzh_O5pG2_Ls4Wxl6VgXHZbZVTAEESfkcMai3RWbXpBUP6cratEc-9zQczS3qriN2a_ErgnzUGC5avpzADyT8anaJI_JonUZIXqRxjv_G_pD9pFg8Q4WUaZaujvMPTs7I5Tze6LXa3gA-zPXJSGGmCX24d3Tm_AFGswVLH9MmpqpO0_WynvRgG1GqYL6j7nMi3RRP-AFt8Zo4Hiz8kEpyrnrFOelZ_m26EEF',
        imageAlt: 'London skyline at dawn',
        placeholderIcon: 'location_on',
        linkLabel: 'Explore London courses',
    },
    manchester: {
        title: 'Manchester',
        description:
            'A city known for innovation and creativity, Manchester is a student favourite with a strong academic reputation and growing opportunities in business, tech, and the arts.',
        points: [],
        image: '/images/cities/manchester.jpg',
        imageAlt: 'Manchester city',
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Manchester courses',
    },
    birmingham: {
        title: 'Birmingham',
        description:
            "The UK’s second-largest city, Birmingham is a thriving centre for industry, diversity, and career growth—perfect for students looking to build strong professional connections.",
        points: [],
        image: '/images/cities/Birmingham.webp',
        imageAlt: 'Birmingham city',
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Birmingham courses',
    },
    cardiff: {
        title: 'Cardiff',
        description: "A welcoming capital city offering high-quality education, a vibrant student lifestyle, and excellent career prospects in a close-knit and supportive environment.",
        points: [],
        image: '/images/cities/Cardiff.jpg',
        imageAlt: 'Cardiff city',
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Cardiff courses',
    },
    swansea: {
        title: 'Swansea',
        description:
            "A beautiful coastal city combining outstanding education with a relaxed lifestyle—ideal for students seeking balance, community, and focus.",
        points: [],
        image: '/images/cities/Swansea.jpg',
        imageAlt: 'Swansea city',
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Swansea courses',
    },
    leeds: {
        title: 'Leeds',
        description:
            "One of the UK’s largest student cities, Leeds is known for its lively atmosphere, strong universities, and excellent opportunities in business, finance, and creative industries.",
        points: [],
        image: '/images/cities/Leeds.jpg',
        imageAlt: 'Leeds city',
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Leeds courses',
    },
    nottingham: {
        title: 'Nottingham',
        description:
            "A city rich in history and innovation, Nottingham offers a fantastic student experience with strong academic institutions and growing career pathways.",
        points: [],
        image: '/images/cities/Nottingham.jpg',
        imageAlt: 'Nottingham city',
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Nottingham courses',
    },
    newcastle: {
        title: 'Newcastle',
        description:
            "Famous for its friendly atmosphere and vibrant student life, Newcastle provides quality education alongside exciting opportunities in healthcare, engineering, and digital sectors.",
        points: [],
        image: '/images/cities/Newcastle.jpg',
        imageAlt: 'Newcastle city',
        placeholderIcon: 'location_city',
        linkLabel: 'Explore Newcastle courses',
    }
};

const courses = [
    {
        title: 'Business & Management',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1 Year Full-time',
        description:
            'Develop strategic leadership skills and business acumen. Intakes in September and January across multiple partner universities in London and Birmingham.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: '/images/course/bussiness-management.png',
        imageAlt: 'Business management course',
        revealDelay: '',
    },
    {
        title: 'Health & Social Care',
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
        title: 'Computing & IT',
        tag: 'Undergraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '3 Years Full-time',
        description:
            'Industry-integrated degree with placement year options. Covering AI, software engineering, cyber security and data science at leading UK tech universities.',
        hoverClass: 'group-hover:text-[#bcc2ff]',
        linkClass: 'text-[#bcc2ff]',
        shadow: 'hover:shadow-[0_4px_40px_rgba(188,194,255,.08)]',
        image: '/images/course/it-computing.jpeg',
        imageAlt: 'Computer science lab',
        revealDelay: 'reveal-d2',
    },
    {
        title: 'Law',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1-2 Years',
        description: 'Explore global policy, diplomacy and international law. Perfect for students aiming for careers in government, NGOs or international organisations.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: '/images/course/law.jpeg',
        imageAlt: 'International relations and policy',
        revealDelay: 'reveal-d3',
    },
      {
        title: 'Psychology',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1-2 Years',
        description: 'Explore global policy, diplomacy and international law. Perfect for students aiming for careers in government, NGOs or international organisations.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: '/images/course/psychology.png',
        imageAlt: 'Psychology course',
        revealDelay: 'reveal-d3',
    },
      {
        title: 'Digital Marketing',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1-2 Years',
        description: 'Explore global policy, diplomacy and international law. Perfect for students aiming for careers in government, NGOs or international organisations.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: '/images/course/digital-marketing.png',
        imageAlt: 'Digital marketing course',
        revealDelay: 'reveal-d3',
    },
      {
        title: 'Fashion',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1-2 Years',
        description: 'Explore global policy, diplomacy and international law. Perfect for students aiming for careers in government, NGOs or international organisations.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: '/images/course/fashion.png',
        imageAlt: 'Fashion course',
        revealDelay: 'reveal-d3',
    },
    {
        title: 'Music',
        tag: 'Postgraduate',
        tagClass: 'bg-primary-container/25 text-[#bcc2ff]',
        duration: '1-2 Years',
        description: 'Explore global policy, diplomacy and international law. Perfect for students aiming for careers in government, NGOs or international organisations.',
        hoverClass: 'group-hover:text-secondary-container',
        linkClass: 'text-secondary-container',
        shadow: 'hover:shadow-[0_4px_40px_rgba(239,165,0,.1)]',
        image: '/images/course/music.jpeg',
        imageAlt: 'Music course',
        revealDelay: 'reveal-d3',
    },
];

const StarFilled = () => (
    <span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
        star
    </span>
);

type WelcomeEvent = Pick<Event, 'id' | 'title' | 'type' | 'starts_at' | 'ends_at' | 'timezone' | 'location' | 'location_url'>;

type Props = {
    canRegister: boolean;
    upcomingEvents: WelcomeEvent[];
};

function formatEventDateParts(dateString: string, timezone?: string) {
    const date = new Date(dateString);

    return {
        month: date.toLocaleString('en-GB', {
            month: 'short',
            timeZone: timezone || 'UTC',
        }),
        day: date.toLocaleString('en-GB', {
            day: '2-digit',
            timeZone: timezone || 'UTC',
        }),
    };
}

function formatEventTimeRange(startsAt: string, endsAt: string | null, timezone?: string): string {
    const start = new Date(startsAt);
    const timeZone = timezone || 'UTC';
    const startTime = start.toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone,
    });

    if (!endsAt) {
        return `${startTime} ${timeZone}`;
    }

    const endTime = new Date(endsAt).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone,
    });

    return `${startTime}-${endTime} ${timeZone}`;
}

export default function Welcome({ upcomingEvents }: Props) {
    const [activeCity, setActiveCity] = useState<City>('london');

    const city = cityData[activeCity];

    return (
        <SiteLayout title="Smart Move Education Group | Your Journey to UK Degree" activePage="home">
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
                                <span className="text-[11px] font-label font-bold uppercase tracking-widest">June 2026 Intake Open</span>
                            </div>
                        </div>
                        <h1 className="font-headline font-black leading-[1.14] tracking-[-0.03em] overflow-visible pb-2">
                            <span className="text-white text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp">Your Journey to</span>
                            <span className="text-gradient-gold text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp-d1">UK Degree</span>
                            <span className="text-white text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp-d1">Starts Here.</span>
                        </h1>
                        <p className="text-white/75 text-lg md:text-xl xl:text-2xl leading-relaxed max-w-xl font-body mt-8 mb-10 animate-fadeUp-d2">
                            Empowering ambitious students to access top UK universities—guiding you from your first enquiry to the right course and a successful career.
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
                                <div className="text-3xl font-headline font-extrabold text-white leading-none">25000+</div>
                                <div className="text-white/50 text-xs font-label uppercase tracking-wider mt-1">Application Processed</div>
                            </div>
                            <div className="w-px bg-white/15"></div>
                            <div>
                                <div className="text-3xl font-headline font-extrabold text-white leading-none">50+</div>
                                <div className="text-white/50 text-xs font-label uppercase tracking-wider mt-1">Partner Institutions</div>
                            </div>
                            <div className="w-px bg-white/15"></div>
                            <div>
                                <div className="text-3xl font-headline font-extrabold text-white leading-none">100+</div>
                                <div className="text-white/50 text-xs font-label uppercase tracking-wider mt-1">Expert Consultants</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/30 lp-bounce">
                    <span className="text-[10px] font-label tracking-widest uppercase">Scroll</span>
                    <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </div>
            </header>


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
                                Turn your ambitions into achievements.
                            </h2>
                            <p className="text-on-surface-variant text-lg leading-relaxed mb-5 font-body">
                                Your journey matters to us. From your first enquiry to securing your place at the right university, we offer complete guidance every step of the way. Whether it’s choosing a course, preparing your application, or understanding entry requirements, we make the process simple and tailored to your future goals.
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
                            <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight leading-[1.1]">Choose Your <span className="text-gradient-gold">Course</span>, Build Your <span className="text-gradient-gold">Career</span></h2>
                        </div>
                        <div className="flex flex-wrap gap-2 reveal reveal-d1">
                            <button type="button" className="bg-secondary-container text-on-secondary px-5 py-2 rounded-full font-bold text-xs font-label">
                                All
                            </button>
                            {['Foundation', 'Certificate of Higher Education (CertHE)', 'Bachelor’s Degrees', 'Master’s Degrees'].map((f) => (
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
                            Browse All Course Areas{' '}
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
                        <h2 className="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">Study in the UK’s <span className="text-gradient-gold">Leading Cities</span></h2>
                        <p className="text-on-surface-variant text-lg mt-4">We work with top universities across the UK’s most vibrant and opportunity-filled cities. Wherever you choose to study, you’ll gain access to world-class education, diverse cultures, and exciting career prospects.</p>
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
                                title: 'Expert Guidance',
                                desc: 'Our experienced consultants are here to simplify your journey. From choosing the right course and university to managing applications and requirements, we provide personalised, end-to-end support—helping you secure the best path for your future.',
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
                        {[
                            { stat: '9500+', label: 'Students Placed' },
                            { stat: '50+', label: 'Institutions' },
                            { stat: '100+', label: 'Expert Consultants' },
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
                        <Link className="text-[#bcc2ff] font-bold text-sm hover:underline mt-4 reveal reveal-d1" href={publicEventRoutes.index.url()}>
                            See all events
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {upcomingEvents.map((event, index) => {
                            const { month, day } = formatEventDateParts(event.starts_at, event.timezone);
                            const badgeClass = event.type === 'online' ? 'text-[#bcc2ff] bg-[#bcc2ff]/10' : 'text-tertiary bg-tertiary/10';
                            const badge = event.type === 'online' ? 'Online' : 'In-Person';
                            const locIcon = event.type === 'online' ? 'videocam' : 'location_on';
                            const delay = index === 0 ? '' : index === 1 ? 'reveal-d1' : 'reveal-d2';

                            return (
                            <div
                                key={event.id}
                                className={`group bg-[#131313] rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:ring-1 hover:ring-white/10 transition-all reveal ${delay}`}
                            >
                                <div className="flex flex-col md:flex-row gap-5 md:items-center flex-1">
                                    <div className="w-14 h-14 bg-secondary-container/10 border border-secondary-container/20 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                        <span className="text-secondary-container font-label font-bold text-[10px] uppercase">{month}</span>
                                        <span className="text-white font-headline font-extrabold text-xl leading-none">{day}</span>
                                    </div>
                                    <div>
                                        <span className={`text-[10px] font-label font-bold uppercase tracking-widest ${badgeClass} px-2.5 py-0.5 rounded-full`}>
                                            {badge}
                                        </span>
                                        <h3 className="text-white font-headline font-bold text-lg mt-1 group-hover:text-secondary-container transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-on-surface-variant text-xs font-label">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[13px]">schedule</span>
                                                {formatEventTimeRange(event.starts_at, event.ends_at, event.timezone)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[13px]">{locIcon}</span>
                                                {event.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={publicEventRoutes.show.url({ event: event.slug })}
                                    className="shrink-0 inline-flex items-center gap-2 border border-outline-variant/30 text-white/70 hover:text-white hover:border-secondary-container/40 px-5 py-2.5 rounded-full text-sm font-bold font-headline transition-all"
                                >
                                    Register <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                            </div>
                        );
                        })}
                        {upcomingEvents.length === 0 && (
                            <div className="bg-[#131313] rounded-lg p-8 text-center text-on-surface-variant">
                                New events will be announced soon.
                            </div>
                        )}
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
                        Speak to one of our expert consultants today and start your application for the June 2026 intake. Places are limited.
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
