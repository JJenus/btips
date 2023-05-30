import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const env = import.meta.env;

if (
	env.VITE_ENV == "development" &&
	window.console &&
	console.log &&
	console.warn &&
	console.error
) {
	window.debug = {
		log: window.console.log,
		warn: window.console.warn,
		error: window.console.error,
	};
} else {
	console.log("Production environment");
	window.debug = {
		log: function () {},
		warn: function () {},
		error: function () {},
	};
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
