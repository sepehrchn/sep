import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  const focus = t("about.focus", { returnObjects: true }) as string[];
  const sidebarObj = t("about.sidebar", { returnObjects: true }) as Record<string, string>;
  const sidebar = Object.entries(sidebarObj);
  return (
    <section id="about" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono-ui text-sm text-accent">// {t("about.label")}</div>
            <h2 className="font-display mt-4 text-4xl font-bold leading-tight md:text-5xl">
              {t("about.title")}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>{t("about.description1")}</p>
              <p>{t("about.description2")}</p>
              <p>{t("about.description3")}</p>
            </div>

            <ul className="mt-8 space-y-2">
              {focus.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-text-secondary md:text-base">
                  <span className="text-accent">→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-xl border border-[var(--border)] bg-bg-card p-6"
          >
            <div className="font-mono-ui text-xs uppercase tracking-wider text-accent">// {t("about.snapshotLabel")}</div>
            <dl className="mt-5 divide-y divide-[var(--border)]">
              {sidebar.map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 py-3">
                  <dt className="font-mono-ui text-xs text-text-tertiary">{k}</dt>
                  <dd className="text-right text-sm text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
