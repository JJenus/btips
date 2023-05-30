<script setup>
import { ref } from "vue";

const active = ref('Subscription Plans')

const navs = ref([
	{
		name: "Overview",
		target: "#overview",
	},
	{
		name: "Tips",
		target: "#tips",
	},
	{
		name: "Subscription Plans",
		target: "#subscription_plans",
	},
	{
		name: "Profile Details",
		target: "#profile_details",
	},
	{
		name: "Deactivate Account",
		target: "#deactivate_account",
	},
]);
</script>

<template>
	<ul
		id="kt_account_settings"
		class="nav nav-flush menu menu-column menu-rounded menu-title-gray-600 menu-bullet-gray-300 menu-state-bg menu-state-bullet-primary fw-semibold fs-6 mb-2"
	>
		<li v-for="nav in navs" class="menu-item px-3 pt-0 pb-1">
			<a
				@click="active = nav.name"
				:href="nav.target"
				data-kt-scroll-toggle="true"
				:class="active == nav.name ? 'active' : ''"
				class="menu-link px-3 nav-link"
			>
				<span class="menu-bullet"
					><span class="bullet bullet-vertical"></span
				></span>
				<span class="menu-title">{{ nav.name }}</span>
			</a>
		</li>
	</ul>
</template>
