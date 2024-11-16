(function () {
	function createSpeedDisplay() {
		if (document.querySelector('#custom-speed-display')) return;

        // selects the bottom Youtube control bar
		const controlBar = document.querySelector('.ytp-right-controls');

		// create the speed button
		const speedDisplay = document.createElement('div');
		speedDisplay.id = 'custom-speed-display';
		speedDisplay.className = 'ytp-button';
		speedDisplay.style.cursor = 'pointer';
		speedDisplay.style.padding = '0 15px';
		speedDisplay.style.color = '#fff';
		speedDisplay.style.fontWeight = 'bold';
        speedDisplay.style.width = 'auto';
		speedDisplay.textContent = '1x'; 

		// select video and update speed
		const video = document.querySelector('video');
		if (!video) {
			console.error('Video element not found');
			return;
		}
		const updateSpeed = (speed) => {
			video.playbackRate = speed;
			speedDisplay.textContent = `${speed}x`;
		};

		// create speed change prompt
		speedDisplay.addEventListener('click', () => {
			const currentSpeed = video.playbackRate || 1;
			const speed = prompt(
				'Enter playback speed (e.g., 1.25, 2):',
				currentSpeed
			);
			if (speed && !isNaN(speed)) {
				updateSpeed(parseFloat(speed));
			}
		});

		// update the button's display
		video.addEventListener('ratechange', () => {
			speedDisplay.textContent = `${video.playbackRate}x`;
		});

		// add to control bar
        const firstChild = controlBar.firstChild;
        controlBar.insertBefore(speedDisplay, firstChild);		
	}

	const observer = new MutationObserver(() => {
		createSpeedDisplay();
	});
	observer.observe(document.body, { childList: true, subtree: true });

	createSpeedDisplay();
})();
