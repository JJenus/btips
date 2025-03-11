<script setup>
	import { user } from "@/stores/user";
	import { inject, ref } from "vue";
	import LangSelector from "../LangSelector.vue";

	const avatar = ref(user.defaultAvatar());
	const User = inject("user");
</script>

<template>
	<div
		class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
		data-kt-menu="true" data-kt-menu-trigger="click"
	>
		<!--begin::Menu item-->
		<div class="menu-item px-3">
			<div class="menu-content d-flex align-items-center px-3">
				<!--begin::Avatar-->
				<div class="symbol symbol-50px me-5">
					<img alt="Logo" :src="User.imgUrl || avatar" />
				</div>
				<!--end::Avatar-->

				<!--begin::Username-->
				<div class="d-flex flex-column">
					<div class="fw-bold d-flex align-items-center fs-5">
						{{ User.name }}
						<span
							class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
						>
							{{ User.status }}
						</span>
					</div>
					<a
						href="#"
						class="fw-semibold text-muted text-hover-primary fs-7"
					>
						{{ User.email }}
					</a>
				</div>
				<!--end::Username-->
			</div>
		</div>
		<!--end::Menu item-->

		<!--begin::Menu separator-->
		<div class="separator my-2"></div>
		<!--end::Menu separator-->

		<!--begin::Menu item-->
		<LangSelector :showLang="true" />
		<!--end::Menu item-->

		<!--begin::Menu item-->
		<div class="menu-item px-5 mt-4">
			<a
				@click="user.logout()"
				role="button"
				class="w-100 px-5 btn btn-danger fw-bold"
			>
				{{ $t("auth.signOut") }}
			</a>
		</div>
		<!--end::Menu item-->
	</div>
</template>
