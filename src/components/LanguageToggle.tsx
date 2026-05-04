import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-1">
      <button
        onClick={() => {
          console.log("EN clicked");
          i18n.changeLanguage("en");
        }}
        className="px-2 py-1 text-xs rounded-md hover:bg-background"
      >
        EN
      </button>

      <button
        onClick={() => {
          console.log("HI clicked");
          i18n.changeLanguage("hi");
        }}
        className="px-2 py-1 text-xs rounded-md hover:bg-background"
      >
        हिंदी
      </button>
    </div>
  );
}