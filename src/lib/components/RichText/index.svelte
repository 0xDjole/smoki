<script lang="ts">
	import { onMount } from 'svelte';
	import ErrorMessage from '../ErrorMessage.svelte';
	import 'quill/dist/quill.snow.css';

	interface Props {
		onChange?: any;
		placeholder?: string;
		value?: string;
		errors?: any;
		label?: string;
		labelThumbnail: any;
		minLength?: number;
		maxLength?: number;
		isDisabled?: boolean;
	}

	let {
		onChange = (htmlValue) => {},
		placeholder = 'Start typing...',
		value = $bindable(''),
		errors = $bindable([]),
		label = '',
		labelThumbnail,
		minLength = 0,
		maxLength = 2000,
		isDisabled = false
	}: Props = $props();

	let editorContainer = $state();
	let quill;

	onMount(async () => {
		// Dynamic import for Quill
		const Quill = (await import('quill')).default;
		quill = new Quill(editorContainer, {
			theme: 'snow',
			readOnly: isDisabled,
			placeholder,
			modules: {
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],
					['blockquote', 'code-block'],

					[{ header: 1 }, { header: 2 }],
					[{ list: 'ordered' }, { list: 'bullet' }],
					[{ script: 'sub' }, { script: 'super' }],
					[{ indent: '-1' }, { indent: '+1' }],
					[{ direction: 'rtl' }],

					[{ size: ['small', false, 'large', 'huge'] }],
					[{ header: [1, 2, 3, 4, 5, 6, false] }],

					[{ color: [] }, { background: [] }],
					[{ font: [] }],
					[{ align: [] }],

					['clean']
				]
			}
		});

		quill.root.innerHTML = value;

		quill.on('text-change', () => {
			let html = quill.root.innerHTML;
			value = html;
			onChange(html);
		});
	});
</script>

<div class="w-full">
	<div bind:this={editorContainer} class="quill-editor-container"></div>
	<ErrorMessage {errors} />
</div>

<style type="text/postcss">
	.quill-editor-container {
		@apply text-primary bg-primary h-[200px];
		background-color: #fff;
	}
</style>
