'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled more than 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-700 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-primary-400"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
