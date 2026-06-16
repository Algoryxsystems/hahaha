import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Share2 } from 'lucide-react';

const Hero = () => {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" style={{ padding: 0, position: 'relative', overflow: 'hidden', background: 'transparent' }}>
            {/* Hero Content */}
            <div className="container responsive-grid" style={{
                position: 'relative',
                zIndex: 2,
                pointerEvents: 'none',
                minHeight: '100vh',
                alignItems: 'center'
            }}>
                <div style={{ padding: '0 20px' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                    >
                        <span style={{
                            color: 'var(--accent-purple)',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            TECHNOLOGY LAB & PRODUCT STUDIO
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 10vw, 6rem)',
                            lineHeight: 1,
                            fontWeight: 800,
                            marginBottom: '2rem',
                            textAlign: 'left',
                            color: '#fff'
                        }}>
                            We build software <br />
                            <span className="gradient-text">that ships.</span>
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            marginBottom: '3rem',
                            lineHeight: 1.6,
                            textAlign: 'left'
                        }}>
                            Algoryx is a software company. We build tools we want to use—from developer platforms and graphics engines to AI tools and SaaS. No fluff, just good code.
                        </p>

                        <div style={{ display: 'flex', gap: '15px', pointerEvents: 'auto', flexWrap: 'wrap' }}>
                            <button 
                                className="btn-primary" 
                                style={{ padding: '12px 32px' }}
                                onClick={() => scrollToSection('products')}
                            >
                                Current Products
                            </button>
                            <button 
                                style={{
                                    background: 'transparent',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '12px 32px',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '0.95rem'
                                }}
                                onClick={() => scrollToSection('research')}
                            >
                                Future Initiatives
                            </button>
                        </div>
                    </motion.div>

                    {/* Floating Stats or Badges */}
                    <div style={{
                        marginTop: '5rem',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '30px',
                        flexWrap: 'wrap'
                    }}>
                        {[
                            { icon: <Cpu size={18} />, label: "AI Experiments" },
                            { icon: <Code size={18} />, label: "Developer Tools" },
                            { icon: <Share2 size={18} />, label: "Open Source" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: '0.85rem',
                                    fontWeight: 500
                                }}
                            >
                                <div style={{ color: 'var(--accent-purple)' }}>{item.icon}</div>
                                {item.label}
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Right side spacer for logo formation - stacks on mobile natively now */}
                <div className="desktop-only" />
            </div>
        </section>
    );
};

export default Hero;
