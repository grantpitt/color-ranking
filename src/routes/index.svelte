<script lang="ts">
	import Picker from '../components/Picker.svelte';
	export let leftIndex: number;
	export let rightIndex: number;
</script>

<main>
  <h1>TBD Color App</h1>
	<section>
		<Picker {leftIndex} {rightIndex} />
	</section>
</main>

<style>
	@import url('https://rsms.me/inter/inter.css');
	:global(html) {
		font-family: 'Inter', sans-serif;
	}
	@supports (font-variation-settings: normal) {
		:global(html) {
			font-family: 'Inter var', sans-serif;
		}
	}

	:global(body) {
		margin: 0;
	}

	:global(*) {
		box-sizing: border-box;
	}

	main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
		width: 100%;
		min-height: 100vh;
		padding: 0 2rem;
	}

	section {
		margin: 0 auto;
    width: 100%;
    max-width: 800px;
	}
</style>
