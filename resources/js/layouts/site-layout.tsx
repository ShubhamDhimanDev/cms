import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import { Head } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';

interface SiteLayoutProps {
    children: ReactNode;
    title?: string;
    activePage?: string;
}

export default function SiteLayout({ children, title = 'Smart Move Education Group', activePage = 'home' }: SiteLayoutProps) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.07 },
        );

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <style>{`
                    .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
                    body { overflow-x: hidden; }
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
                    @keyframes fadeUpAnim { 0%{opacity:0;transform:translateY(32px)} 100%{opacity:1;transform:translateY(0)} }
                    @keyframes marqueeAnim { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
                    @keyframes pulseGlowAnim { 0%,100%{opacity:.6} 50%{opacity:1} }
                    .animate-fadeUp { animation:fadeUpAnim .7s ease both; }
                    .animate-fadeUp-d1 { animation:fadeUpAnim .7s ease .2s both; }
                    .animate-fadeUp-d2 { animation:fadeUpAnim .7s ease .4s both; }
                    .animate-fadeUp-d3 { animation:fadeUpAnim .7s ease .6s both; }
                    .animate-pulseGlow { animation:pulseGlowAnim 3s ease-in-out infinite; }
                    .animate-marquee { animation:marqueeAnim 30s linear infinite; }
                    @keyframes bounceAnim { 0%,100%{transform:translateY(-10%)} 50%{transform:translateY(0)} }
                    .lp-bounce { animation:bounceAnim 1s infinite; }
                `}</style>
            </Head>

            <div className="bg-[#131313] text-[#e5e2e1] font-body">
                <SiteHeader activePage={activePage} />
                {children}
                <SiteFooter />
            </div>
        </>
    );
}
