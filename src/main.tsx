import "./i18n";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] transition-all duration-500">
      
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>

    </div>

  </React.StrictMode>
);