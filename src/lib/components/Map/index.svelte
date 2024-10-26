<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import Label from '../Label.svelte';

	import Location from '../../utils/icons/location.svg?raw';

	let L = $state();
	let map = $state();
	let marker;

	interface Props {
		value: any;
		label?: string;
		labelThumbnail: any;
		errors?: any;
		allowTag?: boolean;
		zoom?: number;
	}

	let {
		value = $bindable(),
		label = '',
		labelThumbnail,
		errors = $bindable([]),
		allowTag = true,
		zoom = 14
	}: Props = $props();

	onMount(async () => {
		L = await import('leaflet');
		L = L.default || L;
		await import('leaflet/dist/leaflet.css');

		const lat = 44.772182;
		const lon = 17.191;

		map = L.map('map').setView([lat, lon], zoom);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		map.dragging.disable();
		map.touchZoom.disable();
		map.doubleClickZoom.disable();
		map.scrollWheelZoom.disable();
		map.keyboard.disable();

		updateMarker(lat, lon, false);

		// Update marker on map click
		if (allowTag) {
			map.on('click', function (e) {
				updateMarker(e.latlng.lat, e.latlng.lng, true);
				value = { lat: e.latlng.lat, lon: e.latlng.lng };
			});
		}
	});

	// Function to update or create marker
	function updateMarker(lat, lon, setMarker) {
		const position = new L.LatLng(lat, lon);
		if (setMarker) {
			if (marker) {
				marker.setLatLng(position);
			} else {
				const redIcon = L.icon({
					iconUrl: `data:image/svg+xml;base64,${btoa(Location)}`,
					iconSize: [50, 50],
					iconAnchor: [12.5, 12.5]
				});
				marker = L.marker(position, { icon: redIcon }).addTo(map);
			}
		}
	}
	// Reactive statement to handle external changes to `value`
	run(() => {
		if (value && map) {
			map.setView(new L.LatLng(value.lat, value.lon));
			updateMarker(value.lat, value.lon, true);
		}
	});
</script>

<div class="map-wrapper">
	<Label {label} {errors} {labelThumbnail} />
	<div id="map" class="map"></div>
</div>

<style type="text/postcss">
	.map {
		@apply h-[200px] md:h-[300px];
	}

	.map-wrapper {
		@apply w-full relative z-0;
	}
</style>
