import SiteLayout from '@/layouts/site-layout';

const values = [
    {
        key: 'Strive',
        description: 'We deliver the best possible outcomes for our clients and take pride in our work built on quality and integrity.',
        icon: 'trending_up',
    },
    {
        key: 'Integrity',
        description: 'We communicate openly, honestly and respectfully.',
        icon: 'verified',
    },
    {
        key: 'Bold',
        description: 'We embrace change to help our clients and colleagues.',
        icon: 'bolt',
    },
    {
        key: 'Responsibility',
        description: 'We are committed to our communities.',
        icon: 'handshake',
    },
    {
        key: 'Professionalism',
        description: 'Pursue excellence for our clients and colleagues.',
        icon: 'workspace_premium',
    },
    {
        key: 'Team Work',
        description:
            'Take initiative and ownership. Be ambitious and create your own opportunities. Work smart, work hard. Be a team player, collaborate, have fun.',
        icon: 'groups',
    },
];

const whyChooseUs = [
    'British Council Certified counsellor',
    'UCAS Registered Centre',
    '100% FREE consultation',
    'Visa support and assistance for International Students',
    'Free eligibility check to study in UK',
    "A review of student's personal statement",
    'A list of recommended universities and courses',
];

export default function About() {
    return (
        <SiteLayout title="About Us | Smart Move Education Group" activePage="about">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-20">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="glow-orb blob-a absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#00b4e0]/10" />
                    <div className="glow-orb blob-b absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-[#efa500]/8" />
                </div>
                <div className="relative z-10 container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-label font-bold tracking-widest uppercase bg-secondary-container/15 text-secondary-container mb-6">
                                About Smart Move
                            </span>
                            <h1 className="text-4xl lg:text-6xl font-headline font-bold text-white leading-tight mb-6">
                                Your Trusted{' '}
                                <span className="text-gradient-gold">Education Partner</span>
                            </h1>
                            <p className="text-[#a09a97] font-body text-lg leading-relaxed mb-8">
                                Smart Move Education Group is a student recruitment consultancy based in London who offers support for those looking to get
                                into education. We understand the difficulties that come with the admission process and aim to help every student that walks
                                through our doors.
                            </p>
                            <p className="text-[#a09a97] font-body text-base leading-relaxed">
                                Whether it be choosing a course, an institution, starting an application or simply understanding the requirements, we offer
                                our services to simplify the process. We have been successful in recruiting home and international students from diverse
                                backgrounds, enrolling them to suitable universities that meet their personal and individual needs.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                                <img
                                    src="https://smartmove-eg.com/wp-content/uploads/2020/11/Homework-students-HD-picture.jpg"
                                    alt="Students studying"
                                    className="w-full h-[420px] object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 glass-card rounded-xl px-5 py-4 flex items-center gap-3 shadow-lg">
                                <span className="material-symbols-outlined text-secondary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    verified
                                </span>
                                <div>
                                    <p className="text-white text-sm font-headline font-semibold">UCAS Registered Centre</p>
                                    <p className="text-[#a09a97] text-xs">British Council Certified</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="py-12 border-y border-white/[0.06]">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: '100%', label: 'Free Consultation' },
                            { value: '500+', label: 'Students Placed' },
                            { value: '50+', label: 'Partner Universities' },
                            { value: '5+', label: 'UK Cities Covered' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center reveal">
                                <p className="text-4xl font-headline font-bold text-gradient-gold mb-2">{stat.value}</p>
                                <p className="text-[#a09a97] text-sm font-body">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="text-center mb-16 reveal">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-label font-bold tracking-widest uppercase bg-secondary-container/15 text-secondary-container mb-4">
                            What We Stand For
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white mb-4">Our Values</h2>
                        <p className="text-[#a09a97] font-body text-base max-w-2xl mx-auto">
                            Values help us ensure that all our employees are working towards the same goals. Our core values support the company's vision and
                            shape its culture.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, i) => (
                            <div
                                key={value.key}
                                className={`glass-card rounded-xl p-6 hover:border-secondary-container/30 transition-all duration-300 hover:-translate-y-1 reveal ${i % 3 === 1 ? 'reveal-d1' : i % 3 === 2 ? 'reveal-d2' : ''}`}
                            >
                                <div className="w-10 h-10 rounded-lg bg-secondary-container/15 flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-secondary-container text-xl">{value.icon}</span>
                                </div>
                                <h3 className="text-white font-headline font-bold text-lg mb-2">{value.key}</h3>
                                <p className="text-[#a09a97] font-body text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Smart Move */}
            <section className="py-24 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <div className="glow-orb blob-c absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00b4e0]/8" />
                </div>
                <div className="relative z-10 container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                                <img
                                    src="https://smartmove-eg.com/wp-content/uploads/2021/09/female-student-holding-her-books-1024x683.jpg"
                                    alt="Female student holding books"
                                    className="w-full h-[460px] object-cover"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 reveal">
                            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-label font-bold tracking-widest uppercase bg-secondary-container/15 text-secondary-container mb-6">
                                Our Advantage
                            </span>
                            <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white leading-tight mb-8">
                                Why Choose <span className="text-gradient-gold">Smart Move</span>
                            </h2>
                            <ul className="space-y-4">
                                {whyChooseUs.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span
                                            className="material-symbols-outlined text-secondary-container text-xl mt-0.5 shrink-0"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            check_circle
                                        </span>
                                        <span className="text-[#a09a97] font-body text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact / Offices Section */}
            <section className="py-24 border-t border-white/[0.06]">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="text-center mb-16 reveal">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-label font-bold tracking-widest uppercase bg-secondary-container/15 text-secondary-container mb-4">
                            Get In Touch
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white mb-4">Our Offices</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <div className="glass-card rounded-xl p-8 reveal">
                            <div className="w-10 h-10 rounded-lg bg-secondary-container/15 flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-secondary-container text-xl">location_on</span>
                            </div>
                            <h3 className="text-white font-headline font-bold text-lg mb-2">London Office</h3>
                            <p className="text-[#a09a97] font-body text-sm leading-relaxed mb-4">
                                1st Floor, Botanical Works
                                <br />2 Jubilee Street
                                <br />
                                London, E1 3FU
                            </p>
                            <div className="space-y-2">
                                <a
                                    href="mailto:info@smartmove-eg.com"
                                    className="flex items-center gap-2 text-secondary-container text-sm hover:underline"
                                >
                                    <span className="material-symbols-outlined text-base">mail</span>
                                    info@smartmove-eg.com
                                </a>
                                <a href="tel:02077909233" className="flex items-center gap-2 text-[#a09a97] text-sm hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-base">call</span>
                                    02077909233 / 07894867772
                                </a>
                            </div>
                        </div>
                        <div className="glass-card rounded-xl p-8 reveal reveal-d1 flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-secondary-container/15 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-secondary-container text-xl">location_city</span>
                                </div>
                                <h3 className="text-white font-headline font-bold text-lg mb-2">Birmingham Office</h3>
                                <p className="text-[#a09a97] font-body text-sm leading-relaxed">
                                    Visit our Birmingham office for in-person consultations. Get directions and book an appointment online.
                                </p>
                            </div>
                            <a
                                href="https://smartmove-eg.com/contact-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-headline font-semibold text-secondary-container hover:underline"
                            >
                                Get Directions <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 border-t border-white/[0.06]">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl text-center reveal">
                    <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-4">
                        Ready to Start Your <span className="text-gradient-gold">UK Journey?</span>
                    </h2>
                    <p className="text-[#a09a97] font-body text-base mb-8 max-w-xl mx-auto">
                        Book a free consultation with one of our expert counsellors and take the first step towards your UK education today.
                    </p>
                    <a
                        href="https://apply.smartmove-sm.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-secondary-container text-on-secondary font-headline font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_32px_rgba(239,165,0,0.3)]"
                    >
                        Apply Now <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </a>
                </div>
            </section>
        </SiteLayout>
    );
}
