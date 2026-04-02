<!DOCTYPE html>
<html class="dark" lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Smart Move Education Group | Your Journey to a UK Degree</title>`r`n    @vite(["resources/css/app.css"])
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<style>
    .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
    .glow-orb { filter:blur(140px); pointer-events:none; position:absolute; z-index:0; }
    .no-scrollbar::-webkit-scrollbar { display:none; }
    .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
    .text-gradient-gold { background:linear-gradient(135deg,#00b4e0 0%,#a0ecff 60%,#00b4e0 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .glass { background:rgba(19,19,19,0.75); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); }
    .glass-card { background:rgba(42,42,42,0.55); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,0.05); }
    .nav-link { position:relative; }
    .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:#00b4e0; transition:width .25s ease; }
    .nav-link:hover::after, .nav-link.active::after { width:100%; }
    .reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
    .reveal.visible { opacity:1; transform:translateY(0); }
    .reveal-d1 { transition-delay:.15s; }
    .reveal-d2 { transition-delay:.3s; }
    .reveal-d3 { transition-delay:.45s; }
    .course-card-line::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:linear-gradient(to bottom,#00b4e0,transparent); border-radius:3px 0 0 3px; }
    html { scroll-behavior:smooth; }
    ::selection { background:rgba(0,180,224,.25); color:#fff; }
    @keyframes blobMove{0%,100%{transform:translate(0,0) scale(1)} 25%{transform:translate(50px,-35px) scale(1.06)} 50%{transform:translate(-25px,45px) scale(0.94)} 75%{transform:translate(-45px,-20px) scale(1.1)}}
    @keyframes blobMove2{0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-55px,30px) scale(1.1)} 66%{transform:translate(40px,-45px) scale(0.9)}}
    .blob-a{animation:blobMove 22s ease-in-out infinite;}
    .blob-b{animation:blobMove2 28s ease-in-out infinite;}
    .blob-c{animation:blobMove 17s ease-in-out infinite reverse;}
    .blob-d{animation:blobMove2 19s ease-in-out infinite reverse;}
</style>
</head>
<body class="bg-background text-on-background font-body overflow-x-hidden">

<!-- Announcement Bar -->
<div class="w-full bg-secondary-container text-on-secondary py-2.5 px-4 flex items-center justify-center gap-3 text-xs font-label font-bold tracking-widest uppercase">
    <span class="w-1.5 h-1.5 rounded-full bg-on-secondary/60 animate-pulse inline-block"></span>
    <span>March 2026 Intake is Now Open ! <a href="#" class="underline underline-offset-2 hover:opacity-70 transition-opacity">Apply by 31st March</a></span>
    <span class="w-1.5 h-1.5 rounded-full bg-on-secondary/60 animate-pulse inline-block"></span>
</div>

<!-- Navigation -->
<nav class="sticky top-0 z-50 glass border-b border-white/[0.06] w-full">
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl flex items-center justify-between h-16">
        <a href="#" class="flex items-center">
            <img src="/images/smartmove_logo.png" alt="Smart Move Education Group" style="height:38px;width:auto;filter:brightness(0) invert(1);" />
        </a>
        <div class="hidden lg:flex items-center gap-8 text-sm font-headline font-semibold">
            <a class="nav-link active text-white" href="#">Home</a>
            <a class="nav-link text-white/60 hover:text-white transition-colors" href="#">About Us</a>
            <div class="relative group/courses">
                <button class="nav-link text-white/60 hover:text-white transition-colors flex items-center gap-1">Courses <span class="material-symbols-outlined text-[16px] transition-transform group-hover/courses:rotate-180 duration-200">expand_more</span></button>
                <div class="absolute top-full -left-48 pt-3 opacity-0 invisible group-hover/courses:opacity-100 group-hover/courses:visible transition-all duration-200 w-[820px] z-50">
                    <div style="background:rgba(8,8,8,0.97);border:1px solid rgba(255,255,255,0.09)" class="rounded-sm p-8 shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
                        <div class="grid grid-cols-3 gap-8">
                            <div>
                                <p class="font-label text-[10px] text-secondary-container mb-5 uppercase tracking-[.18em]">Programmes</p>
                                <ul class="space-y-0 text-sm">
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">school</span>Postgraduate Programs</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">import_contacts</span>Undergraduate Degrees</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">layers</span>Foundation Courses</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">upgrade</span>Top-up Degrees</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">bolt</span>Short Courses</a></li>
                                </ul>
                            </div>
                            <div>
                                <p class="font-label text-[10px] text-secondary-container mb-5 uppercase tracking-[.18em]">Study Destinations</p>
                                <ul class="space-y-0 text-sm">
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">location_on</span>London</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">location_on</span>Birmingham</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">location_on</span>Manchester</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 border-b border-white/[0.05] flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">location_on</span>Leeds</a></li>
                                    <li><a class="text-white/55 hover:text-white hover:pl-2 transition-all block py-2 flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[13px] text-secondary-container/50">location_on</span>Wales</a></li>
                                </ul>
                            </div>
                            <div style="background:rgba(239,165,0,0.06);border:1px solid rgba(239,165,0,0.13)" class="rounded-sm p-5 flex flex-col justify-between">
                                <div>
                                    <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse inline-block mr-1.5"></span>
                                    <span class="text-[10px] font-label font-bold uppercase tracking-widest text-secondary-container">March 2026 — Intake Open</span>
                                    <p class="font-headline font-bold text-white text-xl mt-3 leading-tight">Start Your UK Degree Journey</p>
                                    <p class="text-xs text-white/40 mt-2 leading-relaxed">Applications closing soon. Secure your place at a world-class UK university today.</p>
                                    <div class="mt-4 flex gap-3 text-xs"><div><div class="text-white font-bold font-headline text-lg leading-none">500+</div><div class="text-white/35 font-label uppercase tracking-wider text-[9px] mt-0.5">Placed</div></div><div class="w-px bg-white/10"></div><di
                                    v><div class="text-white font-bold font-headline text-lg leading-none">98%</div><div class="text-white/35 font-label uppercase tracking-wider text-[9px] mt-0.5"> rate</div></div></div>
                                </div>
                                <a href="#" class="mt-5 bg-secondary-container text-on-secondary py-2.5 px-4 rounded-full text-xs font-bold w-fit hover:scale-105 transition-transform inline-block">Apply Now &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <a class="hidden lg:flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-semibold transition-colors" href="tel:02077909233"><span class="material-symbols-outlined text-[16px]">call</span><span>020 7790 9233</span></a>
                <a class="bg-secondary-container text-on-secondary px-5 py-2 rounded-full font-headline font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-lg shadow-secondary-container/20" href="#">Apply Now</a>
                <button class="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-high text-white" onclick="document.getElementById('mob-menu').classList.toggle('hidden')"><span class="material-symbols-outlined text-[20px]">menu</span></button>
            </div>
        </div>
    </div>
    <div id="mob-menu" class="hidden lg:hidden glass border-t border-white/[0.06] px-6 py-6 space-y-4">
        <a class="block text-white font-semibold" href="#">Home</a>
        <a class="block text-white/60 font-semibold" href="#">About Us</a>
        <a class="block text-white/60 font-semibold" href="#">Courses</a>
        <a class="block text-white/60 font-semibold" href="#">Destinations</a>
        <a class="block text-white/60 font-semibold" href="#">Services</a>
        <a class="block text-white/60 font-semibold" href="#">Blog</a>
        <a class="block text-white/60 font-semibold" href="#">Contact</a>
        <div class="pt-2 border-t border-white/10 text-sm text-on-surface-variant"> 020 7790 9233 &nbsp; info@smartmove.org</div>
    </div>
</nav>

<!-- Hero -->
<header class="relative min-h-screen flex items-center overflow-hidden bg-background">
    <div class="absolute inset-0 z-0">
        <img class="w-full h-full object-cover object-center" alt="Students walking through a historic UK university campus at golden hour" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVUAuny0-qE_Bc2n1thD5RPNlXiKZEsyFkkCXD0Z0hLU-rYQ8tNJ_g2gLKj1IrwKYcvJgZ14DFVj4TVBLz4Oi1dEbjTtTehL9CZBUBngEFEp_iyAMj4nNcV_Og_duUQvNXoP6a8KUdiT2UwsXloWZIDNY-FYuEp3nnp7GqepsR54n2NfN-jPg41nt_AQi971zzy-TUOqbd-INXd7YbVksbjsZndnYxk6ljJ61YFmX9xq7AFtXuq-3kFtfMVQ4ZGiAnmd3ftjgfbiVI"/>
        <div class="absolute inset-0 bg-background/40"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-background/98 via-background/80 to-background/30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent"></div>
    </div>
    <div class="glow-orb w-[700px] h-[700px] bg-[#1a3172] opacity-[0.13] -left-60 top-0 rounded-full"></div>
    <div class="glow-orb w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.07] left-1/3 -top-20 rounded-full"></div>

    <div class="relative z-10 container mx-auto px-6 lg:px-10 max-w-7xl w-full pt-20 pb-44">
        <div class="max-w-[52rem]">
            <div class="flex items-center gap-3 mb-8 animate-fadeUp">
                <div class="flex items-center gap-2 text-secondary-container bg-secondary-container/10 border border-secondary-container/20 px-4 py-1.5 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulseGlow inline-block"></span>
                    <span class="text-[11px] font-label font-bold uppercase tracking-widest">March 2026 Intake Open</span>
                </div>
            </div>
            <h1 class="font-headline font-black leading-[1.14] tracking-[-0.03em] overflow-visible pb-2">
                <span class="text-white text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp">Your Journey to a</span>
                <span class="text-gradient-gold text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp-d1">UK Degree</span>
                <span class="text-white text-[clamp(3rem,8vw,6.5rem)] block animate-fadeUp-d1">Starts Here.</span>
            </h1>
            <p class="text-white/75 text-lg md:text-xl xl:text-2xl leading-relaxed max-w-xl font-body mt-8 mb-10 animate-fadeUp-d2">
                Smart Move connects ambitious international students with leading UK universities &mdash; from first enquiry to graduation day.
            </p>
            <div class="flex flex-wrap gap-4 animate-fadeUp-d2">
                <a class="bg-secondary-container text-on-secondary px-8 py-4 rounded-full font-headline font-bold text-base hover:scale-105 transition-transform shadow-2xl shadow-secondary-container/20 flex items-center gap-2" href="#">
                    Start Your Application <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <a class="border border-white/20 text-white px-8 py-4 rounded-full font-headline font-bold text-base hover:bg-white/10 transition-colors backdrop-blur-sm" href="#">Explore Courses</a>
            </div>
            <div class="flex flex-wrap gap-8 mt-16 animate-fadeUp-d3">
                <div><div class="text-3xl font-headline font-extrabold text-white leading-none">500+</div><div class="text-white/50 text-xs font-label uppercase tracking-wider mt-1">Students Placed</div></div>
                <div class="w-px bg-white/15"></div>
                <div><div class="text-3xl font-headline font-extrabold text-white leading-none">20+</div><div class="text-white/50 text-xs font-label uppercase tracking-wider mt-1">University Partners</div></div>
                <div class="w-px bg-white/15"></div>
                <div><div class="text-3xl font-headline font-extrabold text-white leading-none">4.8/5</div><div class="text-white/50 text-xs font-label uppercase tracking-wider mt-1">Trustpilot Rating</div></div>
                <div class="w-px bg-white/15"></div>
                <div><div class="text-3xl font-headline font-extrabold text-white leading-none">98%</div><div class="text-white/50 text-xs font-label uppercase tracking-wider mt-1">lorem ipsum</div></div>
            </div>
        </div>
    </div>
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/30 animate-bounce">
        <span class="text-[10px] font-label tracking-widest uppercase">Scroll</span>
        <span class="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
    </div>
</header>

<!-- Partner Strip -->
<div class="bg-surface-container-lowest border-y border-white/[0.08] py-10">
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <p class="text-center text-white/20 text-[10px] font-label uppercase tracking-[0.25em] mb-8">Our Trusted University Partners</p>
        <div class="flex items-center justify-center flex-wrap gap-16 md:gap-24">
            <img class="h-10 object-contain opacity-55 grayscale hover:opacity-85 hover:grayscale-0 transition-all duration-300" alt="UWTSD University" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArFhvoM6rYJSCwTbBJ0yQEWGQaG6OHYpMvr3EFu7XI2WCYTJA35hQtinQ4AyKdqawb4nbXjjc0ovezMt8NgqE5zYpFW2YpkmbL12ppj3hs5HmGq1ky0_6q-9E1I2UMzESjcbF7uS5crWFiWV7HqZ_K6IbVonm58BsiRgOLFwzYUV83WB4UoOsqSs3Vysce2e6PbRy5184canJlANF8pAjld8RuxSIoGWpoytY38woGJ7nQmmG1k1YtS_CA4iDJMGLYTPq1d_CKNGQL"/>
            <img class="h-10 object-contain opacity-55 grayscale hover:opacity-85 hover:grayscale-0 transition-all duration-300" alt="Coventry University" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuHxxR4mydfhQCrTHhBB5OR8bnt1KQfvwfDj09m_Khvg_LKH6hgfDa-uDm52GfbVVwEqlLdZ_6izwA9NsBJQbXpo7tlGQpGOfiZd76OWolGLt8-23FNy6d9Mc9VdB-uY35DVpHDutXe30YR7yrBqUAC_he2soHYmzC9NGkcn-tCu-gDEJ7kjxXaimlb7ShwSUkM_rOIYq3rSw3KNrQAXVq502q8xZC8-gpfQojYFbsujoCJhLbfU5PCE4IhV4W9qsMs5AwFdZonUCI"/>
            <img class="h-10 object-contain opacity-55 grayscale hover:opacity-85 hover:grayscale-0 transition-all duration-300" alt="Oxford Brookes University" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Y7uTsFvOEJze7KOc6Y0odzLzQ2nPPfYIaLKCT0z9lDR21cOq8P07x7O4ya1jWzszk0r36yq-tpIKqFvPkhpZTC3V2y9xpC8rZ5lTBLxAU_vu0rTOYUDCbsh9XbdqC_ardazFDdnA4aVemX8Zt6r_nP0XlhA-hFCIhulFt-gl7e4LLvsIXw5qRtvR8juE3P0GHehCWqN0dCcZzHAyiUxsSo2mLbqoXu7bHIKAottXqzTitYzPTVD77opnn8YbQ5vQVneC7GieUto6"/>
            <img class="h-10 object-contain opacity-55 grayscale hover:opacity-85 hover:grayscale-0 transition-all duration-300" alt="BPP University" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvOhBymIPQDWQnjNoxXTgaANxK3qpnResGZpSYqEjJidqI5QSMLq42cz7ml_oZcGMmWFvZMxlo-jd96-BE6sDNpc_gQxQBROA1AYxqPdcyef16Foc3sFix5DiZp-AUlgxWUDIA9lzcygiafJa4jHR-5gd5zqD6_CkNI8L0UMQeq0uxcWsvuJBxG9Bzcam4Y_TROcdH14mfctsYOkW0xoKgwnSJ9emy_XdU_fW3W4L6XLcBAYez2DgkAtfcHszYIm7x88_n5ce3IpZT"/>
        </div>
    </div>
</div>

<!-- Who We Are -->
<section class="py-28 bg-background relative overflow-hidden">
    <div class="glow-orb blob-a w-[600px] h-[600px] bg-[#1a3172] opacity-[0.08] -right-32 top-0 rounded-full"></div>
    <div class="glow-orb blob-d w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.05] -left-40 bottom-10 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div class="relative reveal">
                <div class="relative rounded-lg overflow-hidden aspect-[4/5]">
                    <img class="w-full h-full object-cover" alt="Education consultant meeting with an international student in a London office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoMUPye57nJmFy3zjH8y-hcY_tT3BlWbKPOPRLVz6t1HusizrkmNxHbl8L934h-0UiBQLeTVjN2Msm-KEEa33q1rQBelC3GuRHbsskODWeBLJnTI-HbwzgkLSdgN5B45zYrqMj9m9E0t7ekKxgWmfvi4XPdVAsAyQQgJBfKf4pOCk66FxadKDbSHnQXlbcamKgkekb8EIBq2P4FGMks4cuEXOZQ2hmNmkFHNLmjql-waI3atmKpHz0HJsrOQxmS-0mSaY5vtWtMHNC"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"></div>
                </div>
                <div class="absolute -bottom-6 -right-4 glass-card rounded-xl p-5 w-52 shadow-2xl">
                    <div class="flex items-center gap-3 mb-2"><span class="material-symbols-outlined text-secondary-container text-2xl">verified</span><span class="text-white font-bold text-sm font-headline">Lorem Ipsum</span></div>
                    <p class="text-on-surface-variant text-xs leading-relaxed">British Council certified agent. Fully compliant.</p>
                </div>
                <div class="absolute -top-5 -left-4 glass-card rounded-xl p-4 shadow-2xl">
                    <div class="text-4xl font-headline font-black text-white">98%</div>
                    <div class="text-on-surface-variant text-xs font-label uppercase tracking-wider mt-0.5">lorem ipsum</div>
                </div>
            </div>
            <div class="reveal reveal-d1">
                <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-5 text-xs uppercase">WHO WE ARE</p>
                <h2 class="text-white font-headline font-bold text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight mb-8">We believe every student deserves a world-class education.</h2>
                <p class="text-on-surface-variant text-lg leading-relaxed mb-5 font-body">Smart Move Education Group is a specialist UK university placement service based in London. We work closely with international students at every stage � from choosing the right course to landing at Heathrow.</p>
                <p class="text-on-surface-variant leading-relaxed mb-10 font-body text-base">Our team of experienced education consultants has guided over 500 students from more than 15 countries into prestigious UK programmes. We are not just an agency � we are partners in your academic journey.</p>
                <div class="grid grid-cols-2 gap-4 mb-10">
                    <div class="bg-surface-container-low rounded-xl p-5"><span class="material-symbols-outlined text-primary text-2xl mb-3 block">groups</span><div class="text-white font-bold font-headline mb-1">Expert Team</div><div class="text-on-surface-variant text-sm">3 dedicated consultants, all UK-educated</div></div>
                    <div class="bg-surface-container-low rounded-xl p-5"><span class="material-symbols-outlined text-tertiary text-2xl mb-3 block">workspace_premium</span><div class="text-white font-bold font-headline mb-1">Accredited</div><div class="text-on-surface-variant text-sm">British Council certified since 2018</div></div>
                </div>
                <a class="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline group" href="#">Learn more about us <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
            </div>
        </div>
    </div>
</section>

<!-- Our Courses -->
<section class="py-28 bg-surface-container-low relative overflow-hidden" id="courses">
    <div class="glow-orb blob-b w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.07] -left-20 bottom-0 rounded-full"></div>
    <div class="glow-orb blob-c w-[450px] h-[450px] bg-[#1a3172] opacity-[0.05] right-0 top-20 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div class="reveal">
                <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">OUR PROGRAMMES</p>
                <h2 class="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight leading-[1.1]">Find Your Course.</h2>
            </div>
            <div class="flex flex-wrap gap-2 reveal reveal-d1">
                <button class="bg-secondary-container text-on-secondary px-5 py-2 rounded-full font-bold text-xs font-label">All</button>
                <button class="bg-surface-container-highest text-white/60 px-5 py-2 rounded-full font-bold text-xs font-label hover:text-white transition-colors">Postgraduate</button>
                <button class="bg-surface-container-highest text-white/60 px-5 py-2 rounded-full font-bold text-xs font-label hover:text-white transition-colors">Undergraduate</button>
                <button class="bg-surface-container-highest text-white/60 px-5 py-2 rounded-full font-bold text-xs font-label hover:text-white transition-colors">Foundation</button>
            </div>
        </div>
        <div class="space-y-4">
            <a href="#" class="group relative bg-surface-container-high rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-[0_4px_40px_rgba(239,165,0,.1)] transition-all duration-300 course-card-line block reveal">
                <div class="md:w-64 h-52 md:h-auto overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Business management course" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoMUPye57nJmFy3zjH8y-hcY_tT3BlWbKPOPRLVz6t1HusizrkmNxHbl8L934h-0UiBQLeTVjN2Msm-KEEa33q1rQBelC3GuRHbsskODWeBLJnTI-HbwzgkLSdgN5B45zYrqMj9m9E0t7ekKxgWmfvi4XPdVAsAyQQgJBfKf4pOCk66FxadKDbSHnQXlbcamKgkekb8EIBq2P4FGMks4cuEXOZQ2hmNmkFHNLmjql-waI3atmKpHz0HJsrOQxmS-0mSaY5vtWtMHNC"/></div>
                <div class="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div><div class="flex items-center gap-3 mb-4"><span class="bg-primary-container/25 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-label">Postgraduate</span><span class="text-on-surface-variant text-xs font-label">1 Year Full-time</span></div><h3 class="text-white font-headline font-bold text-2xl mb-3 group-hover:text-secondary-container transition-colors">MSc Business Management</h3><p class="text-on-surface-variant text-sm leading-relaxed max-w-xl">Develop strategic leadership skills and business acumen. Intakes in September and January across multiple partner universities in London and Birmingham.</p></div>
                    <div class="flex items-center gap-2 mt-6 text-secondary-container font-bold text-sm font-headline">View course <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span></div>
                </div>
            </a>
            <a href="#" class="group relative bg-surface-container-high rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-[0_4px_40px_rgba(80,221,184,.08)] transition-all duration-300 course-card-line block reveal reveal-d1">
                <div class="md:w-64 h-52 md:h-auto overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Healthcare and nursing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2eChOQt82BlMB-WTUc117w506wuyERPQxvf1jBynR5k6UNfwLtQxf3frOd7FbbCv-bj-qGUDCMPg3FC8FD44V0r_3ulyWc-dvJdn1lRxzX04uMadMUW_Cnszn6bvyKVA0GKenwEWyqj1iLbMgWZ999jfC5FMGc_w1lpXoQQCcXAtcJuGuzGpdOidzi9eHvQKujdvYj6m9Wq0lVwc-Aq9QpA908qCW6f-vYYBWB8yLHs-pKmgKC5zFpJ92kEiFQd463ANxKY9UZE1k"/></div>
                <div class="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div><div class="flex items-center gap-3 mb-4"><span class="bg-tertiary-container/25 text-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-label">Top-up Degree</span><span class="text-on-surface-variant text-xs font-label">1 Year</span></div><h3 class="text-white font-headline font-bold text-2xl mb-3 group-hover:text-tertiary transition-colors">BSc Nursing &amp; Healthcare</h3><p class="text-on-surface-variant text-sm leading-relaxed max-w-xl">Fast-track your healthcare career with a professional top-up degree. Ideal for qualified nurses seeking a full UK BSc qualification with HCPC registration support.</p></div>
                    <div class="flex items-center gap-2 mt-6 text-tertiary font-bold text-sm font-headline">View course <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span></div>
                </div>
            </a>
            <a href="#" class="group relative bg-surface-container-high rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-[0_4px_40px_rgba(188,194,255,.08)] transition-all duration-300 course-card-line block reveal reveal-d2">
                <div class="md:w-64 h-52 md:h-auto overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Computer science lab" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRI_LPKBY81oDOWA4L6aHiwYWtwnj5ieJddDO628u6cBPYaV0Jaftq5TVYnvXHUcV9on7QF8lcVV8ZZAsBGP8GLwQtfglx6aC2i-F-KtGvcq0Lvb0Z2P9lDeRC3EG8J-usF9l0IPQ4M1uXlo6YzTlEDE2FOUFL-eaSGXcXMDisL6MOATteFTFhKSQAAdIIAS4RCCRKE7K-u6OxFfyAn0DW7BMmD_KK6f9NpKDIgmj7CNuGGaHyuZtw35-ME7DZnQb5z5wnLxYI3w8s"/></div>
                <div class="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div><div class="flex items-center gap-3 mb-4"><span class="bg-primary-container/25 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-label">Undergraduate</span><span class="text-on-surface-variant text-xs font-label">3 Years Full-time</span></div><h3 class="text-white font-headline font-bold text-2xl mb-3 group-hover:text-primary transition-colors">BSc Computer Science</h3><p class="text-on-surface-variant text-sm leading-relaxed max-w-xl">Industry-integrated degree with placement year options. Covering AI, software engineering, cyber security and data science at leading UK tech universities.</p></div>
                    <div class="flex items-center gap-2 mt-6 text-primary font-bold text-sm font-headline">View course <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span></div>
                </div>
            </a>
            <a href="#" class="group relative bg-surface-container-high rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-[0_4px_40px_rgba(239,165,0,.1)] transition-all duration-300 course-card-line block reveal reveal-d3">
                <div class="md:w-64 h-52 md:h-auto overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="International relations and policy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMTHlNxSkhkqni7ZRwGmVocC23siV46lB9Ri5hv1IryN12dN9wOzmGyABTKToxyT3V8inDVnFkpjXO-LoLfrn3VTUTzLViULSRC7wzAPhRjYIpWNW9yTiFhlYNYs1mW2fYT2cpJzC3GiT4v4uua18g-UYZ4oViuT3pHfhL00kkCveazX53AQK0Ph68gAf_LCl7zMbj5leAJLRzBF_KLH7wknBORvB0oCXg45YTvfFfoE8w_XEwC9O7QQKrRSAcD97nTFr-5fBTh2-h"/></div>
                <div class="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div><div class="flex items-center gap-3 mb-4"><span class="bg-primary-container/25 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-label">Postgraduate</span><span class="text-on-surface-variant text-xs font-label">1�2 Years</span></div><h3 class="text-white font-headline font-bold text-2xl mb-3 group-hover:text-secondary-container transition-colors">MA International Relations</h3><p class="text-on-surface-variant text-sm leading-relaxed max-w-xl">Explore global policy, diplomacy and international law. Perfect for students aiming for careers in government, NGOs or international organisations.</p></div>
                    <div class="flex items-center gap-2 mt-6 text-secondary-container font-bold text-sm font-headline">View course <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span></div>
                </div>
            </a>
        </div>
        <div class="mt-10 flex justify-center reveal">
            <a class="inline-flex items-center gap-2 border border-outline-variant/30 text-white/70 hover:text-white hover:border-outline-variant/60 px-8 py-3 rounded-full font-headline font-semibold text-sm transition-all" href="#">Browse All 40+ Courses <span class="material-symbols-outlined text-[18px]">arrow_forward</span></a>
        </div>
    </div>
</section>

<!-- Study Destinations -->
<section class="py-28 relative overflow-hidden bg-background">
    <div class="glow-orb blob-c w-[500px] h-[500px] bg-[#50ddb8] opacity-[0.07] -right-20 top-32 rounded-full"></div>
    <div class="glow-orb blob-a w-[400px] h-[400px] bg-[#00b4e0] opacity-[0.05] -left-20 bottom-0 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div class="mb-14 reveal">
            <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">STUDY DESTINATIONS</p>
            <h2 class="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">Choose Your City.</h2>
        </div>
        <div class="flex flex-col lg:flex-row gap-8 items-start">
            <div class="w-full lg:w-56 flex lg:flex-col overflow-x-auto no-scrollbar gap-1.5 flex-shrink-0 reveal">
                <button onclick="switchCity(this,'london')" class="city-tab active-tab bg-surface-container-high text-white px-5 py-4 rounded-xl text-left font-headline font-bold text-base border-l-[3px] border-secondary-container flex items-center justify-between">London <span class="material-symbols-outlined text-[18px] text-secondary-container">arrow_forward</span></button>
                <button onclick="switchCity(this,'birmingham')" class="city-tab text-white/50 px-5 py-4 rounded-xl text-left font-headline font-bold text-base hover:bg-surface-container-low hover:text-white/80 transition-all flex items-center justify-between">Birmingham <span class="material-symbols-outlined text-[18px] opacity-0">arrow_forward</span></button>
                <button onclick="switchCity(this,'manchester')" class="city-tab text-white/50 px-5 py-4 rounded-xl text-left font-headline font-bold text-base hover:bg-surface-container-low hover:text-white/80 transition-all flex items-center justify-between">Manchester <span class="material-symbols-outlined text-[18px] opacity-0">arrow_forward</span></button>
                <button onclick="switchCity(this,'leeds')" class="city-tab text-white/50 px-5 py-4 rounded-xl text-left font-headline font-bold text-base hover:bg-surface-container-low hover:text-white/80 transition-all flex items-center justify-between">Leeds <span class="material-symbols-outlined text-[18px] opacity-0">arrow_forward</span></button>
                <button onclick="switchCity(this,'wales')" class="city-tab text-white/50 px-5 py-4 rounded-xl text-left font-headline font-bold text-base hover:bg-surface-container-low hover:text-white/80 transition-all flex items-center justify-between">Wales <span class="material-symbols-outlined text-[18px] opacity-0">arrow_forward</span></button>
            </div>
            <div class="flex-1 reveal reveal-d1">
                <div id="city-london" class="city-panel bg-surface-container-low rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl">
                    <div class="md:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                        <h3 class="text-3xl font-headline font-bold text-white mb-5">Study in <span class="text-gradient-gold">London</span></h3>
                        <p class="text-on-surface-variant leading-relaxed mb-5 text-sm">The world's most globally connected capital. With over 40 universities in Greater London, students benefit from unparalleled industry access and cultural diversity.</p>
                        <ul class="space-y-2 mb-8 text-sm text-on-surface-variant">
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>40+ universities to choose from</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Global hub for finance, tech and media</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Graduate route  eligible</li>
                        </ul>
                        <a class="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline text-sm group" href="#">Explore London courses <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                    <div class="md:w-1/2 h-72 md:h-auto"><img class="w-full h-full object-cover" alt="London skyline at dawn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRtLnMNAVkI-SmMTasEDqj49VEGstaQ0DFCWdxMJO4bzh_O5pG2_Ls4Wxl6VgXHZbZVTAEESfkcMai3RWbXpBUP6cratEc-9zQczS3qriN2a_ErgnzUGC5avpzADyT8anaJI_JonUZIXqRxjv_G_pD9pFg8Q4WUaZaujvMPTs7I5Tze6LXa3gA-zPXJSGGmCX24d3Tm_AFGswVLH9MmpqpO0_WynvRgG1GqYL6j7nMi3RRP-AFt8Zo4Hiz8kEpyrnrFOelZ_m26EEF"/></div>
                </div>
                <div id="city-birmingham" class="city-panel hidden bg-surface-container-low rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl">
                    <div class="md:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                        <h3 class="text-3xl font-headline font-bold text-white mb-5">Study in <span class="text-gradient-gold">Birmingham</span></h3>
                        <p class="text-on-surface-variant leading-relaxed mb-5 text-sm">The UK's second city, with a thriving student population of over 80,000 and a lower cost of living than London. Home to world-class universities and a booming tech sector.</p>
                        <ul class="space-y-2 mb-8 text-sm text-on-surface-variant">
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Lower living costs than London</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Growing tech and business sector</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Vibrant multicultural community</li>
                        </ul>
                        <a class="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline text-sm group" href="#">Explore Birmingham courses <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                    <div class="md:w-1/2 h-72 md:h-auto bg-surface-container-high flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-on-surface-variant/20">location_city</span></div>
                </div>
                <div id="city-manchester" class="city-panel hidden bg-surface-container-low rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl">
                    <div class="md:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                        <h3 class="text-3xl font-headline font-bold text-white mb-5">Study in <span class="text-gradient-gold">Manchester</span></h3>
                        <p class="text-on-surface-variant leading-relaxed mb-5 text-sm">A world-renowned university city with excellent research output, an iconic music scene and a multicultural character. World-class education at very affordable living costs.</p>
                        <ul class="space-y-2 mb-8 text-sm text-on-surface-variant">
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Internationally ranked universities</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Russell Group access</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Affordable student lifestyle</li>
                        </ul>
                        <a class="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline text-sm group" href="#">Explore Manchester courses <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                    <div class="md:w-1/2 h-72 md:h-auto bg-surface-container-high flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-on-surface-variant/20">location_city</span></div>
                </div>
                <div id="city-leeds" class="city-panel hidden bg-surface-container-low rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl">
                    <div class="md:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                        <h3 class="text-3xl font-headline font-bold text-white mb-5">Study in <span class="text-gradient-gold">Leeds</span></h3>
                        <p class="text-on-surface-variant leading-relaxed mb-5 text-sm">One of the UK's fastest-growing cities with a huge student community. Leeds offers an exceptional quality of life and is home to major employers in law, finance and health.</p>
                        <ul class="space-y-2 mb-8 text-sm text-on-surface-variant">
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Thriving student union and social scene</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Strong healthcare and law programmes</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Excellent graduate employment rate</li>
                        </ul>
                        <a class="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline text-sm group" href="#">Explore Leeds courses <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                    <div class="md:w-1/2 h-72 md:h-auto bg-surface-container-high flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-on-surface-variant/20">location_city</span></div>
                </div>
                <div id="city-wales" class="city-panel hidden bg-surface-container-low rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl">
                    <div class="md:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                        <h3 class="text-3xl font-headline font-bold text-white mb-5">Study in <span class="text-gradient-gold">Wales</span></h3>
                        <p class="text-on-surface-variant leading-relaxed mb-5 text-sm">An affordable, scenic region with excellent university provision. UWTSD and Cardiff Met offer strong vocational and academic programmes in a welcoming bilingual environment.</p>
                        <ul class="space-y-2 mb-8 text-sm text-on-surface-variant">
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Lowest cost of living in the UK</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Strong UWTSD partnerships</li>
                            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>Beautiful scenic campus environments</li>
                        </ul>
                        <a class="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all font-headline text-sm group" href="#">Explore Wales courses <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                    <div class="md:w-1/2 h-72 md:h-auto bg-surface-container-high flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-on-surface-variant/20">landscape</span></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- How We Help -->
<section class="py-28 bg-surface-container-low relative overflow-hidden">
    <div class="glow-orb blob-a w-[400px] h-[400px] bg-[#1a3172] opacity-[0.09] right-0 bottom-0 rounded-full"></div>
    <div class="glow-orb blob-d w-[500px] h-[500px] bg-[#00b4e0] opacity-[0.05] -left-20 top-0 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div class="text-center mb-16 reveal">
            <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">HOW WE HELP</p>
            <h2 class="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">From Enquiry to Enrolment.</h2>
            <p class="text-on-surface-variant text-lg mt-4 max-w-xl mx-auto">A fully guided experience at every step of your UK university journey.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            <div class="bg-background rounded-lg p-8 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(188,194,255,.06)] transition-all reveal">
                <div class="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 rounded-bl-full group-hover:bg-primary-container/20 transition-colors"></div>
                <div class="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center mb-6"><span class="material-symbols-outlined text-primary">school</span></div>
                <div class="text-secondary-container font-label font-bold text-[10px] uppercase tracking-widest mb-3">Step 01</div>
                <h3 class="text-white font-headline font-bold text-xl mb-4">Course Selection</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed">Our consultants analyse your background, grades and goals to match you with the right programme and university � with zero pressure.</p>
            </div>
            <div class="bg-background rounded-lg p-8 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(239,165,0,.08)] transition-all reveal reveal-d1 ring-1 ring-secondary-container/20">
                <div class="absolute top-0 right-0 w-24 h-24 bg-secondary-container/10 rounded-bl-full group-hover:bg-secondary-container/20 transition-colors"></div>
                <div class="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center mb-6"><span class="material-symbols-outlined text-secondary-container">description</span></div>
                <div class="text-secondary-container font-label font-bold text-[10px] uppercase tracking-widest mb-3">Step 02</div>
                <h3 class="text-white font-headline font-bold text-xl mb-4">Application Support</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed">Personal statement reviews, document verification and direct liaison with universities to ensure a seamless and successful application every time.</p>
            </div>
            <div class="bg-background rounded-lg p-8 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(80,221,184,.06)] transition-all reveal reveal-d2">
                <div class="absolute top-0 right-0 w-24 h-24 bg-tertiary-container/10 rounded-bl-full group-hover:bg-tertiary-container/20 transition-colors"></div>
                <div class="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center mb-6"><span class="material-symbols-outlined text-tertiary">flight_takeoff</span></div>
                <div class="text-secondary-container font-label font-bold text-[10px] uppercase tracking-widest mb-3">Step 03</div>
                <h3 class="text-white font-headline font-bold text-xl mb-4">Life in the UK</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed"> guidance, accommodation finding, pre-departure briefings and ongoing student support once you arrive in the UK.</p>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
            <div class="bg-background/50 rounded-xl p-6 text-center"><div class="text-5xl font-headline font-extrabold text-white mb-2">500+</div><div class="text-on-surface-variant font-label tracking-widest text-[10px] uppercase">Students Placed</div></div>
            <div class="bg-background/50 rounded-xl p-6 text-center"><div class="text-5xl font-headline font-extrabold text-white mb-2">20+</div><div class="text-on-surface-variant font-label tracking-widest text-[10px] uppercase">University Partners</div></div>
            <div class="bg-background/50 rounded-xl p-6 text-center"><div class="text-5xl font-headline font-extrabold text-white mb-2">98%</div><div class="text-on-surface-variant font-label tracking-widest text-[10px] uppercase">Lorem ipsum</div></div>
            <div class="bg-background/50 rounded-xl p-6 text-center"><div class="text-5xl font-headline font-extrabold text-white mb-2">15+</div><div class="text-on-surface-variant font-label tracking-widest text-[10px] uppercase">Countries Served</div></div>
        </div>
    </div>
</section>

<!-- Testimonials -->
<section class="py-28 bg-background relative overflow-hidden">
    <div class="glow-orb blob-b w-[600px] h-[600px] bg-[#00b4e0] opacity-[0.06] left-1/2 -translate-x-1/2 -bottom-40 rounded-full"></div>
    <div class="glow-orb blob-c w-[400px] h-[400px] bg-[#1a3172] opacity-[0.05] -right-20 top-10 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div class="reveal">
                <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">STUDENT STORIES</p>
                <h2 class="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">What Our Students Say.</h2>
            </div>
            <div class="flex items-center gap-2 mt-4 reveal reveal-d1">
                <div class="flex text-secondary-container gap-0.5"><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star_half</span></div>
                <span class="text-white/60 text-sm font-bold">4.8 on Trustpilot</span>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div class="bg-surface-container-low rounded-lg p-8 flex flex-col gap-5 hover:shadow-[0_0_30px_rgba(188,194,255,.05)] transition-all reveal">
                <div class="flex text-secondary-container gap-0.5"><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span></div>
                <p class="text-white/85 leading-relaxed italic flex-1">"Smart Move made my dream of studying in London a reality. The process was transparent and so much easier than I ever expected. I couldn't have done it without them."</p>
                <div class="flex items-center gap-4 pt-4 border-t border-white/[0.06]"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-container/60 to-surface-container-highest flex items-center justify-center text-white font-bold text-sm font-headline">AO</div><div><p class="text-white font-bold text-sm">Amara Okafor</p><p class="text-on-surface-variant text-xs">MSc Data Science  Coventry University</p></div></div>
            </div>
            <div class="bg-secondary-container/10 ring-1 ring-secondary-container/20 rounded-lg p-8 flex flex-col gap-5 shadow-[0_0_40px_rgba(239,165,0,.08)] reveal reveal-d1">
                <div class="flex text-secondary-container gap-0.5"><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span></div>
                <p class="text-white leading-relaxed italic flex-1">"The  support was outstanding. The team handled everything professionally. My consultant was available whenever I needed guidance, even outside of office hours."</p>
                <div class="flex items-center gap-4 pt-4 border-t border-secondary-container/20"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-container/50 to-surface-container-highest flex items-center justify-center text-on-secondary font-bold text-sm font-headline">RK</div><div><p class="text-white font-bold text-sm">Rajesh Kumar</p><p class="text-on-surface-variant text-xs">MBA Graduate  Oxford Brookes</p></div></div>
            </div>
            <div class="bg-surface-container-low rounded-lg p-8 flex flex-col gap-5 hover:shadow-[0_0_30px_rgba(80,221,184,.05)] transition-all reveal reveal-d2">
                <div class="flex text-secondary-container gap-0.5"><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span><span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">star</span></div>
                <p class="text-white/85 leading-relaxed italic flex-1">"Highly recommend Smart Move. They genuinely listen to your needs and find the right fit. I'm now doing my BSc Finance and absolutely loving every moment of London life."</p>
                <div class="flex items-center gap-4 pt-4 border-t border-white/[0.06]"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-tertiary-container/60 to-surface-container-highest flex items-center justify-center text-white font-bold text-sm font-headline">SA</div><div><p class="text-white font-bold text-sm">Siti Aminah</p><p class="text-on-surface-variant text-xs">BSc Finance  BPP University</p></div></div>
            </div>
        </div>
    </div>
</section>

<!-- Upcoming Events -->
<section class="py-28 bg-surface-container-low relative overflow-hidden">
    <div class="glow-orb blob-d w-[500px] h-[500px] bg-[#1a3172] opacity-[0.06] -right-20 top-0 rounded-full"></div>
    <div class="glow-orb blob-b w-[400px] h-[400px] bg-[#50ddb8] opacity-[0.04] -left-20 bottom-0 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div class="reveal">
                <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">WHAT'S ON</p>
                <h2 class="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">Upcoming Events.</h2>
            </div>
            <a class="text-primary font-bold text-sm hover:underline mt-4 reveal reveal-d1" href="#">See all events </a>
        </div>
        <div class="space-y-3">
            <div class="group bg-background rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:ring-1 hover:ring-white/10 transition-all reveal">
                <div class="flex flex-col md:flex-row gap-5 md:items-center flex-1">
                    <div class="w-14 h-14 bg-secondary-container/10 border border-secondary-container/20 rounded-xl flex flex-col items-center justify-center flex-shrink-0"><span class="text-secondary-container font-label font-bold text-[10px] uppercase">Apr</span><span class="text-white font-headline font-extrabold text-xl leading-none">02</span></div>
                    <div>
                        <span class="text-[10px] font-label font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Online</span>
                        <h3 class="text-white font-headline font-bold text-lg mt-1 group-hover:text-secondary-container transition-colors">Open Information Session: Postgraduate Degrees</h3>
                        <div class="flex items-center gap-4 mt-1 text-on-surface-variant text-xs font-label"><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>6:00�7:00 PM BST</span><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">videocam</span>Zoom Webinar</span></div>
                    </div>
                </div>
                <a href="#" class="shrink-0 inline-flex items-center gap-2 border border-outline-variant/30 text-white/70 hover:text-white hover:border-secondary-container/40 px-5 py-2.5 rounded-full text-sm font-bold font-headline transition-all">Register <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
            </div>
            <div class="group bg-background rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:ring-1 hover:ring-white/10 transition-all reveal reveal-d1">
                <div class="flex flex-col md:flex-row gap-5 md:items-center flex-1">
                    <div class="w-14 h-14 bg-secondary-container/10 border border-secondary-container/20 rounded-xl flex flex-col items-center justify-center flex-shrink-0"><span class="text-secondary-container font-label font-bold text-[10px] uppercase">Apr</span><span class="text-white font-headline font-extrabold text-xl leading-none">08</span></div>
                    <div>
                        <span class="text-[10px] font-label font-bold uppercase tracking-widest text-tertiary bg-tertiary/10 px-2.5 py-0.5 rounded-full">In-Person</span>
                        <h3 class="text-white font-headline font-bold text-lg mt-1 group-hover:text-secondary-container transition-colors">Bachelor's Open Day � London Campus Visit</h3>
                        <div class="flex items-center gap-4 mt-1 text-on-surface-variant text-xs font-label"><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>11:30 AM�3:30 PM BST</span><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">location_on</span>Central London</span></div>
                    </div>
                </div>
                <a href="#" class="shrink-0 inline-flex items-center gap-2 border border-outline-variant/30 text-white/70 hover:text-white hover:border-secondary-container/40 px-5 py-2.5 rounded-full text-sm font-bold font-headline transition-all">Register <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
            </div>
            <div class="group bg-background rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:ring-1 hover:ring-white/10 transition-all reveal reveal-d2">
                <div class="flex flex-col md:flex-row gap-5 md:items-center flex-1">
                    <div class="w-14 h-14 bg-secondary-container/10 border border-secondary-container/20 rounded-xl flex flex-col items-center justify-center flex-shrink-0"><span class="text-secondary-container font-label font-bold text-[10px] uppercase">Apr</span><span class="text-white font-headline font-extrabold text-xl leading-none">15</span></div>
                    <div>
                        <span class="text-[10px] font-label font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Online</span>
                        <h3 class="text-white font-headline font-bold text-lg mt-1 group-hover:text-secondary-container transition-colors">UK Student  Masterclass � Step by Step Guide</h3>
                        <div class="flex items-center gap-4 mt-1 text-on-surface-variant text-xs font-label"><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>5:00�6:00 PM BST</span><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">videocam</span>Zoom Webinar</span></div>
                    </div>
                </div>
                <a href="#" class="shrink-0 inline-flex items-center gap-2 border border-outline-variant/30 text-white/70 hover:text-white hover:border-secondary-container/40 px-5 py-2.5 rounded-full text-sm font-bold font-headline transition-all">Register <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
            </div>
        </div>
    </div>
</section>

<!-- Blog -->
<section class="py-28 bg-background relative overflow-hidden">
    <div class="glow-orb blob-a w-[550px] h-[550px] bg-[#00b4e0] opacity-[0.05] -left-20 top-0 rounded-full"></div>
    <div class="glow-orb blob-c w-[400px] h-[400px] bg-[#1a3172] opacity-[0.05] -right-20 bottom-0 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div class="reveal">
                <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">LATEST UPDATES</p>
                <h2 class="text-white font-headline font-bold text-[clamp(2rem,4vw,3.5rem)] tracking-tight">From Our Blog.</h2>
            </div>
            <a class="text-primary font-bold text-sm hover:underline mt-4 reveal reveal-d1" href="#">View all posts </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article class="group reveal">
                <div class="h-52 rounded-lg overflow-hidden mb-5 relative"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Students celebrating graduation at a UK university lawn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKeKDbjQ6X5q9gPZ7NPz-Nnzi8NatXwuLWEWusQYbLw1riIaFIYs4VdJNlGuUzCd_gGBi7dFxpf8YRMCBWyhX6wPenYKSywRCD5RZH2Od84_fQtxgLUfL4Vq3WO7bwO9H0uElj8bIQhj49LnMRE-jST-pJeLBGuH1zUqsHiu2Dw2VC2s2l2kpA0goBR6jAcFO0AXflbffdm_GUsWkvIfe2aUKygk9Orf9WiPQWZT0A_tPq0_vvpsIhGSxggKB2p6iJ8pwlWJLsB6Lc"/><span class="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-label"> Guide</span></div>
                <p class="text-on-surface-variant text-xs font-label mb-2">March 20, 2026</p>
                <h3 class="text-white font-headline font-bold text-xl mb-3 leading-snug group-hover:text-secondary-container transition-colors">Everything You Need to Know About the Graduate  Route</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed mb-4">Stay ahead with the latest immigration updates for international students wishing to stay and work in the UK after graduation.</p>
                <a class="inline-flex items-center gap-1.5 text-secondary-container font-bold text-sm font-headline group/link" href="#">Read Article <span class="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span></a>
            </article>
            <article class="group reveal reveal-d1">
                <div class="h-52 rounded-lg overflow-hidden mb-5 relative"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Modern university library interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWymeQnXQLF2mBnB3u9sFSlAx26NV-SAupNiggwx_YOldxKP2QbhopkkwYdRlfNK6-5fUeBxxM-Zz4HT1WoQRRW3nqvF9pBGJfw9Io17LpomCxWxRv-vTSUVNHIhWxl7tm8Q9cuRI35Uabm1TZlXjtf1L5Of6RLfcmWoaJhEXJLJKyPK3GFjL86UWsOYO64xJGg0sZY3vwGWrMD0fwjxwm_YMukiWWha5XnLh0jUhyFqIcKCEQZiwcG_2kSwipYD9rgiOQXvFTWZUl"/><span class="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-label">Scholarships</span></div>
                <p class="text-on-surface-variant text-xs font-label mb-2">March 14, 2026</p>
                <h3 class="text-white font-headline font-bold text-xl mb-3 leading-snug group-hover:text-secondary-container transition-colors">Top 5 UK Scholarships for International Students in 2026</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed mb-4">Discover the most prestigious scholarship opportunities available to international students applying to UK universities this year.</p>
                <a class="inline-flex items-center gap-1.5 text-secondary-container font-bold text-sm font-headline group/link" href="#">Read Article <span class="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span></a>
            </article>
            <article class="group reveal reveal-d2">
                <div class="h-52 rounded-lg overflow-hidden mb-5 relative"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Diverse students laughing in a city street" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSqo2W_O8lTfiP64hOYVR_ZgiD--tggce3xPQEsbU0OTYO26Z4ujyaF1xbOCFZVm67bSl7YYjKUkHkrYctsY8Uxqg9TiJYhnqnASc5y469EkOognZ-VZm9hmascRhoY0HfbSgXOWPXBtTBcSIoanpp_TycouoXFAn2TSvwnNmx9KbNcxAB8gMj1BSL4xvb0PUlJs_f3SYjB3DZI_kut630O8AHZiH19R6wGq52ayKD_SRYrL-gzOe_uN855B3MePFjfggOgGSXyy1A"/><span class="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-label">Student Life</span></div>
                <p class="text-on-surface-variant text-xs font-label mb-2">March 8, 2026</p>
                <h3 class="text-white font-headline font-bold text-xl mb-3 leading-snug group-hover:text-secondary-container transition-colors">How to Manage Your Budget While Studying in the UK</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed mb-4">Practical tips on food, transport and leisure to help international students thrive financially in major UK cities.</p>
                <a class="inline-flex items-center gap-1.5 text-secondary-container font-bold text-sm font-headline group/link" href="#">Read Article <span class="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span></a>
            </article>
        </div>
    </div>
</section>

<!-- Newsletter -->
<section class="py-24 bg-surface-container-low relative overflow-hidden">
    <div class="glow-orb blob-b w-[600px] h-[600px] bg-[#00b4e0] opacity-[0.08] -right-32 -top-20 rounded-full"></div>
    <div class="glow-orb blob-a w-[400px] h-[400px] bg-[#1a3172] opacity-[0.07] -left-20 bottom-0 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-3xl text-center relative z-10 reveal">
        <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-4 text-xs uppercase">STAY INFORMED</p>
        <h2 class="text-white font-headline font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">Don't miss an update.</h2>
        <p class="text-on-surface-variant text-lg mb-8 max-w-lg mx-auto">Get intake dates, scholarship news,  updates and student success stories delivered to your inbox.</p>
        <form class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onsubmit="return false;">
            <input type="email" placeholder="Your email address" class="flex-1 bg-surface-container-high text-white placeholder-on-surface-variant/50 px-5 py-3.5 rounded-full border border-outline-variant/30 focus:border-secondary-container focus:outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all text-sm font-body" required/>
            <button type="submit" class="bg-secondary-container text-on-secondary px-7 py-3.5 rounded-full font-headline font-bold text-sm hover:scale-105 transition-transform whitespace-nowrap shadow-lg shadow-secondary-container/20">Subscribe </button>
        </form>
        <p class="text-on-surface-variant/40 text-xs font-label mt-4">No spam. Unsubscribe at any time.</p>
    </div>
</section>

<!-- Final CTA -->
<section class="py-32 relative overflow-hidden bg-background">
    <div class="glow-orb blob-c w-[800px] h-[800px] bg-secondary-container opacity-[0.08] -bottom-60 left-1/2 -translate-x-1/2 rounded-full"></div>
    <div class="glow-orb blob-a w-[400px] h-[400px] bg-primary-container opacity-[0.09] -top-10 -right-20 rounded-full"></div>
    <div class="container mx-auto px-6 lg:px-10 max-w-5xl text-center relative z-10 reveal">
        <p class="font-label text-secondary-container font-bold tracking-[0.2em] mb-5 text-xs uppercase">BE PART OF THE STORY</p>
        <h2 class="text-white font-headline font-black text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] mb-6">Ready to Take<br/><span class="text-gradient-gold">the Next Step?</span></h2>
        <p class="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto leading-relaxed">Speak to one of our expert consultants today and start your application for the March 2026 intake. Places are limited.</p>
        <div class="flex flex-wrap justify-center gap-5 mb-20">
            <a class="bg-secondary-container text-on-secondary px-10 py-4 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-secondary-container/20 flex items-center gap-2" href="#">Start Application <span class="material-symbols-outlined text-[20px]">arrow_forward</span></a>
            <a class="border border-outline-variant/30 text-white px-10 py-4 rounded-full font-headline font-bold text-lg hover:bg-white/5 hover:border-outline-variant/60 transition-all flex items-center gap-2" href="#"><span class="material-symbols-outlined text-[20px]">call</span>Speak to a Consultant</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm font-label tracking-wide">
            <div class="flex flex-col items-center gap-2 text-on-surface-variant"><span class="material-symbols-outlined text-secondary-container text-2xl">location_on</span><span>London, United Kingdom</span></div>
            <div class="flex flex-col items-center gap-2 text-on-surface-variant"><span class="material-symbols-outlined text-secondary-container text-2xl">mail</span><a href="mailto:info@smartmove.org" class="hover:text-white transition-colors">info@smartmove.org</a></div>
            <div class="flex flex-col items-center gap-2 text-on-surface-variant"><span class="material-symbols-outlined text-secondary-container text-2xl">call</span><a href="tel:+442077909233" class="hover:text-white transition-colors">020 7790 9233</a></div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="bg-surface-container-lowest border-t border-white/[0.05]">
    <div class="container mx-auto px-6 lg:px-12 max-w-7xl py-20">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div class="md:col-span-2">
                <div class="flex items-center mb-5"><img src="/images/smartmove_logo.png" alt="Smart Move Education Group" style="height:36px;width:auto;filter:brightness(0) invert(1);" /></div>
                <p class="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">Empowering international students to reach their full potential through world-class UK university education.</p>
                <div class="flex gap-3">
                    <a href="#" class="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-white/50 hover:text-white hover:bg-surface-container-highest transition-all" aria-label="Instagram"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                    <a href="#" class="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-white/50 hover:text-white hover:bg-surface-container-highest transition-all" aria-label="LinkedIn"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                    <a href="#" class="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-white/50 hover:text-white hover:bg-surface-container-highest transition-all" aria-label="Facebook"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                </div>
            </div>
            <div>
                <h4 class="text-white font-bold mb-5 text-xs uppercase tracking-widest font-label">Courses</h4>
                <ul class="space-y-3 text-sm">
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Undergraduate</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Postgraduate</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Foundation Years</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Top-up Degrees</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Scholarships</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-5 text-xs uppercase tracking-widest font-label">Company</h4>
                <ul class="space-y-3 text-sm">
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">About Us</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Our Team</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Become an Agent</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Blog</a></li>
                    <li><a class="text-white/40 hover:text-white transition-colors" href="#">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-5 text-xs uppercase tracking-widest font-label">Contact</h4>
                <ul class="space-y-3 text-sm text-white/40">
                    <li><a href="tel:02077909233" class="hover:text-white transition-colors">020 7790 9233</a></li>
                    <li><a href="tel:07894867772" class="hover:text-white transition-colors">078 9486 7772</a></li>
                    <li><a href="mailto:info@smartmove.org" class="hover:text-white transition-colors">info@smartmove.org</a></li>
                    <li class="pt-2"><img class="h-7 opacity-30 hover:opacity-55 transition-opacity" alt="British Council certified agent" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCRDK8NMuGQk-MgAv_bZVcUE8skG3k8ManlQmuxMTrDfLcw7QEDX6XFSaStV41mokfaMc2JF3-J5oL5EoTP56ELO1oLUM_BWVZcPNjqiMN9EO5F-XHvj8hItq2zIPN_xEb1-clrDR6ggnKe0v27v29_K8mISxrH0LLv5PWAiFtuVZScsqvESdNnQgd10R0DCUdpXsu_G-gn8PgvDQmzrbhxoYI_a-x6yeCbL4H19L7bLKZHdasSpcEO1AyfSBv55UXuO1eufJVpqyW"/></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="border-t border-white/[0.04]">
        <div class="container mx-auto px-6 lg:px-12 max-w-7xl py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/25 text-xs font-label">
            <p> 2026 Smart Move Education Group. Registered in England &amp; Wales. No. 12345678.</p>
            <div class="flex gap-6"><a href="#" class="hover:text-white/50 transition-colors">Privacy Policy</a><a href="#" class="hover:text-white/50 transition-colors">Terms</a><a href="#" class="hover:text-white/50 transition-colors">Cookies</a><div class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span><span>All Systems Operational</span></div></div>
        </div>
    </div>
</footer>

<script>
    // Scroll-triggered reveal
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // City tab switch
    function switchCity(btn, city) {
        document.querySelectorAll('.city-panel').forEach(p => p.classList.add('hidden'));
        document.querySelectorAll('.city-tab').forEach(t => {
            t.classList.remove('active-tab','bg-surface-container-high','text-white','border-l-[3px]','border-secondary-container');
            t.classList.add('text-white/50');
            const a = t.querySelector('.material-symbols-outlined'); if (a) a.style.opacity='0';
        });
        const panel = document.getElementById('city-'+city);
        if (panel) panel.classList.remove('hidden');
        btn.classList.remove('text-white/50');
        btn.classList.add('active-tab','bg-surface-container-high','text-white','border-l-[3px]','border-secondary-container');
        const a = btn.querySelector('.material-symbols-outlined'); if (a) { a.style.opacity='1'; a.style.color='#00b4e0'; }
    }
</script>
</body>
</html>

