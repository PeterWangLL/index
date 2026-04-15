"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/peterwangll" },
  { name: "Email", href: "mailto:your-email@example.com" },
];

const words = "There are countless ways to tell a story about the world, this is mine.".split(" ");

export default function Contact() {
  return (
    <footer id="contact" className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-24">
      {/* Motto with word-by-word fade-in */}
      <motion.blockquote
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
          hidden: {},
        }}
        className="max-w-3xl text-center text-2xl font-medium leading-relaxed tracking-tight text-foreground/90 sm:text-3xl md:text-4xl"
      >
        &ldquo;
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
        &rdquo;
      </motion.blockquote>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 flex items-center gap-8"
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-full p-3 text-foreground/60 transition-all hover:bg-[#F9ED69]/30 hover:text-[#B83B5E]"
            aria-label={link.name}
          >
            {link.name === "GitHub" ? (
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </a>
        ))}
      </motion.div>

      <p className="mt-20 text-xs text-foreground/40">
        © {new Date().getFullYear()} Peter Wang. All rights reserved.
      </p>
    </footer>
  );
}
