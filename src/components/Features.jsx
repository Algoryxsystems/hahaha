import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Globe, Layers, Activity } from 'lucide-react';

const features = [
    {
        icon: <Layers size={32} />,
        title: "Breakpoint",
        desc: "Security analysis, built for speed. Scans dependencies, flags vulnerabilities, and protects your network."
    },
    {
        icon: <Cpu size={32} />,
        title: "AI Systems",
        desc: "Pragmatic AI. Developer autocomplete, log analysis, and semantic search interfaces that just work."
    },
    {
        icon: <Zap size={32} />,
        title: "Developer Tools",
        desc: "CLI tools and browser extensions. Designed to speed up your local workflow and save you keystrokes."
    },
    {
        icon: <Globe size={32} />,
        title: "3D Asset Platform",
        desc: "A collection of interactive WebGL components. Free to download, copy, and use in your own projects."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Creative Tech",
        desc: "WebGL playgrounds, canvas animations, and interactive frontend experiments."
    },
    {
        icon: <Activity size={32} />,
        title: "Future Ventures",
        desc: "We build and test ideas quickly, then ship the ones that show promise."
    }
];

const Features = () => {
    return (
        <section id="products" style={{ background: '#000000' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>
                        What we're <span className="gradient-text">building</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
                        We build standalone tools. Here's what's currently active in our software lab.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card"
                            style={{ padding: '40px' }}
                            whileHover={{
                                y: -10,
                                borderColor: 'rgba(112, 0, 255, 0.4)',
                                background: 'rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            <div style={{
                                color: 'var(--accent-purple)',
                                marginBottom: '20px',
                                background: 'rgba(112, 0, 255, 0.1)',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '16px'
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{f.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        marginTop: '80px',
                        padding: '40px',
                        background: 'linear-gradient(90deg, rgba(112, 0, 255, 0.05), transparent)',
                        border: '1px solid rgba(112, 0, 255, 0.1)',
                        borderRadius: '24px',
                        textAlign: 'center'
                    }}
                >
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.8)',
                        margin: 0,
                        fontWeight: 500,
                        letterSpacing: '0.02em'
                    }}>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>Open Source first:</span> We write open-source code and build tools for developers. Check out our GitHub for more.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
