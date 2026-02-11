import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Product', href: '#product' },
        { name: 'Solutions', href: '#solutions' },
        { name: 'Security', href: '#security' },
        { name: 'Company', href: '#company' }
    ];

    return (
        <nav className="glass-nav" style={{ padding: '0 5%', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/logo.png" alt="Algoryx" style={{ height: '32px', width: 'auto' }} />
                    <span style={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-1px',
                        color: '#fff'
                    }}>
                        ALGORYX
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-only" style={{
                    display: 'flex',
                    gap: '40px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.7)'
                }}>
                    {navLinks.map((item) => (
                        <motion.a
                            href={item.href}
                            key={item.name}
                            whileHover={{ color: '#fff' }}
                            style={{ textDecoration: 'none', color: 'inherit', transition: '0.3s' }}
                        >
                            {item.name}
                        </motion.a>
                    ))}
                </div>

                <div className="desktop-only">
                    <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                        Launch Breakpoint
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-only" onClick={toggleMenu} style={{ cursor: 'pointer', color: '#fff' }}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            overflow: 'hidden',
                            background: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(20px)',
                            width: '100%',
                            position: 'absolute',
                            top: '80px',
                            left: 0,
                            padding: '20px 5%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {navLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    padding: '10px 0'
                                }}
                            >
                                {item.name}
                            </a>
                        ))}
                        <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                            Launch Breakpoint
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
