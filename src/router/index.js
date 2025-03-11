import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import AppView from "../views/Account.vue";
// // ADMIN
import Admin from "../views/Admin.vue";
import Login from "../views/admin/Login.vue";

import { user } from "@/stores/user";
import PasswordResetVue from "../views/PasswordReset.vue";
import Tr from "@/i18n/translation";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "landing",
			component: Landing,
		},
		{
			path: "/app",
			name: "app",
			component: AppView,
			beforeEnter: (to, from, next) => {
				if (!user.getUser()) {
					next({ name: "landing" });
				} else {
					next();
				}
			},
		},

		{
			path: "/admin",
			name: "admin",
			component: Admin,
			beforeEnter: (to, from, next) => {
				if (!user.getUser()) {
					next({ name: "login" });
				} else {
					const isAdmin = user
						.getUser()
						.roles.find((e) => e.name === "ADMIN");

					if (isAdmin) {
						next();
					} else {
						next({ name: "login" });
					}
					// next();
				}
			},
		},
		{
			path: "/admin/login",
			name: "login",
			component: Login,
		},
		{
			path: "/reset-password",
			name: "resetpassword",
			component: PasswordResetVue,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			redirect: "/",
		},
	],
});

router.beforeEach(Tr.routeMiddleware);

export default router;
