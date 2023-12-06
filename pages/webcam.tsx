/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';

// @ts-ignore
import { PathMe } from '@app/utils/PathMe';

type WindowDetails = {
	screenX: number;
	screenY: number;
	screenWidth: number;
	screenHeight: number;
	width: number;
	height: number;
	updated: number;
};

export default function Webcam() {
	useEffect(() => {
		const video = document.querySelector<HTMLVideoElement>('video');
		const svg = document.querySelector<SVGElement>('svg');
		const path = document.querySelector<SVGElement>('svg path');

		function getScreens(): [string, WindowDetails][] {
			return Object.entries(window.localStorage)
				.filter(([key]) => key.startsWith('screen-'))
				.map(([key, value]: [string, string]) => [key, JSON.parse(value) as WindowDetails]);
		}
		function getScreenId() {
			const existingScreens = Object.keys(window.localStorage)
				.filter((key) => key.startsWith('screen-'))
				.map((key) => parseInt(key.replace('screen-', '')))
				.sort((a, b) => a - b);
			// @ts-ignore
			return existingScreens.at(-1) + 1 || 1;
		}
		const screenId = `screen-${getScreenId()}`;

		function setScreenDetails() {
			const windowDetails = {
				screenX: window.screenX,
				screenY: window.screenY,
				screenWidth: window.screen.availWidth,
				screenHeight: window.screen.availHeight,
				width: window.outerWidth,
				height: window.innerHeight,
				updated: Date.now(),
			};
			window.localStorage.setItem(screenId, JSON.stringify(windowDetails));
			// console.log(windowDetails);
		}

		function removeScreen() {
			console.log(`removing screen ${screenId}`);
			localStorage.removeItem(screenId);
		}

		function removeOld() {
			const screens = getScreens();
			for (const [key, screen] of screens) {
				if (Date.now() - screen.updated > 1000) {
					localStorage.removeItem(key);
				}
			}
		}

		function makeSVG() {
			const screenPath = new PathMe();
			// Set the SVG viewBox using the screen size
			svg?.setAttribute('viewBox', `0 0 ${window.screen.availWidth} ${window.screen.availHeight}`);
			svg?.setAttribute('width', `${window.screen.availWidth}px`);
			svg?.setAttribute('height', `${window.screen.availHeight}px`);
			// OFfset it by the window position
			svg?.setAttribute('style', `transform: translate(-${window.screenX}px, -${window.screenY}px)`);
			// Also apply to video
			video?.setAttribute('style', `transform: translate(-${window.screenX}px, -${window.screenY}px)`);
			const screens = getScreens();
			screens
				// @ts-ignore
				.map(([key, screen]) => {
					const x = screen.screenX + screen.width / 2;
					const y = screen.screenY + screen.height / 2;
					return { ...screen, x, y };
				})
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.forEach((screen, i) => {
					if (i === 0) {
						// @ts-ignore
						screenPath.moveTo(screen.x, screen.y);
					} else {
						// @ts-ignore
						screenPath.lineTo(screen.x, screen.y);
					}
					// if (i === screens.length - 1) {
					// screenPath.lineTo(screens[0][1].x, screens[0][1].y);
					// }
				});

			screenPath.closePath();
			path?.setAttribute('d', screenPath.toString());
		}

		const timers: ReturnType<typeof setInterval>[] = [];
		function go() {
			timers.push(setInterval(setScreenDetails, 10));
			timers.push(setInterval(removeOld, 100));
			timers.push(setInterval(makeSVG, 10));
		}

		window.addEventListener('beforeunload', removeScreen);

		function populateWebcam() {
			navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
				if (!video) return;
				video.width = window.screen.availWidth;
				video.height = window.screen.availHeight;
				video.srcObject = stream;
				video.play();
			});
		}

		go();

		populateWebcam();
	}, []);

	return (
		<>
			<video className="absolute" src=""></video>
			<svg className="absolute" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
				<path
					fill="none"
					stroke="#ffc600"
					strokeWidth="5"
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M271,74 L1015,344 M271,74 L271,74"
				></path>
			</svg>
		</>
	);
}
