import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(element);
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isInView];
}
