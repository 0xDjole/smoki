<script>
	import { onMount } from 'svelte';
	import Label from '../Label.svelte';
	let L;
	let map;
	let marker;

	export let value;
	export let label = '';
	export let labelThumbnail;
	export let errors = [];
	export let allowTag = true;
	export let zoom = 14;

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

		updateMarker(lat, lon, false);

		// Update marker on map click
		if (allowTag) {
			map.on('click', function (e) {
				console.log(e);
				updateMarker(e.latlng.lat, e.latlng.lng, true);
				value = { lat: e.latlng.lat, lon: e.latlng.lng };
			});
		}
	});

	// Reactive statement to handle external changes to `value`
	$: if (value && map) {
		map.setView(new L.LatLng(value.lat, value.lon));
		updateMarker(value.lat, value.lon, true);
	}

	// Function to update or create marker
	function updateMarker(lat, lon, setMarker) {
		const position = new L.LatLng(lat, lon);
		if (setMarker) {
			if (marker) {
				marker.setLatLng(position);
			} else {
				const redIcon = L.icon({
					iconUrl:
						'data:image/svg+xml;base64,' +
						btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-20 -20 40 40">
                    <circle r="10" cx="0" cy="0" fill="red" />
                    </svg>`),
					iconSize: [25, 25],
					iconAnchor: [12.5, 12.5]
				});
				marker = L.marker(position, { icon: redIcon }).addTo(map);
			}
		}
	}
</script>

<div class="map-wrapper">
	<Label {label} {errors} {labelThumbnail} />
	<div id="map" style="height: 400px;" />
</div>

<style type="text/postcss">
	.map-wrapper {
		@apply w-full relative;
	}
</style>
