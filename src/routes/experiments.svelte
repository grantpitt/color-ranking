<script lang="ts">
  import ColorCompare from "../experiments/components/ColorCompare.svelte";
</script>

<main>
  <ColorCompare />
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
</style>