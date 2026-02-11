import React from 'react';
import { motion } from 'framer-motion';

const Company = () => {
    return (
        <section id="company" style={{ background: '#000000' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="responsive-grid" style={{ alignItems: 'flex-start', gap: 'clamp(40px, 10vw, 100px)' }}>
                    <div>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                            About US
                        </span>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, margin: '20px 0', lineHeight: 1.1 }}>
                            Engineers of <br />
                            <span className="gradient-text">Operational Intelligence.</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, marginBottom: '30px' }}>
                            Algoryx is a technology organization specializing in operational acceleration systems. We design intelligent solutions that enhance productivity, reduce execution delays, and optimize business processes at scale.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '60px' }}>
                            <div>
                                <h4 style={{ color: '#fff', marginBottom: '10px' }}>Mission</h4>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>To reduce time wastage in industrial and organizational processes through precision-engineered technology systems.</p>
                            </div>
                            <div>
                                <h4 style={{ color: '#fff', marginBottom: '10px' }}>Vision</h4>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>To lead the evolution of operational intelligence where efficiency and speed define modern industry performance.</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: 'clamp(25px, 5vw, 50px)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#fff' }}>Core Values</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                "Efficiency-Driven Innovation",
                                "Engineering Precision",
                                "Security by Design",
                                "Scalable Architecture",
                                "Long-Term Reliability"
                            ].map((v, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)', flexShrink: 0 }} />
                                    {v}
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Who We Serve</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {[
                                    "Tech-driven enterprises",
                                    "Operations-heavy industries",
                                    "Growing organizations",
                                    "Time-sensitive teams"
                                ].map((tag, i) => (
                                    <span key={i} style={{ padding: '8px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Company;
