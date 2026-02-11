import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const securityFeatures = [
    { icon: <Lock size={24} />, title: "Encrypted Transmission", desc: "Military-grade data transmission protocols." },
    { icon: <Shield size={24} />, title: "Access Management", desc: "Strictly controlled and audited access layers." },
    { icon: <Eye size={24} />, title: "Continuous Monitoring", desc: "Live system performance and integrity tracking." },
    { icon: <FileText size={24} />, title: "Responsible Reporting", desc: "Structured vulnerability disclosure procedures." }
];

const Security = () => {
    return (
        <section id="security" style={{ background: '#000000' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px' }}>
                        Security <span className="gradient-text">Integrity</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
                        Operational acceleration must never compromise system integrity. Algoryx integrates security as a foundational system layer.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {securityFeatures.map((f, i) => (
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

export default Security;
