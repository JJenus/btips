import { inject, ref } from "vue";
import currency from "currency.js";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css"

const options = {
	position: "top-right",
};

export const alert = {
	success(title = false, message = "") {
		if (title) new AWN().success(title);
		else new AWN(options).success();
	},
	error(title, message = "") {
		new AWN(options).alert(title);
	},
	info(title, message = "") {
		new AWN(options).info(title);
	},
	
};

export const util = {
	avatar: "/assets/img/avatar/default-avatar.png",
	settings: () => {
		return {
			currency: "USD",
			currencySymbol: "$",
			language: "en",
			verificationFee: 5,
		};
	},

	search(area, input) {
		const rjx = new RegExp(input, "i");
		document.querySelectorAll(area).forEach((e) => {
			if (rjx.test(e.innerText)) {
				e.style.display = "block";
			} else {
				e.style.display = "none";
			}
		});
	},

	resizeImg(uri, width = 100) {
		if (uri) {
			let uArr = uri.split(".com/");
			return uArr.join(`.com/resize=width:${width}/`);
		}
		return null;
	},

	money(money) {
		const config = inject("settings", {
			currency: "USD",
			currencySymbol: "$",
			language: "en",
			verificationFee: 5,
		});
		const amount = currency(money, {
			symbol: config.value.currencySymbol,
		}).format();
		return amount;
	},
};

export const userIp = {
	storageKey: "bettor@m0@user-ip",
	ipData: null,
	getIp() {
		const data = localStorage.getItem(this.storageKey);

		if (data === null || data === undefined) {
			return false;
		}

		this.ipData = JSON.parse(data);
		return this.ipData.ip;
	},
	saveIp(data) {
		this.ipData = data;
		localStorage.setItem(this.storageKey, JSON.stringify(data));
	},
};
