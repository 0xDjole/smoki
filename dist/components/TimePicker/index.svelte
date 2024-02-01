<script>import { onMount, tick } from 'svelte';
const easing = {
    easeOutCubic: function (pos) {
        return Math.pow(pos - 1, 3) + 1;
    },
    easeOutQuart: function (pos) {
        return -(Math.pow(pos - 1, 4) - 1);
    }
};
export let options;
export let onChange;
export let selectedValue = null;
let isScrolling = false;
let el;
let source;
let itemHeight;
let itemAngle;
let radius;
let sourceLength;
let selectOptionEl;
let highLightEl;
let highLightListEl;
let selected;
let value;
let halfCount = options.count / 2;
$: {
    let concatSource = [].concat(options.source);
    while (concatSource.length < halfCount) {
        concatSource = concatSource.concat(options.source);
    }
    source = concatSource;
    sourceLength = source.length;
}
$: if (selectedValue !== null) {
    value = selectedValue;
    selectValue();
}
else {
    value = options.source[0].value;
}
let a = options.sensitivity * 10;
let quarterCount = options.count / 4;
let touchData = {
    startY: 0,
    yArr: [],
    touchScroll: null
};
let scroll;
let moveT = 0;
let elems = {
    el: null,
    circleList: null,
    circleItems: null,
    highlight: null,
    highlightList: null
};
let loadedCircleItems = false;
onMount(() => {
    elems.el = el;
    itemHeight = (elems.el.offsetHeight * 7) / options.count;
    itemAngle = 360 / options.count;
    radius = itemHeight / Math.tan((itemAngle * Math.PI) / 180);
    scroll = 0;
    elems.circleList = selectOptionEl;
    elems.highlight = highLightEl;
    elems.highlightList = highLightListEl;
    elems.highlightList.style.top = -itemHeight + 'px';
    elems.highlight.style.height = itemHeight + 'px';
    elems.highlight.style.lineHeight = itemHeight + 'px';
});
$: source && loadItems();
$: loadedCircleItems && selectValue();
const loadItems = async () => {
    await tick();
    elems.circleItems = elems.el.querySelectorAll('.select-option');
    loadedCircleItems = true;
};
const selectValue = () => {
    select(value);
};
const touchStart = (e) => {
    e.preventDefault();
    isScrolling = true;
    elems.el.addEventListener('touchmove', touchMove);
    elems.el.addEventListener('mousemove', touchMove);
    let eventY = e.clientY || e.touches[0].clientY;
    touchData.startY = eventY;
    touchData.yArr = [[eventY, new Date().getTime()]];
    touchData.touchScroll = scroll;
    stop();
};
const stop = () => {
    cancelAnimationFrame(moveT);
};
const normalizeScroll = (scroll) => {
    let normalizedScroll = scroll;
    while (normalizedScroll < 0) {
        normalizedScroll += source.length;
    }
    normalizedScroll = normalizedScroll % source.length;
    return normalizedScroll;
};
const animateMoveByInitV = async (initV) => {
    let initScroll;
    let finalScroll;
    let totalScrollLen;
    let localA;
    let t;
    initScroll = scroll;
    localA = initV > 0 ? -a : a;
    t = Math.abs(initV / localA);
    totalScrollLen = initV * t + (localA * t * t) / 2;
    finalScroll = Math.round(scroll + totalScrollLen);
    await animateToScroll(scroll, finalScroll, t, 'easeOutQuart');
    selectByScroll(scroll);
};
const animateToScroll = (initScroll, finalScroll, t, easingName = 'easeOutQuart') => {
    if (initScroll === finalScroll || t === 0) {
        moveToMe(initScroll);
        return;
    }
    let start = new Date().getTime() / 1000;
    let pass = 0;
    let totalScrollLen = finalScroll - initScroll;
    return new Promise((resolve, reject) => {
        let tick = () => {
            pass = new Date().getTime() / 1000 - start;
            if (pass < t) {
                scroll = moveToMe(initScroll + easing[easingName](pass / t) * totalScrollLen);
                moveT = requestAnimationFrame(tick);
            }
            else {
                resolve(null);
                stop();
                scroll = moveToMe(initScroll + totalScrollLen);
            }
        };
        tick();
    });
};
const moveToMe = (scroll) => {
    scroll = normalizeScroll(scroll);
    elems.circleList.style.transform = `translate3d(0, 0, ${-radius}px) rotateX(${itemAngle * scroll}deg)`;
    elems.highlightList.style.transform = `translate3d(0, ${-scroll * itemHeight}px, 0)`;
    [...elems.circleItems].forEach((itemElem) => {
        if (Math.abs(itemElem.dataset.index - scroll) > quarterCount) {
            itemElem.style.visibility = 'hidden';
        }
        else {
            itemElem.style.visibility = 'visible';
        }
    });
    return scroll;
};
const touchMove = (e) => {
    let eventY = e.clientY || e.touches[0].clientY;
    touchData.yArr.push([eventY, new Date().getTime()]);
    let scrollAdd = (touchData.startY - eventY) / itemHeight;
    let moveToScroll = scrollAdd + scroll;
    moveToScroll = normalizeScroll(moveToScroll);
    touchData.touchScroll = moveToMe(moveToScroll);
};
const touchEnd = (e) => {
    if (!isScrolling) {
        return null;
    }
    isScrolling = false;
    elems.el.removeEventListener('touchmove', touchMove);
    elems.el.removeEventListener('mousemove', touchMove);
    let v;
    if (touchData.yArr.length === 1) {
        v = 0;
    }
    else {
        let startTime = touchData.yArr[touchData.yArr.length - 2][1];
        let endTime = touchData.yArr[touchData.yArr.length - 1][1];
        let startY = touchData.yArr[touchData.yArr.length - 2][0];
        let endY = touchData.yArr[touchData.yArr.length - 1][0];
        v = (((startY - endY) / itemHeight) * 1000) / (endTime - startTime);
        let sign = v > 0 ? 1 : -1;
        v = Math.abs(v) > 30 ? 30 * sign : v;
    }
    scroll = touchData.touchScroll;
    animateMoveByInitV(v);
};
const selectByScroll = (scroll) => {
    scroll = normalizeScroll(scroll) | 0;
    if (scroll > source.length - 1) {
        scroll = source.length - 1;
        moveToMe(scroll);
    }
    moveToMe(scroll);
    scroll = scroll;
    selected = source[scroll];
    onChange(selected);
};
const select = (value) => {
    for (let i = 0; i < source.length; i++) {
        if (source[i].value === value) {
            window.cancelAnimationFrame(moveT);
            let initScroll = normalizeScroll(scroll);
            let finalScroll = i;
            let t = Math.sqrt(Math.abs((finalScroll - initScroll) / a));
            animateToScroll(initScroll, finalScroll, t);
            setTimeout(() => selectByScroll(i));
            return;
        }
    }
    throw new Error(`can not select value: ${value}, ${value} match nothing in current source`);
};
</script>

<div
	on:mousedown={touchStart}
	on:touchstart={touchStart}
	on:touchend={touchEnd}
	on:mouseup={touchEnd}
	on:mouseleave={touchEnd}
	id="date-selector"
	bind:this={el}
>
	<div class="select-wrap">
		<ul
			bind:this={selectOptionEl}
			class="select-options"
			style={`transform: translate3d(0, 0, ${-radius}px) rotateX(0deg);`}
		>
			{#if source && source.length}
				{#each new Array(quarterCount).fill(null) as _, index}
					<li
						class="select-option"
						style={`
                            top: ${itemHeight * -0.5}px;
                            height: ${itemHeight}px;
                            line-height: ${itemHeight}px;
                            transform: rotateX(${
															itemAngle * (index + 1)
														}deg) translate3d(0, 0, ${radius}px);
                    `}
						data-index={-index - 1}
					>
						{source[sourceLength - index - 1].text}
					</li>
				{/each}
				{#each source as sourceItem, index}
					<li
						class="select-option"
						style={`
                        top: ${itemHeight * -0.5}px;
                        height: ${itemHeight}px;
                        line-height: ${itemHeight}px;
                        transform: rotateX(${-itemAngle * index}deg) translate3d(0, 0, ${radius}px);
                        `}
						data-index={index}
					>
						{sourceItem.text}
					</li>
				{/each}
				{#each new Array(quarterCount).fill(null) as _, index}
					<li
						class="select-option"
						style={`
                        top: ${itemHeight * -0.5}px;
                        height: ${itemHeight}px;
                        line-height: ${itemHeight}px;
                        transform: rotateX(${
													-itemAngle * (index + sourceLength)
												}deg) translate3d(0, 0, ${radius}px);
                        `}
						data-index={index + sourceLength}
					>
						{source[index].text}
					</li>
				{/each}
			{/if}
		</ul>
		<div bind:this={highLightEl} class="highlight">
			<ul bind:this={highLightListEl} class="highlight-list">
				{#if source && source.length}
					<li class="highlight-item" style={`height: ${itemHeight}px;`}>
						{source[sourceLength - 1].text}
					</li>
					{#each source as sourceItem}
						<li class="highlight-item" style={`height: ${itemHeight}px;`}>
							{sourceItem.text}
						</li>
					{/each}
					<li class="highlight-item" style={`height: ${itemHeight}px;`}>{source[0].text}</li>
				{/if}
			</ul>
		</div>
	</div>
</div>

<style>
	.select-wrap::before,
	::after {
		position: absolute;
		z-index: 1;
		display: block;
		content: '';
		width: 100%;
		height: 50%;
	}

	.select-options {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 0;
		transform-style: preserve-3d;
		margin: 0 auto;
		display: block;
		transform: translateZ(-150px) rotateX(0deg);
		-webkit-font-smoothing: subpixel-antialiased;
		color: #666;
	}

	.select-option {
		position: absolute;
		width: 100%;
		-webkit-font-smoothing: subpixel-antialiased;
	}

	.select-wrap {
		cursor: grab;
		position: relative;
		height: 100%;
		text-align: center;
		overflow: hidden;
		font-size: 30px;
		color: #ddd;
	}

	@media (min-width: 768px) {

	.select-wrap {
			font-size: 40px
	}
		}

	.highlight {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		width: 100%;
		font-size: 30px;
		overflow: hidden;
	}

	@media (min-width: 768px) {

	.highlight {
			font-size: 40px
	}
		}

	.highlight-list {
		position: absolute;
		width: 100%;
	}

	#date-selector {
		-webkit-user-select: none;
		   -moz-user-select: none;
		        user-select: none;
		perspective: 2000px;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}

	#date-selector div {
		flex: 1;
	}</style>
