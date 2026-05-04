import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Home: "Home",
      Chat: "Chat",
      Journal: "Journal",
      Mood: "Mood",
      Breathe: "Breathe",
      "Lab Reports": "Lab Reports",
      Profile: "Profile",
      "Sign Out": "Sign Out",
    },
  },
  hi: {
    translation: {
      Home: "होम",
      Chat: "चैट",
      Journal: "जर्नल",
      Mood: "मूड",
      Breathe: "साँस",
      "Lab Reports": "रिपोर्ट्स",
      Profile: "प्रोफाइल",
      "Sign Out": "लॉग आउट",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",           // default
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;