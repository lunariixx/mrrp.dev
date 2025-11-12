<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { initSnow } from '$lib/scripts/snow';
	import { Scroller } from '$lib/scripts/scroller';
	import { AsyncAlarmClock } from '$lib/scripts/asyncalarmclock';
	import { fetchNowPlaying } from '$lib/scripts/music';
	import type { NowPlaying } from '$lib/scripts/music';
	import { fetchOnline } from '$lib/scripts/lanyard';

	let song: NowPlaying = {
		nowPlaying: false,
		artist: 'Loading Artist...',
		title: 'Loading Song...',
		url: '',
		image: 'images/lastfm.jpg',
		playedAt: "0"
	};

	// let displayedTitle = 'SONG_TITLE';
	// let displayedArtist = 'ARTIST_NAME';

	const titleScroller: Scroller = new Scroller("songname", song.title, 16, 1);
	const titleClock: AsyncAlarmClock = new AsyncAlarmClock(300, () => titleScroller.scroll(titleClock.interval));
	
	const artistScroller: Scroller = new Scroller("artist", song.artist, 16, 1);
	const artistClock: AsyncAlarmClock = new AsyncAlarmClock(300, () => artistScroller.scroll(artistClock.interval));

	// let titleTicker: ReturnType<typeof createTicker> | undefined;
	// let artistTicker: ReturnType<typeof createTicker> | undefined;

	let online = false;

	const currentYear = new Date().getFullYear();

	onMount(() => {
		initSnow();
		updateSong();
		updateStatus();
		const interval = setInterval(updateSong, 5000);
		const interval2 = setInterval(updateStatus, 5000);
		titleClock.setTimer();
		artistClock.setTimer();
		return () => {
			clearInterval(interval);
			titleClock.clearTimer?.(); // titleTicker?.stop();
			artistClock.clearTimer?.(); // artistTicker?.stop();
		};
	});

	async function updateSong() {
		song = await fetchNowPlaying();
		// titleClock.clearTimer?.(); // titleTicker?.stop();
		// artistClock.clearTimer?.(); // artistTicker?.stop();

		if(song.title !== titleScroller.text) titleScroller.setIndex(0), titleScroller.setDirection("forward"), titleScroller.setText(song.title); // titleTicker = createTicker(song.title, (val) => (displayedTitle = val), 16);
		if(song.artist !== artistScroller.text) artistScroller.setIndex(0), artistScroller.setDirection("forward"), artistScroller.setText(song.artist); // artistTicker = createTicker(song.artist, (val) => (displayedArtist = val), 16);
		
		// await new Promise(resolve=>setTimeout(resolve, ));
		// await titleClock.setTimer();
		// await artistClock.setTimer();
	}

	async function updateStatus() {
		const status = await fetchOnline();
		online = status.online;
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
		return `${years} years ago`;
	}
</script>

<svelte:head>
	<title>Luni's Den</title>
	<meta name="description" content="My website and blog." />
	<meta
		name="keywords"
		content="luni, lunarii_xx, JS, JavaScript, discord, nes, emulators, 90s, pixels"
	/>
</svelte:head>

<div id="wrapper">
	<div id="overlay"></div>
	<div id="cursors"></div>
	<table>
		<tbody>
			<tr>
				<td id="menutd" style="max-width: 225px">
					<div class="box" style="margin-bottom: 10px;">links will go here</div>
					<div
						class="box centerbox"
						style="margin-top: 10px; display: flex; justify-content: center; align-items: baseline; padding-bottom: 5px; padding-top: 5px;"
					>
						<span>I'm</span>
						&nbsp;
						<h2
							id="status"
							style="
            					font-size: 23px;
           						margin: 0;
            					color: {online ? 'lime' : 'red'};
            					text-shadow:0 0 10px #04ffd518, 0 0 20px #00ffee13, 0 0 30px #e600002f,
                        		0 0 40px #00e6b200, 0 0 50px #e600003d, 0 0 60px #e6000029,
                        		0 0 70px #e6000057;
        					"
						>
							{online ? 'Online!' : 'Offline!'}
						</h2>
					</div>

					<div class="box" style="margin-top: 10px; margin-bottom: 10px;">
						<div class={song.nowPlaying ? 'blob' : 'inblob'} id="pulser"></div>
						<b>{song.nowPlaying ? 'Currently Playing:' : 'Last Song:'}</b>

						<a href={song.url} target="_blank" id="songlink">
							<div id="musicbox">
								<img
									src={song.image}
									width="50"
									height="50"
									id="albumcover"
									alt="Album cover for {song.title}"
								/>
								<div id="songtext">
									<span id="songname">{song.title}</span>
									<span id="artist">{song.artist}</span>
								</div>
							</div>
						</a>

						{#if !song.nowPlaying}
							<div id="lastplayed" style="color: gray; margin-top: 6px; clear: both;">
								Played {timeAgo(song.playedAt)}
							</div>
						{/if}
					</div>
				</td>
				<td id="maintd">
					<div class="box" id="mainbox">
						I decided to wipe my old website, as I was not happy with it. I will be working on this
						over a good while, if you wish to check back later ;D <br /><br />
						I am tweaking this A LOT. In the meantime, have kitty.
						<img src="./images/kitty.jpg" alt="Cat" style="max-width:30%; height:auto;" />
					</div>
					<div class="box" id="blogbox"></div>
				</td>
			</tr>
		</tbody>
	</table>
	<footer class="footer">
		<p>
			Heavily inspired by
			<a href="https://dimden.dev" target="_blank" rel="noopener noreferrer">
				<span style="color: #2ba6b2;">dimden</span>’s website!
			</a>
		</p>
		<p>(c) 2024-{currentYear} luni. All Rights Reserved.</p>
		<p><a href="mailto:mgmt@mrrp.dev" style="color: #f58122;">mgmt@mrrp.dev</a></p>
	</footer>
</div>
