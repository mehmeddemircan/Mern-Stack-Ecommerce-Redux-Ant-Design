import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Flag css
import "flag-icon-css/css/flag-icon.min.css";



import App from "./App";
import "antd/dist/antd.css";


// Spinner
import { Spin, Space } from "antd";

//i18n
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// Redux
import {Provider} from "react-redux";
import store from './store'




i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar", "fr", "es", "de", "it", "ru", "cn", "pl"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

// Loading spinner

const loadingMarkup = (
  <Space size="middle" style={{position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'}}>
    <Spin  size="large" />
  </Space>
);



ReactDOM.render(
 <Provider store={store}>
    <Suspense fallback={loadingMarkup}>
      <App />
    </Suspense>
    </Provider>,

  document.getElementById("root")
);

reportWebVitals();
