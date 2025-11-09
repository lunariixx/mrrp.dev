// Defines the public interface for a text ticker.
// A ticker can be started and stopped, similar to play/pause for a song.
export interface Ticker {
	start: () => void; // Starts scrolling the text
	stop: () => void;  // Stops scrolling the text
}

// Interval speed in milliseconds for each "tick" of the ticker
const tickSpeed = 300;

// Time to pause at the ends before reversing direction
const holdTime = 1000;

// Factory function to create a ticker for a given text
// `fullText` is the text to scroll
// `setter` updates the visible portion of the text
// `windowLength` defines how many characters are visible at once (default: 16)
export function createTicker(
	fullText: string,
	setter: (val: string) => void,
	windowLength: number = 16
): Ticker {
	let i = 0; // Current index in the text
	let direction = 1; // Scrolling direction: 1 = forward, -1 = backward
	const maxStart = fullText.length - windowLength; // Last start index to avoid overshooting
	let holding = false; // Whether we are currently in a pause at the end
	let interval: ReturnType<typeof setInterval> | undefined; // Handle for the interval timer

	// Single tick of the ticker: updates the visible text and handles direction reversal
	function tick() {
		if (!holding) {
			// Update the visible portion of the text
			setter(fullText.substring(i, i + windowLength));

			// Check if we reached the end or start of the text
			if ((direction === 1 && i >= maxStart) || (direction === -1 && i <= 0)) {
				holding = true; // Pause at the end
				setTimeout(() => {
					direction *= -1; // Reverse direction
					holding = false; // Resume scrolling
				}, holdTime);
			} else {
				i += direction; // Move to the next character
			}
		}
	}

	// Start the ticker
	function start() {
		stop(); // Stop any existing ticker
		if (fullText.length <= windowLength) {
			// Text fits in the window, no scrolling needed
			setter(fullText);
			return;
		}
		interval = setInterval(tick, tickSpeed); // Start the interval timer
	}

	// Stop the ticker
	function stop() {
		if (interval) clearInterval(interval); // Clear the interval timer
	}

	// Return the start/stop controls for the ticker
	return { start, stop };
}
