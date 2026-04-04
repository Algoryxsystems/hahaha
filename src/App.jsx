import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';

import IndustryProblem from './components/IndustryProblem';
import RisingBlocks3D from './components/RisingBlocks';
import RobotSection from './components/RobotSection';
import AnalyticsSection from './components/AnalyticsSection';
import Company from './components/Company';
import Process from './components/Process';
import Security from './components/Security';
import Features from './components/Features';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CinematicSequence from './components/CinematicSequence';
import Preloader from './components/Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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

function App() {
    useEffect(() => {
        // Initialize Lenis for professional smooth scrolling
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

        requestAnimationFrame(raf);

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

        // Ensure perfect reload positioning
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="app-container" style={{ background: '#000000', minHeight: '100vh', color: '#fff' }}>
            <Preloader />
            <GrainOverlay />

            {/* Background Animation Engine */}
            <CinematicSequence />

            <Navbar />

            {/* Main Sections */}
            <div className="content-reveal" style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
                <div className="reveal-section"><TrustedBy /></div>
                <div className="reveal-section"><IndustryProblem /></div>
                <div id="approach-spacer" style={{ height: '15vh', pointerEvents: 'none' }} />
                <div className="reveal-section"><RisingBlocks3D /></div>
                <div className="reveal-section"><RobotSection /></div>
                <div className="reveal-section"><AnalyticsSection /></div>
                <div className="reveal-section"><Features /></div>
                <div className="reveal-section"><Process /></div>
                <div className="reveal-section"><Company /></div>
                <div className="reveal-section"><Security /></div>
                <div className="reveal-section"><FAQ /></div>
                <div className="reveal-section"><CTA /></div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
