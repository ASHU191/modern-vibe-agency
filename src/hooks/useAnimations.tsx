
import { useEffect, useState, useRef, RefObject } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }
): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible];
}

export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
}

export function useMouseTrail() {
  useEffect(() => {
    const trailElement = document.createElement('div');
    trailElement.className = 'mouse-trail';
    document.body.appendChild(trailElement);

    const updateTrail = (e: MouseEvent) => {
      trailElement.style.left = `${e.clientX}px`;
      trailElement.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', updateTrail);

    return () => {
      window.removeEventListener('mousemove', updateTrail);
      trailElement.remove();
    };
  }, []);
}

export function useParallax(speed: number = 0.2): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const element = ref.current;
      const translateY = scrollY * speed;
      
      element.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return ref;
}
