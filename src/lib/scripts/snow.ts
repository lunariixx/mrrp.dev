// Initializes a simple "snow" visual effect that only appears during winter months.
// November (10) to February (1) are treated as winter.
export function initSnow() {
	// Check current month (0 = January, 11 = December)
	const isWinter = [10, 11, 0, 1].includes(new Date().getMonth());
	if (!isWinter) return; // Exit if not winter

	// Create a container div for the snow effect
	const snowDiv = document.createElement('div');
	snowDiv.id = 'snow';

	// Append it to the page body so it can render above content
	document.body.appendChild(snowDiv);

	// Helper to stop the snow effect later if needed
	function stopSnow() {
		snowDiv.remove();
	}

	// Return a handle so the caller can stop the effect programmatically
	return { stopSnow };
}