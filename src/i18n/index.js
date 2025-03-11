import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";

const i18n = createI18n({
	legacy: false,
	// default locale
	locale: "pt",
	fallbackLocale: "en",

	// translations

	messages: {
		en,
		pt,
		// fr,
	},
});

export default i18n;
