<template>
	<header class="header">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="header-container">
						<ul class="header-container-navigation">
							<li>
								<router-link to="/main">
									Main
								</router-link>
							</li>
							<li>
								<router-link to="/favorites">
									Favorites
								</router-link>
							</li>
						</ul>
						<ul class="header-container-navigation">
							<li>
								<a @click.prevent="openSettings()" href="#">
									Settings
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	methods: {
		openSettings () {
			this.$store.dispatch('setShowSettingsDialog', true)
		}
	}
}
</script>

<style lang="scss" scoped>
.header {

	background-color: $header-bg-color-light;
	border-bottom: 1px solid $color-line-light;
	@include position($position: fixed, $top: 0, $left: 0);
	width: 100%;
	z-index: 9;

	.dark-mode & {
		background-color: $header-bg-color-dark;
		border-bottom-color: $color-line-dark;
	}

	&-container {

		@include flex(flex, row, wrap, space-between, center);
		height: $header-height;

		&-navigation {

			@include list-reset;
			@include flex(flex, row, wrap, flex-start, center);

			li {

				&:not(:last-child) {
					margin-right: 30px;
				}

			}

		}

		a {

			@include link-color(darken($color-text-dark, 30%), $color-text-dark, none, none);

			.dark-mode & {
				@include link-color($color-text-dark, $color-primary-dark, none, none);
			}

			&.router-link-exact-active {
				@include link-color($color-primary-light, $color-primary-light, none, none);
			}

		}

	}

}
</style>
