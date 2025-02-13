<script lang="ts">
	import { run, nonpassive, preventDefault, stopPropagation } from 'svelte/legacy';

	import { tick } from 'svelte';

	import Label from '../Label.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';




	interface Props {
		min?: number;
		max?: number;
		initialValue?: number;
		id?: any;
		value?: any;
		theme?: any;
		label?: string;
		labelThumbnail: any;
		t: any;
		errors?: any;
		isRequired?: boolean;
		onChange?: any;
	}

	let {
		min = 0,
		max = 100,
		initialValue = 0,
		id = null,
		value = $bindable(typeof initialValue === 'string' ? parseInt(initialValue) : initialValue),
		theme = null,
		label = '',
		labelThumbnail,
		t,
		errors = $bindable([]),
		isRequired = false,
		onChange = (value) => {}
	}: Props = $props();

	let thumbOpened = $state(false);

	let container = $state(null);
	let thumb = $state(null);
	let progressBar = $state(null);
	let element = $state(null);

	let elementX = $state(null);
	let currentThumb = null;
	let keydownAcceleration = 0;
	let accelerationTimer = null;

	let input = $state(null);

	function resizeWindow() {
		elementX = element.getBoundingClientRect().left;
	}

	let blockChange = false;
	function setValue(val) {
		if (!blockChange) {
			if (!val) {
				blockChange = true;

				setTimeout(() => {
					blockChange = false;
				}, 100);
			}

			if (input && val) {
				if (val.toString().length === 1) {
					input.style.width = `50px`;
				} else if (val.toString().length === 2) {
					input.style.width = `60px`;
				} else {
					input.style.width = `70px`;
				}
			}

			if (!val) {
				thumbOpened = false;
			}

			value = val;
			errors = [];

			onChange(value);
		}
	}

	function onTrackEvent(e) {
		// Update value immediately before beginning drag
		updateValueOnEvent(e);
		onDragStart(e);
	}

	function onDragStart(e) {
		// If mouse event add a pointer events shield
		currentThumb = thumb;
	}

	function onDragEnd(e) {
		// If using mouse - remove pointer event shield
		if (e.type === 'mouseup') {
			// Needed to check whether thumb and mouse overlap after shield removed
		}
		currentThumb = null;
	}

	// Accessible keypress handling
	function onKeyPress(e) {
		// Max out at +/- 10 to value per event (50 events / 5)
		// 100 below is to increase the amount of events required to reach max velocity
		if (keydownAcceleration < 50) keydownAcceleration++;
		let throttled = Math.ceil(keydownAcceleration / 5);

		if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
			if (value + throttled > max || value >= max) {
				setValue(max);
			} else {
				setValue(value + throttled);
			}
		}
		if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
			if (value - throttled < min || value <= min) {
				setValue(min);
			} else {
				setValue(value - throttled);
			}
		}

		// Reset acceleration after 100ms of no events
		clearTimeout(accelerationTimer);
		accelerationTimer = setTimeout(() => (keydownAcceleration = 1), 100);
	}

	function calculateNewValue(clientX) {
		let delta = clientX - (elementX + 10);

		let percent = (delta * 100) / (container.clientWidth - 10);

		percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

		setValue(parseInt((percent * (max - min)) / 100) + min);
	}

	// Handles both dragging of touch/mouse as well as simple one-off click/touches
	function updateValueOnEvent(e) {
		// touchstart && mousedown are one-off updates, otherwise expect a currentPointer node
		if (!currentThumb && e.type !== 'touchstart' && e.type !== 'mousedown') return false;

		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();

		// Get client's x cord either touch or mouse
		const clientX =
			e.type === 'touchmove' || e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;

		calculateNewValue(clientX);
	}

	// React to left position of element relative to window
	run(() => {
		if (element) elementX = element.getBoundingClientRect().left;
	});

	// Set a class based on if dragging

	const getPercent = (value, min, max) => {
		if (value <= min) {
			return 0;
		}

		if (value >= max) {
			return 100;
		}

		return ((value - min) * 100) / (max - min);
	};

	// Update progressbar and thumb styles to represent value
	run(() => {
		if (progressBar && thumb) {
			let percent = getPercent(value, min, max);
			let offsetLeft = (container.clientWidth - 10) * (percent / 100) + 5;

			// Update thumb position + active range track width
			thumb.style.left = `${offsetLeft}px`;
			progressBar.style.width = `${offsetLeft}px`;
		}
	});

	const getLeft = (value) => {
		let percent = getPercent(value, min, max);
		let offsetLeft = (container.clientWidth - 10) * (percent / 100) + 10;

		return offsetLeft;
	};

	run(() => {
		if (value && element) {
			tick().then(() => {
				const elementRect = element.getBoundingClientRect();
				const desiredOffset = 50;
				const scrollTarget =
					window.scrollY +
					elementRect.top -
					(window.innerHeight - elementRect.height) / 2 +
					desiredOffset;

				window.scrollTo({
					top: scrollTarget,
					behavior: 'smooth'
				});
			});
		}
	});

	let strips = max <= 30 ? Array.from({ length: max }, (_, i) => i + 1) : [];

	function clampValue(val) {
		let numericValue = parseInt(val, 10);
		if (isNaN(numericValue)) {
			return '';
		}

		if (numericValue < min) {
			return min;
		}
		if (numericValue > max) {
			return max;
		}
		return numericValue;
	}

	run(() => {
		if (value) {
			thumbOpened = true;
		}
	});
</script>

<svelte:window
	use:nonpassive={['touchmove', () => updateValueOnEvent]}
	ontouchcancel={onDragEnd}
	ontouchend={onDragEnd}
	onmousemove={updateValueOnEvent}
	onmouseup={onDragEnd}
	onresize={resizeWindow}
/>

{#if t}
	<Label {isRequired} {t} {label} {labelThumbnail} {errors} />

	<div class="range" class:range_active={thumbOpened}>
		<div class:passive={!value} class="side side-left">{min}</div>
		<div class="range__wrapper" bind:this={element} {id}>
			<div
				onmousedown={onTrackEvent}
				ontouchstart={onTrackEvent}
				onkeydown={onKeyPress}
				class:passive={!value}
				class="range__track"
				class:light={theme === 'light'}
				class:dark={theme === 'dark'}
				bind:this={container}
			>
				<div class="strips">
					{#each strips as strip, i}
						{#if i > 1 && container}
							<div style={`left: ${getLeft(i)}px`} class="strip"></div>
						{/if}
					{/each}
				</div>
			</div>

			<div class="range__track--highlighted" bind:this={progressBar}></div>

			<div bind:this={thumb} class="range_thumb_container">
				<div class="range__thumb" ontouchstart={onDragStart} onmousedown={onDragStart}>
					{#if thumbOpened}
						<div class="range__tooltip" bind:this={input}>
							<input
								onblur={() => {
									if (!value) {
										thumbOpened = false;
									}
								}}
								type="number"
								{min}
								{max}
								bind:value
								oninput={(e) => {
									value = clampValue(e.target.value);
								}}
								onchange={(e) => {
									value = clampValue(e.target.value);
								}}
								class="tool-input"
							/>
						</div>
					{/if}
				</div>

				{#if value}
					<button
						class="close-range"
						ontouchstart={() => setValue(null)}
						onclick={stopPropagation(preventDefault(() => {
							setValue(null);
						}))}
					>
						<span>x</span>
					</button>
				{/if}
			</div>
		</div>

		<div class:passive={!value} class="side side-right">{max}</div>
	</div>
	<ErrorMessage {t} {errors} />
{/if}

<style type="text/postcss">
	.side {
		@apply font-bold text-primary text-lg min-w-[30px] text-center;
	}

	.side-left {
		@apply pr-1;
	}

	.side-right {
		@apply pl-1;
	}

	.range {
		@apply flex items-center relative transition-all duration-150;
	}

	.range_active {
		@apply mt-12;
	}

	.range__wrapper {
		width: 100%;
		padding: 0.3rem;
		box-sizing: border-box;
		position: relative;
		outline: none;
	}

	.range__track {
		@apply bg-secondary border-primary;
		height: 8px;
		border-radius: 999px;
	}

	.passive {
		@apply opacity-60;
	}

	.range__track--highlighted {
		@apply absolute top-1.5;
		background: linear-gradient(
			90deg,
			var(--accent-background-color),
			var(--error-background-color)
		);
		width: 0;
		height: 7px;
		border-radius: 999px;
	}

	.range_thumb_container {
		position: absolute;
	}

	.range__thumb {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: var(--thumb-bgcolor, white);
		cursor: pointer;
		border-radius: 999px;
		margin-top: -14px;
		transition: box-shadow 100ms;
		user-select: none;
		box-shadow: var(
			--thumb-boxshadow,
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 0px 2px 1px rgba(0, 0, 0, 0.2)
		);
	}

	.range__tooltip {
		@apply flex items-center justify-center absolute text-white text-xl rounded-full px-1 py-0.5 font-bold w-full transition-all duration-500 min-w-[50px];
		top: -42px;
		text-align: center;
		background: linear-gradient(
			45deg,
			var(--accent-background-color),
			var(--error-background-color)
		);
	}

	.range__tooltip::after {
		content: '';
		display: block;
		position: absolute;
		height: 7px;
		width: 7px;
		background: linear-gradient(
			90deg,
			var(--accent-background-color),
			var(--error-background-color)
		);
		bottom: -3px;
		left: calc(50% - 3px);
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		transform: rotate(-45deg);
		border-radius: 0 0 0 3px;
	}

	.close-range {
		@apply flex items-center justify-center text-accent font-bold text-xl -mt-14 ml-10 rounded-full bg-secondary w-8 h-8 border-primary;
	}

	.tool-input {
		@apply block border-none bg-transparent outline-none w-full text-center;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}

	input[type='number'] {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.strips {
		@apply relative w-full -top-[10px];
	}

	.strip {
		@apply absolute h-[30px] w-[1.5px] border-primary;
	}

	.dark {
		filter: brightness(150%);
	}

	.light {
		filter: brightness(100%);
	}
</style>
