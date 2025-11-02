<script lang="ts">
	import { onMount } from 'svelte';
	import { startFPS } from '$lib/scripts/fps';
	import { initSnow } from '$lib/scripts/snow';

	onMount(() => {
		startFPS();
		initSnow();
	});
</script>

<span id="fps">0</span>
<div id="wrapper">
	<div id="overlay"></div>
	I decided to wipe my old website, as I was not happy with it. I will be working on this over a good
	while, if you wish to check back later ;D
	<img
		src="./images/kitty.jpg"
		alt="Cat"
		style="max-width:30%; height:auto; margin-top:20px;"
	/>
</div>
