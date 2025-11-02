export function initSnow() {
    // Check if the current month is winter (Nov, Dec, Jan, Feb)
	const isWinter = [10, 11, 0, 1].includes(new Date().getMonth());
	if (!isWinter) return;

    // Create snow container
	const snowDiv = document.createElement('div');
	snowDiv.id = 'snow';

    // Append to document body
	document.body.appendChild(snowDiv);

    // Function to stop snow
	function stopSnow() {
		snowDiv.remove();
	}

    // Return stop function
	return { stopSnow };
}
