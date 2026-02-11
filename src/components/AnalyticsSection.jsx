import React from 'react';
import { motion } from 'framer-motion';

const statItems = [
    { label: "Process Latency", value: "-85%", color: "#7000ff" },
    { label: "Repetitive Tasks", value: "90%", color: "#0070ff" },
    { label: "System Response", value: "3x Faster", color: "#ff00c8" },
    { label: "Data Movement", value: "Streamlined", color: "#00d0ff" }
];

const AnalyticsSection = () => {
    return (
        <section id="analytics" style={{ background: '#000000', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="responsive-grid" style={{ alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '24px' }}>
                            The Cost of <br />
                            <span className="gradient-text">Inefficiency.</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '40px' }}>
                            Operational delays and manual dependencies lead to measurable time loss. Time inefficiency is not an operational inconvenience — it is a structural business risk.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
                            {statItems.map((item, i) => (
                                <div key={i} style={{ padding: '20px', borderLeft: `2px solid ${item.color}`, background: 'rgba(255,255,255,0.02)' }}>
                                    <h4 style={{ color: item.color, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                                        {item.label}
                                    </h4>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="glass-card"
                        style={{
                            height: 'auto',
                            minHeight: '400px',
                            padding: '30px',
                            background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.05), rgba(0, 112, 255, 0.05))',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Mock Dashboard UI */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {[70, 40, 90, 60, 80].map((width, i) => (
                                <div key={i} style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${width}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        style={{
                                            height: '100%',
                                            background: i === 2 ? 'var(--accent-pink)' : 'var(--accent-purple)',
                                            borderRadius: '5px',
                                            boxShadow: '0 0 15px rgba(112, 0, 255, 0.3)'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>CORE STABILITY</span>
                                <span style={{ fontSize: '0.7rem', color: '#00ff00' }}>OPTIMIZED</span>
                            </div>
                            <div style={{ height: '120px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                                <svg width="100%" height="100%" style={{ position: 'absolute', bottom: 0 }} preserveAspectRatio="none" viewBox="0 0 500 100">
                                    <path
                                        d="M0,80 Q50,20 100,60 T200,30 T300,70 T400,20 T500,80"
                                        fill="none"
                                        stroke="var(--accent-blue)"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Glowing effect */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-50px',
                            right: '-50px',
                            width: '150px',
                            height: '150px',
                            background: 'radial-gradient(circle, rgba(112, 0, 255, 0.2) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsSection;
