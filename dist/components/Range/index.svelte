<script>
	import { createEventDispatcher } from 'svelte';

	import Label from '../Label.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';

	// Props
	export let min = 0;
	export let max = 100;
	export let initialValue = 0;
	export let id = null;
	export let value = typeof initialValue === 'string' ? parseInt(initialValue) : initialValue;

	export let label = '';
	export let labelThumbnail;

	export let t;
	export let errors = [];
	export let isRequired = false;

	// Node Bindings
	let container = null;
	let thumb = null;
	let progressBar = null;
	let element = null;

	// Internal State
	let elementX = null;
	let currentThumb = null;
	let keydownAcceleration = 0;
	let accelerationTimer = null;

	// Dispatch 'change' events
	const dispatch = createEventDispatcher();

	function resizeWindow() {
		elementX = element.getBoundingClientRect().left;
	}

	// Allows both bind:value and on:change for parent value retrieval

	let blockChange = false;
	function setValue(val) {
		if (!blockChange) {
			if (!val) {
				blockChange = true;

				setTimeout(() => {
					blockChange = false;
				}, 100);
			}

			value = val;
			errors = [];
			dispatch('change', { value });
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
		// Find distance between cursor and element's left cord (20px / 2 = 10px) - Center of thumb
		let delta = clientX - (elementX + 10);

		// Use width of the container minus (5px * 2 sides) offset for percent calc
		let percent = (delta * 100) / (container.clientWidth - 10);

		// Limit percent 0 -> 100
		percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

		// Limit value min -> max
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
	$: if (element) elementX = element.getBoundingClientRect().left;

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
	$: if (progressBar && thumb) {
		let percent = getPercent(value, min, max);
		let offsetLeft = (container.clientWidth - 10) * (percent / 100) + 5;

		// Update thumb position + active range track width
		thumb.style.left = `${offsetLeft}px`;
		progressBar.style.width = `${offsetLeft}px`;
	}

	function clampValue(val) {
		let numericValue = parseInt(val, 10);
		if (isNaN(numericValue)) {
			return '';
		}

		console.log(numericValue, min, max);
		if (numericValue < min) {
			return min;
		}
		if (numericValue > max) {
			console.log('here');
			return max;
		}
		return numericValue;
	}
</script>

<Label {isRequired} {t} {label} {labelThumbnail} {errors} />

<svelte:window
	on:touchmove|nonpassive={updateValueOnEvent}
	on:touchcancel={onDragEnd}
	on:touchend={onDragEnd}
	on:mousemove={updateValueOnEvent}
	on:mouseup={onDragEnd}
	on:resize={resizeWindow}
/>
<div class="range" class:range_active={value}>
	<div class:passive={!value} class="side side-left">{min}</div>
	<div class="range__wrapper" bind:this={element} {id}>
		<div
			on:mousedown={onTrackEvent}
			on:touchstart={onTrackEvent}
			on:keydown={onKeyPress}
			class:passive={!value}
			class="range__track"
			bind:this={container}
		>
			<div class="range__track--highlighted" bind:this={progressBar} />
		</div>

		<div bind:this={thumb} class="range_thumb_container">
			<div class="range__thumb" on:touchstart={onDragStart} on:mousedown={onDragStart}>
				{#if value}
					<div class="range__tooltip">
						<input
							type="number"
							{min}
							{max}
							bind:value
							on:input={(e) => {
								value = clampValue(e.target.value);
							}}
							on:change={(e) => {
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
					on:touchstart={() => setValue(null)}
					on:click|preventDefault|stopPropagation={() => {
						setValue(null);
					}}
				>
					<span>x</span>
				</button>
			{/if}
		</div>
	</div>

	<div class:passive={!value} class="side side-right">{max}</div>
</div>

<ErrorMessage {t} {errors} />

<style>
	.side {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700;
		--tw-text-opacity: 1;
		color: rgb(255 255 255 / var(--tw-text-opacity));
}

	.side-left {
		padding-right: 0.75rem;
}

	.side-right {
		padding-left: 0.75rem;
}

	.range {
		position: relative;
		display: flex;
		align-items: center;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
}

	.range_active {
		margin-top: 3rem;
}

	.range__wrapper {
		width: 100%;
		padding: 0.3rem;
		box-sizing: border-box;
		position: relative;
		outline: none;
	}

	.range__track {
		height: 8px;
		background-color: var(--track-bgcolor, #d0d0d0);
		border-radius: 999px;
	}

	.passive {
		opacity: 0.4;
}

	.range__track--highlighted {
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
		-webkit-user-select: none;
		   -moz-user-select: none;
		        user-select: none;
		box-shadow: var(
			--thumb-boxshadow,
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 0px 2px 1px rgba(0, 0, 0, 0.2)
		);
	}

	.range__tooltip {
		position: absolute;
		display: flex;
		min-width: 50px;
		align-items: center;
		justify-content: space-between;
		border-radius: 9999px;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--primary-text-color);
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
		-webkit-clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		        clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		transform: rotate(-45deg);
		border-radius: 0 0 0 3px;
	}

	.close-range {
		margin-top: -3.5rem;
		margin-left: 2.5rem;
		display: flex;
		height: 2rem;
		width: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		--tw-bg-opacity: 1;
		background-color: rgb(255 255 255 / var(--tw-bg-opacity));
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--accent-color);
}

	.tool-input {
		width: 100%;
		border-style: none;
		background-color: transparent;
		outline: 2px solid transparent;
		outline-offset: 2px;
}</style>
