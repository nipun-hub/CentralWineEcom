import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top when location changes (on route change)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    return null;
};

export default ScrollToTop;