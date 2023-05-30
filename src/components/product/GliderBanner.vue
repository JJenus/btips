<script setup>
import Glide from "@glidejs/glide";
import { onMounted } from "vue";

const glide = new Glide(".glide", {
	type: "carousel",
	startAt: 0,
	perView: 4,
	autoplay: 4000,
	focusAt: "center",
	breakpoints: {
		768: {
			perView: 3,
		},
	},
});

onMounted(() => {
	glide.mount();
	glide.on("swipe.move", function (event) {
		console.log("on swipe.end", glide.index);
	});
});
</script>

<template>
	<div style="opacity: 0.8" class="glide w-100 bg-transparent">
		<div
			class="glide__track mx-0 bg-transparent px-2"
			data-glide-el="track"
		>
			<ul class="glide__slides bg-transparent d-flex align-items-center">
				<li class="glide__slide">
					<div
						style="
							background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyf4fEOQmisMZw8-YgGa4m_pC-omZAUGTMJA&usqp=CAU');
							background-repeat: no-repeat;
							background-size: cover;
						"
						class="card border-0 shadow left"
					>
						<div
							class="card-body big-primary justify-content-center fs-1 d-flex align-items-center"
							style="height: 300px"
						>
							<!-- card body -->
						</div>
					</div>
				</li>
				<li class="glide__slide">
					<div
						style="
							background-image: url('https://play-lh.googleusercontent.com/z6qeJ3YhtyhX1evB9wJTcaPAiJDuarLjTAU-wefCofJsfWtlcEYvzR2RUwIJV4oHChoj=w526-h296-rw');
							background-repeat: no-repeat;
							background-size: cover;
						"
						class="card border-0 shadow"
					>
						<div
							class="card-body bgi-warning justify-content-center fs-1 d-flex align-items-center"
							style="height: 300px"
						>
							<!-- card body -->
						</div>
					</div>
				</li>
				<li class="glide__slide">
					<div
						style="
							background-image: url('https://i.pinimg.com/originals/10/ef/5a/10ef5a24c56ae4caabfbdf651b4c6ed2.jpg');
							background-repeat: no-repeat;
							background-size: cover;
						"
						class="card border-0 shadow right"
					>
						<div
							class="card-body bgi-primary justify-content-center fs-1 d-flex align-items-center"
							style="height: 300px"
						>
							<!-- card body -->
						</div>
					</div>
				</li>
				<li class="glide__slide">
					<div
						style="
							background-image: url('https://i0.wp.com/ghanasoccernet.com/in/wp-content/uploads/sites/7/2022/11/Download-the-1xBet-app-on-your-device-e1669720637522.jpg?resize=500%2C1044&ssl=1');
							background-repeat: no-repeat;
							background-size: cover;
						"
						class="card border-0 shadow right"
					>
						<div
							class="card-body bgi-primary justify-content-center fs-1 d-flex align-items-center"
							style="height: 300px"
						>
							<!-- card body -->
						</div>
					</div>
				</li>
				<li class="glide__slide">
					<div
						style="
							background-image: url('https://cdna.artstation.com/p/assets/images/images/057/166/748/large/gayuh-marga-hardhika-messi-world-cup-qatar-20221214070840.jpg?1670976565');
							background-repeat: no-repeat;
							background-size: cover;
						"
						class="card border-0 shadow right"
					>
						<div
							class="card-body bgi-primary justify-content-center fs-1 d-flex align-items-center"
							style="height: 300px"
						>
							<!-- card body -->
						</div>
					</div>
				</li>
			</ul>
		</div>

		<!-- <div class="glide__bullets" data-glide-el="controls[nav]">
			<button class="glide__bullet" data-glide-dir="=0"></button>
			<button class="glide__bullet" data-glide-dir="=1"></button>
			<button class="glide__bullet" data-glide-dir="=2"></button>
		</div> -->
	</div>
</template>

<style scoped>
@import "@glidejs/glide/dist/css/glide.core";
@import "@glidejs/glide/dist/css/glide.theme";

.glide__slides {
	border-color: transparent;
	padding-top: 30px;
	padding-bottom: 30px;
}

.glide__slide .card {
	width: 100%;
	background-color: transparent !important;
}
</style>

<style scoped lang="scss">
.glide__slide {
	.card {
		height: 200px;
	}
	&:has(+ .glide__slide--active) {
		.card {
			background: #e9dbdb;
			height: 300px;
			&::before {
				left: -20px;
				height: 100%;
				width: 25px;
				-webkit-transform: rotateY(-45deg);
				transform: rotateY(-45deg);
				transform-origin: center right;
				-webkit-transform-origin: center right;
				transition: all 0.5s ease-in-out;
				-webkit-transition: all 0.5s ease-in-out;
			}

			-webkit-transform: perspective(800px) rotateY(25deg);
			transform: perspective(800px) rotateY(25deg);
			transition: all 0.8s ease-in-out;
			-webkit-transition: all 0.8s ease-in-out;
		}
	}
	&.glide__slide--active {
		cursor: pointer;
		.card {
			height: 350px !important;
		}
		& + .glide__slide {
			.card {
				background: #e9dbdb;
				&::before {
					right: -20px;
					height: 100%;
					width: 25px;
					-webkit-transform: rotateY(45deg);
					transform: rotateY(45deg);
					-webkit-transform-origin: center left;
					transform-origin: center left;
					transition: all 0.5s ease-in-out;
					-webkit-transition: all 0.5s ease-in-out;
				}
				-webkit-transform: perspective(800px) rotateY(-25deg);
				transform: perspective(800px) rotateY(-25deg);
				transition: all 0.8s ease-in-out;
				-webkit-transition: all 0.8s ease-in-out;
				height: 300px;
			}
		}
	}
	transition: all 0.5s ease-in-out;
	-webkit-transition: all 0.5s ease-in-out;
}
</style>
