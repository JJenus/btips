<script setup>
	import Tr from "@/i18n/translation.js";
	import { util } from "../stores/utility";

	defineProps({
		showLang: {
			required: false,
		},
	});

	const supportedLocales = Tr.supportedLocales;

	const locale = Tr.locale;

	const switchLanguage = async (lang) => {
		// console.log(lang)
		const newLocale = lang.target.value;
		console.log(newLocale);
		await Tr.switchLanguage(newLocale);
	};

	function ell(val) {
		const select = document.querySelector("#dselect");
		select.value = val;
		var event = new Event("change");
		select.dispatchEvent(event);

		util.lang.value = val;
	}
</script>

<template>
	<div
		:class="showLang ? 'px-5' : ''"
		class="menu-item"
		data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
		data-kt-menu-placement="left-start"
	>
		<a role="btn" :class="showLang ? 'px-5' : ''">
			<span v-if="showLang" class="menu-title position-relative">
				{{ $t("locale.lang") }}

				<span
					class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"
				>
					{{ $t("locale.locale") }}
					<img
						class="w-15px h-15px rounded-1 ms-2"
						:src="$t('locale.flag')"
						:alt="$t('locale.locale')"
					/>
				</span>
			</span>

			<span v-else class="menu-title position-relative">
				<span class="fs-8 rounded bg-light p-0 m-0">
					<img
						class="h-20px rounded-0"
						:src="$t('locale.flag')"
						:alt="$t('locale.locale')"
					/>
				</span>
			</span>
		</a>

		<!--begin::Menu sub-->
		<div class="menu-sub menu-sub-dropdown w-175px py-4">
			<!--begin::Menu item-->
			<input
				@change="switchLanguage"
				type="text"
				id="dselect"
				class="d-none"
			/>

			<div
				v-for="(sLocale, index) in supportedLocales"
				class="menu-item px-3"
			>
				<a
					@click="ell(sLocale.locale)"
					role="button"
					class="menu-link d-flex px-5 active"
				>
					<span class="symbol symbol-20px me-4">
						<img
							class="rounded-1"
							:src="sLocale.flag"
							:alt="sLocale.locale"
						/>
					</span>
					{{ $t(`locale.${sLocale.locale}`) }}
				</a>
			</div>
			<!--end::Menu item-->
		</div>
		<!--end::Menu sub-->
	</div>
</template>
