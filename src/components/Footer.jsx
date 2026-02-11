import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '80px 5%',
            background: '#000000',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '60px'
            }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                        {/* Logo specifically requested to be present beside text */}
                        <img
                            src="/logo.png"
                            alt="Algoryx Logo"
                            style={{
                                height: '32px',
                                width: 'auto',
                                display: 'block',
                                flexShrink: 0
                            }}
                        />
                        <span style={{
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            letterSpacing: '-1px',
                            color: '#fff',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            ALGORYX
                        </span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '300px', lineHeight: 1.6, marginBottom: '25px' }}>
                        The future of operational intelligence. Engineered for maximum speed and precision.
                    </p>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                        <p>General: contact@algoryx.com</p>
                        <p>Sales: sales@algoryx.com</p>
                        <p style={{ marginTop: '10px' }}>Mon – Fri, 9:00 AM – 6:00 PM IST</p>
                    </div>
                </div>

                {[
                    { title: "Solutions", links: ["Process Acceleration", "Intelligent Automation", "System Optimization"] },
                    { title: "Company", links: ["About Us", "Our Approach", "Security", "FAQ"] },
                    { title: "Legal", links: ["Privacy Policy", "Terms & Conditions"] }
                ].map((col, i) => (
                    <div key={i}>
                        <h4 style={{ marginBottom: '25px', fontSize: '1.1rem', color: '#fff' }}>{col.title}</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {col.links.map((link, j) => (
                                <li key={j} style={{ marginBottom: '12px' }}>
                                    <a href="#" style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        transition: '0.3s'
                                    }} className="footer-link">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="container" style={{
                marginTop: '60px',
                paddingTop: '40px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.8rem'
            }}>
                <p>Algoryx © 2026. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
