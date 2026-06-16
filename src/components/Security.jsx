import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Activity, FileText } from 'lucide-react';

const engineeringFeatures = [
    { icon: <Cpu size={24} />, title: "Rust & Go", desc: "We write performance-critical paths in languages that don't have garbage collection pauses." },
    { icon: <Layers size={24} />, title: "Keep it simple", desc: "Decoupled codebases and micro-frontends mean less merge conflicts and easier deploys." },
    { icon: <Activity size={24} />, title: "Rapid builds", desc: "We prototype new concepts in days, not months. If a design doesn't work, we pivot fast." },
    { icon: <FileText size={24} />, title: "Give back", desc: "We open-source our core libraries, publish our findings, and contribute to developer tools." }
];

const ResearchStandards = () => {
    return (
        <section id="research" style={{ background: '#000000' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px' }}>
                        Engineering <span className="gradient-text">Principles</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
                        We believe software should be reliable, readable, and lightning fast. Here are the standards we stick to.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {engineeringFeatures.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5, background: 'rgba(255,255,255,0.04)' }}
                            style={{
                                padding: '35px 30px',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ color: 'var(--accent-blue)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                {f.icon}
                            </div>
                            <h4 style={{ marginBottom: '10px', color: '#fff', fontSize: '1.2rem' }}>{f.title}</h4>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchStandards;
