import i18n from "@/i18n"; // Import Vue I18n instance

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
		return aLocales;
	},

	set currentLocale(locale) {
		if (i18n.mode === "legacy") {
			i18n.global.locale = locale;
		} else {
			i18n.global.locale.value = locale;
		}
	},

	async switchLanguage(newLocale) {
		try {
			Trans.currentLocale = newLocale;
			document.querySelector("html").setAttribute("lang", newLocale);
			localStorage.setItem("user-locale", newLocale.trim());
		} catch (error) {
			console.error("Failed to switch language:", error);
		}
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
		try {
			const persistedLocale = localStorage.getItem("user-locale");
			if (Trans.isLocaleSupported(persistedLocale)) {
				return persistedLocale;
			}
		} catch (error) {
			console.error("Failed to access localStorage:", error);
		}
		return null;
	},

	guessDefaultLocale() {
		const userPersistedLocale = Trans.getPersistedLocale();
		if (userPersistedLocale) {
			console.log(userPersistedLocale);

			return userPersistedLocale;
		}

		console.log(Trans.getUserLocale());

		const userPreferredLocale = Trans.getUserLocale();
		if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
			return userPreferredLocale.locale;
		}
		if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
			return userPreferredLocale.localeNoRegion;
		}

		return Trans.defaultLocale;
	},

	get defaultLocale() {
		return "en";
	},

	get locale() {
		return i18n.mode === "legacy"
			? i18n.global.locale
			: i18n.global.locale.value;
	},

	async routeMiddleware(to, _from, next) {
		await Trans.switchLanguage(Trans.guessDefaultLocale());
		return next();
	},
};

export default Trans;
