import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircle, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MagneticButton } from "./MagneticButton";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const { t } = useTranslation();
  const contacts = [
    { Icon: Mail, label: t("contact.email"), value: "sepehrjokanian99@gmail.com", href: "mailto:sepehrjokanian99@gmail.com" },
    { Icon: MessageCircle, label: t("contact.whatsapp"), value: "+37493564383", href: "https://wa.me/37493564383" },
    { Icon: Phone, label: t("contact.call"), value: "+37493564383", href: "tel:+37493564383" },
    { Icon: Linkedin, label: t("contact.linkedin"), value: "linkedin.com/in/sepehr-jo", href: "https://www.linkedin.com/in/sepehr-jo/" },
    { Icon: Github, label: t("contact.github"), value: "github.com/sepehrjo", href: "https://github.com/sepehrjo" },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setApiError("");
    setFieldErrors({});

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      project: formData.message,
      budget: formData.budget,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setFieldErrors(data.errors);
        else setApiError(data.error || "Failed to send. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "", budget: "" });
      }
    } catch {
      setApiError("Failed to send. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-xl rounded-xl border border-accent/30 bg-bg-card p-10 text-center">
            <CheckCircle2 size={40} className="mx-auto text-accent" />
            <h2 className="font-display mt-6 text-3xl font-bold">{t("contact.success.title")}</h2>
            <p className="mt-3 text-text-secondary">
              {t("contact.success.description")}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-md border border-[var(--border)] bg-bg px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {t("contact.success.sendAnother")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono-ui text-sm text-accent">// {t("contact.label")}</div>
          <h2 className="font-display mt-4 text-4xl font-bold md:text-5xl">{t("contact.title")}</h2>
          <p className="mt-4 max-w-2xl text-base text-text-secondary md:text-lg">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono-ui text-xs uppercase tracking-wider text-text-tertiary">
              {t("contact.directLabel")}
            </div>
            <div className="mt-6 space-y-5">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-lg border border-[var(--border)] bg-bg-card p-4 transition-all hover:border-[var(--border-hover)] hover:shadow-[0_0_16px_var(--accent-glow)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <c.Icon size={18} />
                  </div>
                  <div>
                    <div className="font-mono-ui text-xs text-text-tertiary">{c.label}</div>
                    <div className="text-sm text-text-primary group-hover:text-accent">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs text-text-tertiary">
              "{t("contact.personalNote")}"
            </p>
          </motion.div>

          {/* Right form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-[var(--border)] bg-bg-card p-6 md:p-8"
          >
            <div className="space-y-4">
              <Field label={t("contact.form.name")} name="name" value={formData.name} onChange={onChange} required error={fieldErrors.name} />
              <Field label={t("contact.form.email")} name="email" type="email" value={formData.email} onChange={onChange} required error={fieldErrors.email} />
              <Field label={t("contact.form.company")} name="company" value={formData.company} onChange={onChange} error={fieldErrors.company} />
              <div>
                <label className="font-mono-ui text-xs text-text-tertiary">
                  {t("contact.form.project")} *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  placeholder={t("contact.form.projectPlaceholder")}
                  className="mt-2 w-full rounded-md border border-[var(--border)] bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                />
                {fieldErrors.message && <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>}
              </div>
              <div>
                <label className="font-mono-ui text-xs text-text-tertiary">{t("contact.form.budget")}</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => onChange("budget", e.target.value)}
                  className="mt-2 w-full rounded-md border border-[var(--border)] bg-bg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
                >
                  <option value="">{t("contact.form.budgetSelect")}</option>
                  <option value="min_18k">{t("contact.form.budgetOption1")}</option>
                  <option value="18_50k">{t("contact.form.budgetOption2")}</option>
                  <option value="over_50k">{t("contact.form.budgetOption3")}</option>
                </select>
                {fieldErrors.budget && <p className="mt-1 text-xs text-red-400">{fieldErrors.budget}</p>}
              </div>
            </div>

            {apiError && (
              <div className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                {apiError}
              </div>
            )}

            <div className="mt-6">
              <MagneticButton
                type="submit"
                className="w-full rounded-md bg-accent px-6 py-3 text-center text-sm font-medium text-white shadow-[0_0_24px_var(--accent-glow)] transition-colors hover:bg-accent-hover block"
              >
                {status === "submitting" ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> {t("contact.form.sending")}
                  </span>
                ) : (
                  t("contact.form.submit")
                )}
              </MagneticButton>
            </div>

            <div className="mt-8 space-y-2 border-t border-[var(--border)] pt-6 text-sm text-text-secondary">
              <div><span className="text-accent">1.</span> {t("contact.process.step1")}</div>
              <div><span className="text-accent">2.</span> {t("contact.process.step2")}</div>
              <div><span className="text-accent">3.</span> {t("contact.process.step3")}</div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, value, onChange, error,
}: {
  label: string; name: string; type?: string; required?: boolean;
  value: string; onChange: (name: string, value: string) => void; error?: string;
}) {
  return (
    <div>
      <label className="font-mono-ui text-xs text-text-tertiary">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={200}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="mt-2 w-full rounded-md border border-[var(--border)] bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
