<script lang="ts">
	import { onMount } from 'svelte';
	import { initSnow } from '$lib/scripts/snow';
	import { fetchNowPlaying } from '$lib/scripts/music';
	import type { NowPlaying } from '$lib/scripts/music';

	let song: NowPlaying = {
		nowPlaying: false,
		artist: '',
		title: '',
		url: '',
		image: '',
		playedAt: null
	};

	onMount(() => {
		initSnow();
		updateSong();
		const interval = setInterval(updateSong, 5000);
		return () => clearInterval(interval);
	});

	async function updateSong() {
		song = await fetchNowPlaying();
	}

	function timeAgo(date: string | number | null) {
		if (!date) return 'just now';
		const now = new Date();
		const then = typeof date === 'number' ? new Date(date * 1000) : new Date(date);
		const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

		if (seconds < 60) return `${seconds} seconds ago`;
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes} minutes ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours} hours ago`;
		const days = Math.floor(hours / 24);
		if (days < 365) return `${days} days ago`;
		const years = Math.floor(days / 365);
		console.log(seconds + ', ' + minutes + ', ' + hours + ', ' + days + ', ' + years + ', ' + date);
		return `${years} years ago`;
	}
</script>

<div id="wrapper">
	<div id="overlay"></div>
	<div id="cursors"></div>
	<table>
		<tbody>
			<tr>
				<td id="menutd" style="max-width: 225px">
					<div class="box" style="margin-bottom: 10px;">
						links will go here
					</div>
					<div class="box" style="margin-top: 10px; margin-bottom: 10px;">
						<div class={song.nowPlaying ? 'blob' : 'inblob'} id="pulser"></div>
						<b>{song.nowPlaying ? 'Currently Playing:' : 'Last Song:'}</b>

						<a href={song.url} target="_blank" id="songlink">
							<div id="musicbox">
								<!-- svelte-ignore a11y_missing_attribute -->
								<img src={song.image} width="50" height="50" id="albumcover" />
								<span id="songname">{song.title}</span>
								<span id="artist">{song.artist}</span>
							</div>
						</a>

						{#if !song.nowPlaying}
							<div id="lastplayed" style="color: gray; margin-top: 6px; clear: both;">
								Played {timeAgo(song.playedAt)}
							</div>
						{/if}
					</div>
					<div class="box" style="margin-top: 10px; margin-bottom: 10px;">online/offline go here</div>
				</td>
				<td id="maintd">
					<div class="box" id="mainbox">
						I decided to wipe my old website, as I was not happy with it. I will be working on this
						over a good while, if you wish to check back later ;D <br><br>
						I am tweaking this A LOT. In the meantime, have kitty.
						<img
							src="./images/kitty.jpg"
							alt="Cat"
							style="max-width:30%; height:auto;"
						/>
					</div>
					<div class="box" id="blogbox"></div>
				</td>
			</tr>
		</tbody>
	</table>
</div>
