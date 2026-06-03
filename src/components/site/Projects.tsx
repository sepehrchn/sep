import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { TiltCard } from "./TiltCard";

interface Project {
  url: string;
  bgClass: string;
  centerText: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  github: string;
  demo: string;
  screenshots?: { src: string; alt: string }[];
}

const projects: Project[] = [
  {
    url: "arianasepehr.vercel.app",
    bgClass: "bg-gradient-to-br from-[#1a2030] via-[#0f1520] to-[#0a0e18]",
    centerText: "B2B Export Platform",
    category: "Full-Stack · Next.js · AI Integration",
    title: "Ariana Global Trade — B2B Export Portal",
    description:
      "A premium B2B showcase for an agricultural commodities exporter targeting international wholesale importers. Built with genuine engineering depth: multi-language support including full Persian RTL layout switching, a dynamic volume-based pricing calculator, and an OpenAI-powered pre-qualification chatbot that routes leads automatically.",
    highlights: [
      "RTL/LTR layout switching under 180ms (EN · FA · HY)",
      "AI chat concierge with OpenAI API + graceful fallback handling",
      "Volume-tier pricing calculator running entirely client-side",
      "Responsive across 5 viewport breakpoints with sub-180ms page load",
    ],
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "OpenAI API", "RTL Support", "React 19", "Vercel"],
    github: "https://github.com/sepehrjo/ariana-b2b-export",
    demo: "https://arianasepehr.vercel.app",
    screenshots: [
      { src: "/images/Ariana-Image/preview-en.png", alt: "Ariana homepage in English" },
      { src: "/images/Ariana-Image/languages-support.png", alt: "Multi-language support" },
      { src: "/images/Ariana-Image/chatbot-sensitivity.png", alt: "AI chatbot instant quote" },
      { src: "/images/Ariana-Image/quote-inquiry.png", alt: "Quote inquiry form" },
    ],
  },
  {
    url: "adart-alpha.vercel.app",
    bgClass: "bg-[#0B0B0B]",
    centerText: "Creative Agency Website",
    category: "Frontend · React 19 · Three.js · WebGL",
    title: "FORMA Studio — Art Direction & Advertising",
    description:
      "A premium showcase website for FORMA, an avant-garde art direction and advertising studio — built to demonstrate advanced frontend engineering. The centrepiece is a real-time Three.js WebGL scene in the hero that pauses GPU rendering via IntersectionObserver when off-screen, maintaining 60fps across all device tiers. The site is fully multilingual across four scripts — including dynamic Persian RTL — built entirely in CSS Modules.",
    highlights: [
      "Three.js WebGL 3D hero with IntersectionObserver render-pausing — zero GPU/CPU usage when scrolled out of view",
      "Full RTL/LTR layout engine for EN · RU · FA · HY via i18next with mirrored grid, alignment, and absolute positioning",
      "Zero-Tailwind CSS Modules architecture — fully scoped styles with no global override risk across every component",
    ],
    tags: ["React 19", "TypeScript", "Three.js", "@react-three/fiber", "Framer Motion", "i18next", "RTL Support", "CSS Modules", "Vite"],
    github: "https://github.com/sepehrjo/Ad_Art_Web",
    demo: "https://adart-alpha.vercel.app",
    screenshots: [
      { src: "/images/Forma-Image/hero_en.png", alt: "FORMA hero with Three.js WebGL scene" },
      { src: "/images/Forma-Image/portfolio.png", alt: "FORMA portfolio section" },
      { src: "/images/Forma-Image/journal.png", alt: "FORMA journal" },
      { src: "/images/Forma-Image/contact.png", alt: "FORMA contact section" },
      { src: "/images/Forma-Image/assistant_active.png", alt: "FORMA AI assistant" },
    ],
  },
];

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--border)] bg-black/40 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      <div className="ml-4 flex-1 rounded bg-black/40 px-3 py-1 font-mono-ui text-xs text-text-tertiary">{url}</div>
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-green-400/30 bg-black/60 px-3 py-1 backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative h-2 w-2 rounded-full bg-green-400" />
      </span>
      <span className="font-mono-ui text-xs font-semibold tracking-wider text-green-400">LIVE</span>
    </div>
  );
}

function ScreenshotCarousel({ shots }: { shots: { src: string; alt: string }[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % shots.length), 3500);
    return () => clearInterval(t);
  }, [shots.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={`img-${idx}`}
          src={shots[idx].src}
          alt={shots[idx].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center justify-center gap-2 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-md">
          {shots.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIdx(i)}
              className="h-2 w-2 rounded-full"
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{
                scale: idx === i ? 1.2 : 0.8,
                opacity: idx === i ? 1 : 0.7,
                backgroundColor: idx === i ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
              }}
              whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.7)" }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono-ui text-sm text-accent">// selected work</div>
          <h2 className="font-display mt-4 text-4xl font-bold md:text-5xl">Real Code. Real Demos.</h2>
          <p className="mt-4 text-base text-text-secondary md:text-lg">
            These aren't mockups. Click the links — they actually load.
          </p>
        </motion.div>

        <div className="mt-14 space-y-10" style={{ perspective: 1400 }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard max={4} className="group">
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-bg-card transition-all duration-300 group-hover:border-[var(--border-hover)] group-hover:shadow-[0_0_32px_var(--accent-glow)]">
                  {/* Browser mockup */}
                  <div className="relative">
                    <BrowserChrome url={p.url} />
                    <div className={`relative flex h-72 items-center justify-center overflow-hidden md:h-96 ${p.bgClass}`}>
                      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
                      
                      {p.screenshots && p.screenshots.length > 0 ? (
                        <ScreenshotCarousel shots={p.screenshots} />
                      ) : (
                        <h3 className="font-display relative px-6 text-center text-3xl font-bold text-text-primary md:text-5xl">
                          {p.centerText}
                        </h3>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8 md:p-10">
                    <div className="font-mono-ui text-xs uppercase tracking-wider text-accent">{p.category}</div>
                    <h4 className="font-display mt-3 text-2xl font-semibold md:text-3xl">{p.title}</h4>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary md:text-base">{p.description}</p>

                    <ul className="mt-6 space-y-2">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-text-secondary">
                          <span className="text-accent">→</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--border)] bg-black/30 px-3 py-1 font-mono-ui text-xs text-text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-bg-card px-4 py-2 text-sm transition-colors hover:border-[var(--border-hover)] hover:text-accent"
                      >
                        <Github size={16} /> GitHub
                      </a>
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm text-white shadow-[0_0_16px_var(--accent-glow)] transition-colors hover:bg-accent-hover"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
