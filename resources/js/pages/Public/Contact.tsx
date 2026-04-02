import SiteLayout from '@/layouts/site-layout';
import { useState } from 'react';

const socialLinks = [
    { label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', href: 'https://www.facebook.com/SmartMoveEducationGroup' },
    {
        label: 'Instagram',
        icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 6.5A1 1 0 005.5 7.5v9A1 1 0 006.5 17.5h11A1 1 0 0018.5 16.5v-9A1 1 0 0017.5 6.5h-11z',
        href: 'https://www.instagram.com/smartmoveeducationgroup/',
    },
    {
        label: 'LinkedIn',
        icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
        href: 'https://www.linkedin.com/in/smart-move-education-group-811514189/',
    },
    {
        label: 'YouTube',
        icon: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
        href: 'https://www.youtube.com/channel/UCSBqKD_6eb205svIFkvTGqw',
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <SiteLayout title="Contact Us | Smart Move Education Group" activePage="contact">
            {/* Hero */}
            <section className="relative overflow-hidden pt-24 pb-16">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="glow-orb blob-a absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#00b4e0]/10" />
                    <div className="glow-orb blob-b absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-[#efa500]/8" />
                </div>
                <div className="relative z-10 container mx-auto px-6 lg:px-10 max-w-7xl text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-label font-bold tracking-widest uppercase bg-secondary-container/15 text-secondary-container mb-6">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-headline font-bold text-white leading-tight mb-5">
                        Contact <span className="text-gradient-gold">Us</span>
                    </h1>
                    <p className="text-[#a09a97] font-body text-lg max-w-2xl mx-auto">
                        Have a question or ready to start your UK education journey? Reach out — our expert counsellors are here to help, completely free of
                        charge.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-card rounded-xl p-7 reveal flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary-container/15 flex items-center justify-center mb-1">
                                <span className="material-symbols-outlined text-secondary-container text-xl">call</span>
                            </div>
                            <h3 className="text-white font-headline font-bold text-base">Phone</h3>
                            <a href="tel:02077909233" className="text-[#a09a97] text-sm hover:text-white transition-colors">
                                020 7790 9233
                            </a>
                            <a href="tel:07894867772" className="text-[#a09a97] text-sm hover:text-white transition-colors">
                                078 9486 7772
                            </a>
                        </div>
                        <div className="glass-card rounded-xl p-7 reveal reveal-d1 flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary-container/15 flex items-center justify-center mb-1">
                                <span className="material-symbols-outlined text-secondary-container text-xl">mail</span>
                            </div>
                            <h3 className="text-white font-headline font-bold text-base">Email</h3>
                            <a href="mailto:info@smartmove-eg.com" className="text-[#a09a97] text-sm hover:text-white transition-colors break-all">
                                info@smartmove-eg.com
                            </a>
                        </div>
                        <div className="glass-card rounded-xl p-7 reveal reveal-d2 flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary-container/15 flex items-center justify-center mb-1">
                                <span className="material-symbols-outlined text-secondary-container text-xl">schedule</span>
                            </div>
                            <h3 className="text-white font-headline font-bold text-base">Office Hours</h3>
                            <p className="text-[#a09a97] text-sm">Mon – Fri: 9:00am – 6:00pm</p>
                            <p className="text-[#a09a97] text-sm">Sat: 10:00am – 2:00pm</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form + Offices */}
            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-14">
                        {/* Contact Form */}
                        <div className="reveal">
                            <h2 className="text-2xl lg:text-3xl font-headline font-bold text-white mb-2">Send Us a Message</h2>
                            <p className="text-[#a09a97] text-sm font-body mb-8">We'll get back to you within one business day.</p>

                            {submitted ? (
                                <div className="glass-card rounded-xl p-10 flex flex-col items-center text-center gap-4">
                                    <span
                                        className="material-symbols-outlined text-secondary-container text-5xl"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        check_circle
                                    </span>
                                    <h3 className="text-white font-headline font-bold text-xl">Message Sent!</h3>
                                    <p className="text-[#a09a97] text-sm">Thank you for reaching out. One of our counsellors will be in touch shortly.</p>
                                    <button
                                        type="button"
                                        onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                                        className="mt-2 text-secondary-container text-sm font-semibold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-label font-bold text-white/50 uppercase tracking-widest mb-2" htmlFor="name">
                                                Full Name <span className="text-secondary-container">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Jane Smith"
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-secondary-container/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-label font-bold text-white/50 uppercase tracking-widest mb-2" htmlFor="email">
                                                Email <span className="text-secondary-container">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="jane@example.com"
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-secondary-container/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-label font-bold text-white/50 uppercase tracking-widest mb-2" htmlFor="phone">
                                                Phone
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="+44 ..."
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-secondary-container/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-label font-bold text-white/50 uppercase tracking-widest mb-2" htmlFor="subject">
                                                Subject <span className="text-secondary-container">*</span>
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={form.subject}
                                                onChange={handleChange}
                                                className="w-full bg-[#1c1c1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary-container/50 transition-colors"
                                            >
                                                <option value="" disabled>
                                                    Select a topic
                                                </option>
                                                <option value="consultation">Free Consultation</option>
                                                <option value="visa">Visa Assistance</option>
                                                <option value="courses">Course Enquiry</option>
                                                <option value="application">Application Support</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-label font-bold text-white/50 uppercase tracking-widest mb-2" htmlFor="message">
                                            Message <span className="text-secondary-container">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help..."
                                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-secondary-container/50 transition-colors resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-full bg-secondary-container text-on-secondary font-headline font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_24px_rgba(239,165,0,0.25)] flex items-center justify-center gap-2"
                                    >
                                        Send Message
                                        <span className="material-symbols-outlined text-base">send</span>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Office Addresses */}
                        <div className="space-y-6">
                            {/* London Office */}
                            <div className="glass-card rounded-xl overflow-hidden reveal">
                                <div className="w-full h-52">
                                    <iframe
                                        title="Smart Move London Office"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.7!2d-0.0618!3d51.5151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzU0LjQiTiAwwrAzJzQyLjUiVw!5e0!3m2!1sen!2suk!4v1!5m2!1sen!2suk"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-secondary-container text-lg">location_on</span>
                                        <h3 className="text-white font-headline font-bold">London Office</h3>
                                    </div>
                                    <p className="text-[#a09a97] text-sm leading-relaxed mb-4">
                                        1st Floor, Botanical Works
                                        <br />2 Jubilee Street
                                        <br />
                                        London, E1 3FU
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <a href="mailto:info@smartmove-eg.com" className="flex items-center gap-2 text-[#a09a97] hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-base text-secondary-container">mail</span>
                                            info@smartmove-eg.com
                                        </a>
                                        <a href="tel:02077909233" className="flex items-center gap-2 text-[#a09a97] hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-base text-secondary-container">call</span>
                                            020 7790 9233
                                        </a>
                                        <a href="tel:07894867772" className="flex items-center gap-2 text-[#a09a97] hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-base text-secondary-container">phone_iphone</span>
                                            078 9486 7772
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Birmingham Office */}
                            <div className="glass-card rounded-xl p-6 reveal reveal-d1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-secondary-container text-lg">location_city</span>
                                    <h3 className="text-white font-headline font-bold">Birmingham Office</h3>
                                </div>
                                <p className="text-[#a09a97] text-sm leading-relaxed mb-4">
                                    Nile Business Centre
                                    <br />
                                    56–60 Nelson Street
                                    <br />
                                    Birmingham
                                </p>
                                <div className="space-y-2 text-sm">
                                    <a href="mailto:info@smartmove-eg.com" className="flex items-center gap-2 text-[#a09a97] hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-base text-secondary-container">mail</span>
                                        info@smartmove-eg.com
                                    </a>
                                </div>

                                {/* Social Links */}
                                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                                    <p className="text-xs font-label font-bold text-white/40 uppercase tracking-widest mb-3">Follow Us</p>
                                    <div className="flex items-center gap-3">
                                        {socialLinks.map((s) => (
                                            <a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={s.label}
                                                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-secondary-container/20 flex items-center justify-center transition-colors"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#a09a97]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d={s.icon} />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/[0.06]">
                <div className="container mx-auto px-6 lg:px-10 max-w-7xl text-center reveal">
                    <h2 className="text-3xl font-headline font-bold text-white mb-4">
                        Ready to <span className="text-gradient-gold">Apply Now?</span>
                    </h2>
                    <p className="text-[#a09a97] font-body text-base mb-8 max-w-xl mx-auto">
                        Skip the queue — apply directly through our online portal and one of our counsellors will guide you every step of the way.
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
