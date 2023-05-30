import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import AppView from "../views/Account.vue";
// import Picks from "../views/app/Picks.vue";
// import Plans from "../views/app/Plans.vue";
// import Profile from "../views/app/Profile.vue";
// import Security from "../views/app/Security.vue";
// // ADMIN
// import Admin from "../views/Admin.vue";
// import Dashboard from "../views/admin/Dashboard.vue";
// import Users from "../views/admin/Users.vue";
// import Testimonies from "../views/admin/Testimonies.vue";
// import Subscriptions from "../views/admin/Subscriptions.vue";

// import Page404 from "../views/Page404.vue";
// import Login from "../views/admin/Login.vue";

import { user } from "@/stores/user";

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
			// redirect: "/app/picks",
			// beforeEnter: (to, from, next) => {
			// 	if (!user.getUser()) {
			// 		next({ name: "landing" });
			// 	} else {
			// 		next();
			// 	}
			// },
			children: [
				// {
				// 	path: "tips",
				// 	name: "tips",
				// 	component: Picks,
				// },
				// {
				// 	path: "plans",
				// 	name: "plans",
				// 	component: Plans,
				// },
				// {
				// 	path: "profile",
				// 	name: "profile",
				// 	component: Profile,
				// },
				// {
				// 	path: "security",
				// 	name: "security",
				// 	component: Security,
				// },
			],
		},

		// {
		// 	path: "/admin",
		// 	name: "admin",
		// 	component: Admin,
		// 	redirect: "/admin/dashboard",
		// 	beforeEnter: (to, from, next) => {
		// 		if (!user.getUser()) {
		// 			next({ name: "login" });
		// 		} else {
		// 			const isAdmin = user
		// 				.getUser()
		// 				.roles.find((e) => e.name === "ADMIN");

		// 			if (isAdmin) {
		// 				next();
		// 			} else {
		// 				next({ name: "login" });
		// 			}
		// 			// next();
		// 		}
		// 	},
		// 	children: [
		// 		{
		// 			path: "dashboard",
		// 			name: "dashboard",
		// 			component: Dashboard,
		// 		},
		// 		{
		// 			path: "subscriptions",
		// 			name: "subscriptions",
		// 			component: Subscriptions,
		// 		},
		// 		{
		// 			path: "users",
		// 			name: "users",
		// 			component: Users,
		// 		},
		// 		{
		// 			path: "testimonies",
		// 			name: "testimonies",
		// 			component: Testimonies,
		// 		},
		// 	],
		// },
		// {
		// 	path: "/admin/login",
		// 	name: "login",
		// 	component: Login,
		// },
		// {
		// 	path: "/:pathMatch(.*)*",
		// 	name: "NotFound",
		// 	component: Page404,
		// },
	],
});

export default router;
