import i18n from "@/i18n"; // <--- 1

const aLocales = [
	{
		locale: "en",
		flag: "/assets/media/flags/united-states.svg",
	},
	{
		locale: "pt",
		flag: "/assets/media/flags/portugal.svg",
	},
];

const Trans = {
	get supportedLocales() {
		// return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
		return aLocales;
	},

	set currentLocale(locale) {
		// <--- 2
		if (i18n.mode === "legacy") {
			i18n.global.locale = locale;
		} else {
			i18n.global.locale.value = locale;
		}
	},

	async switchLanguage(newLocale) {
		Trans.currentLocale = newLocale;
		document.querySelector("html").setAttribute("lang", newLocale);
		localStorage.setItem("user-locale", newLocale.trim()); // <--- add this
	},

	isLocaleSupported(locale) {
		return Trans.supportedLocales.find((e) => locale === e.locale);
	},

	getUserLocale() {
		const locale =
			window.navigator.language ||
			window.navigator.userLanguage ||
			Trans.defaultLocale;
		return {
			locale: locale,
			localeNoRegion: locale.split("-")[0],
		};
	},

	getPersistedLocale() {
		// <--- 3
		const persistedLocale = localStorage.getItem("user-locale");
		// console.log("Persisted: ", persistedLocale);
		if (Trans.isLocaleSupported(persistedLocale)) {
			return persistedLocale;
		} else {
			return null;
		}
	},

	guessDefaultLocale() {
		// console.log("called");
		const userPersistedLocale = Trans.getPersistedLocale();
		// console.log("Local: " + userPersistedLocale);
		if (userPersistedLocale) {
			// console.log("LocalStorage");
			return userPersistedLocale;
		}
		const userPreferredLocale = Trans.getUserLocale();
		if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
			// console.log("User locale from browser");
			return userPreferredLocale.locale;
		}
		if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
			// console.log("User locale region");
			return userPreferredLocale.localeNoRegion;
		}

		return Trans.defaultLocale;
	},

	get defaultLocale() {
		// return import.meta.env.VITE_DEFAULT_LOCALE;
		return "en";
	},
	get locale() {
		let locale = "";
		if (i18n.mode === "legacy") {
			locale = i18n.global.locale;
		} else {
			locale = i18n.global.locale.value;
		}
		return locale;
	},

	async routeMiddleware(to, _from, next) {
		// console.log(Trans.guessDefaultLocale());
		// const paramLocale = to.params.locale;
		// if (!Trans.isLocaleSupported(paramLocale)) {
		// 	return next(Trans.guessDefaultLocale());
		// }
		// console.log(Trans.guessDefaultLocale());
		await Trans.switchLanguage(Trans.guessDefaultLocale());
		return next();
	},
};

export default Trans;
