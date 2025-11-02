export type FPSOptions = {
	elementId?: string; // default fps
	sampleSize?: number; // default 25
	updateEvery?: number; // default 25
	format?: (fps: number) => string; // optional formatter
};

export function startFPS(options: FPSOptions = {}): void {
	const {
		elementId = 'fps', // element ID where FPS will be displayed
		sampleSize = 25, // This is your average fps over however many frames. (In this case, 25 frames.)
		updateEvery = 25, // This is how often the number changes. This will update the display every 25 frames.
		format = (fps) => fps.toString() // Default formatting option. This is currently just the number.
	} = options;

	// Get the HTML element where FPS will be displayed.
	const fpsEl = document.getElementById(elementId);
	if (!fpsEl) return; // Exit if element not found.

	// Track the time since last frame.
	let lastTime = performance.now();

	// Array to store FPS values for averaging.
	const fpsArr: number[] = Array(sampleSize).fill(60); // Initialize with 60 FPS
	let counter = 0; // Count frames until display update

	// Function called on every animation frame
	function updateFPS(now: DOMHighResTimeStamp): void {
		// Calculate FPS for this frame
		const fps = 1000 / (now - lastTime); // 1000ms / frame duritation
		lastTime = now;

		// Add the current FPS to the rolling array
		fpsArr.push(fps);
		if (fpsArr.length > sampleSize) fpsArr.shift(); // keep array at sampleSize

		// Update display only every 'updateEvery' frames
		if (++counter > updateEvery) {
			counter = 0; // reset counter

			// Compute average FPS over the last 'sampleSize' frames
			const avgFPS = Math.round(fpsArr.reduce((a, b) => a + b, 0) / fpsArr.length);

			// Update the element text, converting number to string
			// isFinite check prevents Infinity or NaN
			fpsEl!.innerText = isFinite(avgFPS) ? format(avgFPS) : '';
		}

        // Schedule next frame
		requestAnimationFrame(updateFPS);
	}

    // Start the animation loop
	requestAnimationFrame(updateFPS);
}
