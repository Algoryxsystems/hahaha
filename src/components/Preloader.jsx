import React, { useEffect, useState } from 'react';

const preloaderStyles = `
@keyframes preloaderSlide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes preloaderFadeInUp {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

const Preloader = ({ onComplete }) => {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log("Preloader: mounted, scheduling timer for 2200ms");
        const timer = setTimeout(() => {
            console.log("Preloader: timer fired, setting loading to false (fading out)");
            setLoading(false);
        }, 2200);

        return () => {
            console.log("Preloader: unmounting / cleaning up mount timer");
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log("Preloader: fading out, scheduling unmount timer for 800ms");
            const timer = setTimeout(() => {
                console.log("Preloader: unmount timer fired, removing from DOM");
                setVisible(false);
            }, 800);

            return () => {
                console.log("Preloader: cleaning up unmount timer");
                clearTimeout(timer);
            };
        }
    }, [loading]);

    useEffect(() => {
        if (!visible && onComplete) {
            console.log("Preloader: calling onComplete");
            onComplete();
        }
    }, [visible, onComplete]);

    console.log("Preloader: render state, loading =", loading, "visible =", visible);

    if (!visible) return null;

    return (
        <>
            <style>{preloaderStyles}</style>
            <div
                id="preloader-overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    backgroundColor: '#000000',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: loading ? 1 : 0,
                    pointerEvents: loading ? 'auto' : 'none'
                }}
            >
                <div style={{ position: 'relative', width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, var(--accent-purple), transparent)',
                            animation: 'preloaderSlide 1.8s ease-in-out forwards'
                        }}
                    />
                </div>
                <div
                    style={{
                        marginTop: '20px',
                        color: '#fff',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        letterSpacing: '0.4em',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        animation: 'preloaderFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
                        opacity: 0
                    }}
                >
                    Algoryx
                </div>
            </div>
        </>
    );
};

export default Preloader;
