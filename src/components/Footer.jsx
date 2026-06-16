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
                        We build developer tools, WebGL experiments, and SaaS platforms.
                    </p>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                        <p>General: contact@algoryx.com</p>
                        <p>Partnerships: partners@algoryx.com</p>
                        <p style={{ marginTop: '10px' }}>Mon – Fri, 9:00 AM – 6:00 PM IST</p>
                    </div>
                </div>

                {[
                    { title: "Products", links: [{ name: "Breakpoint", href: "https://breakpoint-web-one.vercel.app" }, { name: "Developer Tools", href: "#products" }, { name: "AI Systems", href: "#products" }, { name: "3D Showcase", href: "/objects.html" }] },
                    { title: "Company", links: [{ name: "About Us", href: "#about" }, { name: "Research", href: "#research" }, { name: "Careers", href: "#company" }, { name: "FAQ", href: "#faq" }] },
                    { title: "Legal", links: [{ name: "Privacy Policy", href: "#" }, { name: "Terms & Conditions", href: "#" }] }
                ].map((col, i) => (
                    <div key={i}>
                        <h4 style={{ marginBottom: '25px', fontSize: '1.1rem', color: '#fff' }}>{col.title}</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {col.links.map((link, j) => (
                                <li key={j} style={{ marginBottom: '12px' }}>
                                    <a href={link.href} style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        transition: '0.3s'
                                    }} className="footer-link">
                                        {link.name}
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
