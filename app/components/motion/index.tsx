'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, type Key, type ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

type InViewSectionProps = {
  children: ReactNode;
  triggerKey?: Key; // external trigger
};

export const InViewSection = ({ children, triggerKey }: InViewSectionProps) => {
  const { i18n } = useTranslation();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  const initial = { opacity: 0, filter: 'blur(20px)', y: 100 };
  const visible = { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.5 } };

  useEffect(() => {
    if (inView) {
      controls.start(visible);
    } else {
      controls.set(initial);
    }
  }, [inView, controls]);

  useEffect(() => {
    if (inView) {
      controls.set(initial);
      void controls.start(visible);
    }
  }, [i18n.language, inView, controls]);

  useEffect(() => {
    if (inView) {
      controls.set(initial);
      void controls.start(visible);
    }
  }, [triggerKey, inView, controls]);

  return (
    <motion.div ref={ref} animate={controls} initial={initial}>
      {children}
    </motion.div>
  );
};
