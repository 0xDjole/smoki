<script>import { tick } from 'svelte';
import Label from '../Label.svelte';
import ErrorMessage from '../ErrorMessage.svelte';
export let min = 0;
export let max = 100;
export let initialValue = 0;
export let id = null;
export let value = typeof initialValue === 'string' ? parseInt(initialValue) : initialValue;
export let theme = null;
export let label = '';
export let labelThumbnail;
export let t;
export let errors = [];
export let isRequired = false;
export let onChange = (value) => { };
let thumbOpened = false;
let container = null;
let thumb = null;
let progressBar = null;
let element = null;
let elementX = null;
let currentThumb = null;
let keydownAcceleration = 0;
let accelerationTimer = null;
let input = null;
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
            }
            else if (val.toString().length === 2) {
                input.style.width = `60px`;
            }
            else {
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
    if (keydownAcceleration < 50)
        keydownAcceleration++;
    let throttled = Math.ceil(keydownAcceleration / 5);
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        if (value + throttled > max || value >= max) {
            setValue(max);
        }
        else {
            setValue(value + throttled);
        }
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        if (value - throttled < min || value <= min) {
            setValue(min);
        }
        else {
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
    if (!currentThumb && e.type !== 'touchstart' && e.type !== 'mousedown')
        return false;
    if (e.stopPropagation)
        e.stopPropagation();
    if (e.preventDefault)
        e.preventDefault();
    // Get client's x cord either touch or mouse
    const clientX = e.type === 'touchmove' || e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    calculateNewValue(clientX);
}
// React to left position of element relative to window
$: if (element)
    elementX = element.getBoundingClientRect().left;
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
const getLeft = (value) => {
    let percent = getPercent(value, min, max);
    let offsetLeft = (container.clientWidth - 10) * (percent / 100) + 10;
    return offsetLeft;
};
$: if (value && element) {
    tick().then(() => {
        const elementRect = element.getBoundingClientRect();
        const desiredOffset = 50;
        const scrollTarget = window.scrollY +
            elementRect.top -
            (window.innerHeight - elementRect.height) / 2 +
            desiredOffset;
        window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
        });
    });
}
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
$: if (value) {
    thumbOpened = true;
}
</script>

<svelte:window
	on:touchmove|nonpassive={updateValueOnEvent}
	on:touchcancel={onDragEnd}
	on:touchend={onDragEnd}
	on:mousemove={updateValueOnEvent}
	on:mouseup={onDragEnd}
	on:resize={resizeWindow}
/>

{#if t}
	<Label {isRequired} {t} {label} {labelThumbnail} {errors} />

	<div class="range" class:range_active={thumbOpened}>
		<div class:passive={!value} class="side side-left">{min}</div>
		<div class="range__wrapper" bind:this={element} {id}>
			<div
				on:mousedown={onTrackEvent}
				on:touchstart={onTrackEvent}
				on:keydown={onKeyPress}
				class:passive={!value}
				class="range__track"
				class:light={theme === 'light'}
				class:dark={theme === 'dark'}
				bind:this={container}
			>
				<div class="strips">
					{#each strips as strip, i}
						{#if i > 1 && container}
							<div style={`left: ${getLeft(i)}px`} class="strip" />
						{/if}
					{/each}
				</div>
			</div>

			<div class="range__track--highlighted" bind:this={progressBar} />

			<div bind:this={thumb} class="range_thumb_container">
				<div class="range__thumb" on:touchstart={onDragStart} on:mousedown={onDragStart}>
					{#if thumbOpened}
						<div class="range__tooltip" bind:this={input}>
							<input
								on:blur={() => {
									if (!value) {
										thumbOpened = false;
									}
								}}
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
{/if}

<style>
	.side {
		min-width: 30px;
		text-align: center;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--primary-text-color);
}

	.side-left {
		padding-right: 0.25rem;
}

	.side-right {
		padding-left: 0.25rem;
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
		background-color: var(--secondary-background-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
		height: 8px;
		border-radius: 999px;
}

	.passive {
		opacity: 0.6;
}

	.range__track--highlighted {
		position: absolute;
		top: 0.375rem;
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
		width: 100%;
		min-width: 50px;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		--tw-text-opacity: 1;
		color: rgb(255 255 255 / var(--tw-text-opacity));
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 500ms;
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
		background-color: var(--secondary-background-color);
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		color: var(--accent-color);
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
}

	.tool-input {
		display: block;
		width: 100%;
		border-style: none;
		background-color: transparent;
		text-align: center;
		outline: 2px solid transparent;
		outline-offset: 2px;
}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.strips {
		position: relative;
		top: -10px;
		width: 100%;
}

	.strip {
		position: absolute;
		height: 30px;
		width: 1.5px;
		border-color: var(--primary-border-color);
		border-width: 1px;
		border-style: solid;
}

	.dark {
		filter: brightness(150%);
	}

	.light {
		filter: brightness(100%);
	}</style>
