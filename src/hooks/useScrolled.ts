import { useEffect, useState } from 'react';

export function useScrolled(offset = 20): boolean {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > offset);
        window.addEventListener('scroll', handle, { passive: true });
        handle();
        return () => window.removeEventListener('scroll', handle);
    }, [offset]);

    return scrolled;
}
