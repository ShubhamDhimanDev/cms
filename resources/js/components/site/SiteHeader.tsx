import { useState } from 'react';

const logo = '/images/smartmove_logo.png';

export default function SiteHeader({ activePage = 'home' }: { activePage?: string }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Announcement Bar */}
            <div className="w-full bg-secondary-container text-on-secondary py-2.5 px-4 flex items-center justify-center gap-3 text-xs font-label font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-on-secondary/60 animate-pulse inline-block"></span>
                <span>
                    June 2026 Intake is Now Open !{' '}
                    <a href="#" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
                        Apply by 31st March
                    </a>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-on-secondary/60 animate-pulse inline-block"></span>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 glass border-b border-white/[0.06] w-full">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl flex items-center justify-between h-16">
                    <a href="/" className="flex items-center">
                        <img src={logo} alt="Smart Move Education Group" className="h-[38px] w-auto brightness-0 invert" />
                    </a>
                    <div className="hidden lg:flex items-center gap-8 text-sm font-headline font-semibold">
                        <a className={`nav-link ${activePage === 'home' ? 'active text-white' : 'text-white/60 hover:text-white transition-colors'}`} href="/">
                            Home
                        </a>
                        <a className={`nav-link ${activePage === 'about' ? 'active text-white' : 'text-white/60 hover:text-white transition-colors'}`} href="/about">
                            About Us
                        </a>
                        <div className="relative group/courses">
                            <button
                                type="button"
                                className="nav-link text-white/60 hover:text-white transition-colors flex items-center gap-1"
                            >
                                Courses{' '}
                                <span className="material-symbols-outlined text-[16px] transition-transform group-hover/courses:rotate-180 duration-200">
                                    expand_more
                                </span>
                            </button>
                            <div className="absolute top-full -left-48 pt-3 opacity-0 invisible group-hover/courses:opacity-100 group-hover/courses:visible transition-all duration-200 w-[820px] z-50">
                                <div
                                    className="rounded-sm p-8 shadow-[0_24px_64px_rgba(0,0,0,0.7)]"
                                    style={{ background: 'rgba(8,8,8,0.97)', border: '1px solid rgba(255,255,255,0.09)' }}
                                >
                                    <div className="grid grid-cols-3 gap-8">
                                        <div>
                                            <p className="font-label text-[10px] text-secondary-container mb-5 uppercase tracking-[.18em]">Programmes</p>
                                            <ul className="space-y-0 text-sm">
                                                {['Postgraduate Programs', 'Undergraduate Degrees', 'Foundation Courses', 'Top-up Degrees', 'Short Courses'].map(
                                                    (item, i) => (
                                                        <li key={item}>
                                                            <a
                                                                className={`text-white/55 hover:text-white hover:pl-2 transition-all block py-2 flex items-center gap-2 ${i < 4 ? 'border-b border-white/[0.05]' : ''}`}
                                                                href="#"
                                                            >
                                                                {item}
                                                            </a>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-label text-[10px] text-secondary-container mb-5 uppercase tracking-[.18em]">Study Destinations</p>
                                            <ul className="space-y-0 text-sm">
                                                {['London', 'Birmingham', 'Manchester', 'Leeds', 'Wales'].map((item, i) => (
                                                    <li key={item}>
                                                        <a
                                                            className={`text-white/55 hover:text-white hover:pl-2 transition-all block py-2 flex items-center gap-2 ${i < 4 ? 'border-b border-white/[0.05]' : ''}`}
                                                            href="#"
                                                        >
                                                            {item}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div
                                            className="rounded-sm p-5 flex flex-col justify-between"
                                            style={{ background: 'rgba(239,165,0,0.06)', border: '1px solid rgba(239,165,0,0.13)' }}
                                        >
                                            <div>
                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse inline-block mr-1.5"></span>
                                                <span className="text-[10px] font-label font-bold uppercase tracking-widest text-secondary-container">
                                                    June 2026 — Intake Open
                                                </span>
                                                <p className="font-headline font-bold text-white text-xl mt-3 leading-tight">Start Your UK Degree Journey</p>
                                                <p className="text-xs text-white/40 mt-2 leading-relaxed">
                                                    Applications closing soon. Secure your place at a world-class UK university today.
                                                </p>
                                                <div className="mt-4 flex gap-3 text-xs">
                                                    <div>
                                                        <div className="text-white font-bold font-headline text-lg leading-none">500+</div>
                                                        <div className="text-white/35 font-label uppercase tracking-wider text-[9px] mt-0.5">Placed</div>
                                                    </div>
                                                    <div className="w-px bg-white/10"></div>
                                                    <div>
                                                        <div className="text-white font-bold font-headline text-lg leading-none">98%</div>
                                                        <div className="text-white/35 font-label uppercase tracking-wider text-[9px] mt-0.5">rate</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a
                                                href="#"
                                                className="mt-5 bg-secondary-container text-on-secondary py-2.5 px-4 rounded-full text-xs font-bold w-fit hover:scale-105 transition-transform inline-block"
                                            >
                                                Apply Now &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className={`nav-link ${activePage === 'destinations' ? 'active text-white' : 'text-white/60 hover:text-white transition-colors'}`} href="#">
                            Destinations
                        </a>
                        <a className={`nav-link ${activePage === 'services' ? 'active text-white' : 'text-white/60 hover:text-white transition-colors'}`} href="#">
                            Services
                        </a>
                        <a className={`nav-link ${activePage === 'blog' ? 'active text-white' : 'text-white/60 hover:text-white transition-colors'}`} href="/blog">
                            Blog
                        </a>
                        <a className={`nav-link ${activePage === 'events' ? 'active text-white' : 'text-white/60 hover:text-white transition-colors'}`} href="/events">
                            Events
                        </a>
                        <a className={`nav-link ${activePage === 'contact' ? 'active text-white' : 'text-white/60 hover:text-white transition-colors'}`} href="/contact">
                            Contact
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            className="hidden lg:flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-semibold transition-colors"
                            href="tel:02077909233"
                        >
                            <span className="material-symbols-outlined text-[16px]">call</span>
                            <span>020 7790 9233</span>
                        </a>
                        <a
                            className="bg-secondary-container text-on-secondary px-5 py-2 rounded-full font-headline font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-lg shadow-secondary-container/20"
                            href="#"
                        >
                            Apply Now
                        </a>
                        <button
                            type="button"
                            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-high text-white"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                        >
                            <span className="material-symbols-outlined text-[20px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="lg:hidden glass border-t border-white/[0.06] px-6 py-6 space-y-4">
                        <a className="block text-white font-semibold" href="/">
                            Home
                        </a>
                        <a className="block text-white/60 font-semibold" href="/about">
                            About Us
                        </a>
                        <a className="block text-white/60 font-semibold" href="#">
                            Courses
                        </a>
                        <a className="block text-white/60 font-semibold" href="#">
                            Destinations
                        </a>
                        <a className="block text-white/60 font-semibold" href="#">
                            Services
                        </a>
                        <a className="block text-white/60 font-semibold" href="/blog">
                            Blog
                        </a>
                        <a className="block text-white/60 font-semibold" href="/events">
                            Events
                        </a>
                        <a className="block text-white/60 font-semibold" href="/contact">
                            Contact
                        </a>
                        <div className="pt-2 border-t border-white/10 text-sm text-on-surface-variant">020 7790 9233 &nbsp; info@smartmove.org</div>
                    </div>
                )}
            </nav>
        </>
    );
}
