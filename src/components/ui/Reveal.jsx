import { useEffect, useRef, useState } from 'react';

const DELAY_CLASSES = {
  0: '',
  75: 'delay-75',
  100: 'delay-100',
  150: 'delay-150',
  200: 'delay-200',
  300: 'delay-300'
};

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const delayClass = DELAY_CLASSES[delay] ?? '';

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
