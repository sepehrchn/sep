import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const languages = [
  { code: "en", flag: "🇺🇸" },
  { code: "ru", flag: "🇷🇺" },
  { code: "hy", flag: "🇦🇲" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className="rounded-full p-1.5 text-xl"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          animate={{
            opacity: i18n.language === lang.code ? 1 : 0.6,
            scale: i18n.language === lang.code ? 1.1 : 1,
          }}
        >
          {lang.flag}
        </motion.button>
      ))}
    </div>
  );
}
