// This interface defines the shape of the "now playing" data
// returned from your Last.fm API endpoint.
export interface NowPlaying {
	nowPlaying: boolean; // Whether music is currently playing
	artist: string;      // Artist name
	title: string;       // Track title
	url: string;         // Link to the track on Last.fm
	image: string;       // Album artwork URL
	playedAt: string | null; // Timestamp of when the song was last played
}

// Fetches the "now playing" data from your API endpoint.
// Returns a structured NowPlaying object, with default fallbacks
// in case of missing fields or network errors.
export async function fetchNowPlaying(): Promise<NowPlaying> {
	try {
		// Request data from your backend API (SvelteKit endpoint or remote)
		const res = await fetch('/api/services/lastfm/now');
		const data = await res.json();

		// Normalize the response — ensures all fields exist even if the API omits some
		return {
			nowPlaying: data.nowPlaying ?? false,
			artist: data.artist ?? '',
			title: data.title ?? '',
			url: data.url ?? '',
			image: data.image ?? '',
			playedAt: data.playedAt ?? null
		};
	} catch (err) {
		// Handle network or parsing errors gracefully
		console.error('Failed to fetch Last.fm now playing', err);

		// Return a safe default object so the UI doesn’t break
		return {
			nowPlaying: false,
			artist: '',
			title: '',
			url: '',
			image: '',
			playedAt: null
		};
	}
}