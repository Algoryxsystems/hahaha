import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSection, setActiveSection] = useState('');
    const [isObjectsPage, setIsObjectsPage] = useState(false);

    useEffect(() => {
        setIsObjectsPage(window.location.pathname.includes('objects.html'));
    }, []);

    useEffect(() => {
        if (isObjectsPage) {
            setActiveSection('/objects.html');
            return;
        }

        const handleScroll = () => {
            const sections = ['about', 'products', 'research', 'careers', 'contact'];
            const scrollPosition = window.scrollY + 120; // Offset for navbar height and breathing room

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(`#${section}`);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isObjectsPage]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'About', href: isObjectsPage ? '/index.html#about' : '#about' },
        {
            name: 'Products',
            href: isObjectsPage ? '/index.html#products' : '#products',
            dropdown: [
                { name: 'Breakpoint', href: 'https://breakpoint-web-one.vercel.app', external: true },
                { name: 'Developer Tools', href: isObjectsPage ? '/index.html#products' : '#products' },
                { name: 'AI Systems', href: isObjectsPage ? '/index.html#products' : '#products' }
            ]
        },
        { name: '3D Objects', href: '/objects.html' },
        { name: 'Research', href: isObjectsPage ? '/index.html#research' : '#research' },
        { name: 'Careers', href: isObjectsPage ? '/index.html#careers' : '#careers' },
        { name: 'Contact', href: isObjectsPage ? '/index.html#contact' : '#contact' }
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
                        <div
                            key={item.name}
                            style={{ position: 'relative' }}
                            onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                            onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                        >
                            <motion.a
                                href={item.href}
                                whileHover={{ color: '#fff' }}
                                style={{
                                    textDecoration: 'none',
                                    color: activeSection === item.href ? '#fff' : 'inherit',
                                    fontWeight: activeSection === item.href ? 600 : 500,
                                    transition: '0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    borderBottom: activeSection === item.href ? '2px solid var(--accent-purple)' : '2px solid transparent',
                                    paddingBottom: '4px'
                                }}
                            >
                                {item.name}
                                {item.dropdown && <ChevronDown size={14} />}
                            </motion.a>

                            {item.dropdown && (
                                <AnimatePresence>
                                    {activeDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: '-20px',
                                                paddingTop: '20px',
                                                zIndex: 100
                                            }}
                                        >
                                            <div className="glass-card" style={{
                                                padding: '15px',
                                                minWidth: '180px',
                                                background: 'rgba(10, 10, 10, 0.95)',
                                                backdropFilter: 'blur(20px)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '10px',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                            }}>
                                                {item.dropdown.map((dropItem) => (
                                                    <a
                                                        key={dropItem.name}
                                                        href={dropItem.href}
                                                        target={dropItem.external ? "_blank" : "_self"}
                                                        rel={dropItem.external ? "noopener noreferrer" : ""}
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'rgba(255,255,255,0.6)',
                                                            fontSize: '0.85rem',
                                                            transition: '0.2s',
                                                            padding: '8px 12px',
                                                            borderRadius: '8px',
                                                            display: 'block'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.color = '#fff';
                                                            e.target.style.background = 'rgba(255,255,255,0.05)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.color = 'rgba(255,255,255,0.6)';
                                                            e.target.style.background = 'transparent';
                                                        }}
                                                    >
                                                        {dropItem.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
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
                            gap: '15px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {navLinks.map((item) => (
                            <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <a
                                    href={item.href}
                                    onClick={() => !item.dropdown && setIsMenuOpen(false)}
                                    style={{
                                        textDecoration: 'none',
                                        color: activeSection === item.href ? 'var(--accent-purple)' : '#fff',
                                        fontSize: '1.1rem',
                                        fontWeight: activeSection === item.href ? 700 : 500,
                                        padding: '10px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {item.name}
                                </a>
                                {item.dropdown && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        paddingLeft: '20px',
                                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                                        marginBottom: '10px'
                                    }}>
                                        {item.dropdown.map((dropItem) => (
                                            <a
                                                key={dropItem.name}
                                                href={dropItem.href}
                                                target={dropItem.external ? "_blank" : "_self"}
                                                rel={dropItem.external ? "noopener noreferrer" : ""}
                                                onClick={() => setIsMenuOpen(false)}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'rgba(255,255,255,0.5)',
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {dropItem.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
