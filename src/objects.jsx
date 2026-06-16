import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar.jsx';
import ThreeDObjects from './components/ThreeDObjects.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const GrainOverlay = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.04,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }} />
);

const ObjectsPage = () => {
    const [isSiteReady, setIsSiteReady] = useState(false);

    useEffect(() => {
        // Reset scroll position on load
        window.scrollTo(0, 0);

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1,
            smoothTouch: false,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        const rafId = requestAnimationFrame(raf);

        // Sync GSAP with Lenis
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Reveal animations on scroll
        const sections = document.querySelectorAll('.reveal-section');
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, scale: 0.995, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        ScrollTrigger.refresh();

        window.history.scrollRestoration = 'manual';

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="app-container" style={{ background: '#000000', minHeight: '100vh', color: '#fff' }}>
            <Preloader onComplete={() => setIsSiteReady(true)} />
            <GrainOverlay />
            <Navbar />
            
            <div style={{ paddingTop: '80px' }}>
                <ThreeDObjects isSiteReady={isSiteReady} />
                <Footer />
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ObjectsPage />
    </React.StrictMode>,
);
