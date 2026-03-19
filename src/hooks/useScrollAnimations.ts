import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrubOptions {
  x?: number;
  y?: number;
  opacity?: number;
  duration?: number;
  scrub?: number;
  start?: string;
  end?: string;
  delay?: number;
}

// Anime un élément depuis un bord avec scrub
export const useScrubReveal = (
  ref: React.RefObject<HTMLElement | null>,
  direction: 'left' | 'right' | 'up',
  options?: ScrubOptions
) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const fromX = direction === 'left' ? -(options?.x ?? 150) : direction === 'right' ? (options?.x ?? 150) : 0;
    const fromY = direction === 'up' ? (options?.y ?? 60) : 0;

    gsap.set(el, { x: fromX, y: fromY, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: options?.start ?? 'top 92%',
      end: options?.end ?? 'top 20%',
      scrub: options?.scrub ?? 1.2,
      animation: gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
      }),
    });

    return () => trigger.kill();
  }, []);
};

// Anime une liste d'éléments en stagger scrub
export const useScrubStagger = (
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  options?: ScrubOptions & { stagger?: number }
) => {
  useEffect(() => {
    if (!containerRef.current) return;
    const els = Array.from(containerRef.current.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    const triggers: ScrollTrigger[] = [];

    els.forEach((el: HTMLElement, i: number) => {
      const fromX = i % 2 === 0 ? -(options?.x ?? 120) : (options?.x ?? 120);
      gsap.set(el, { x: fromX, opacity: 0 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: options?.start ?? 'top 92%',
        end: options?.end ?? 'top 20%',
        scrub: options?.scrub ?? 1.2,
        animation: gsap.to(el, {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
        }),
      });

      triggers.push(trigger);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);
};

// CountUp animé au scroll
export const useCountUp = (
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  options?: { prefix?: string; suffix?: string; duration?: number }
) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: options?.duration ?? 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${options?.prefix ?? ''}${Math.round(obj.val)}${options?.suffix ?? ''}`;
      },
    });
  }, []);
};

export default { useScrubReveal, useScrubStagger, useCountUp };
