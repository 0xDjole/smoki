<script lang="ts">
	import Select from '../Select/index.svelte';
	export let t;

	export let settingsStore;

	let timeZone = $settingsStore?.appTimeZone || 'UTC';
	let timeZones = [
		{ label: 'UTC', value: 'UTC' },
		{ label: 'EST (Eastern Standard Time)', value: 'America/New_York' },
		{ label: 'CST (Central Standard Time)', value: 'America/Chicago' },
		{ label: 'MST (Mountain Standard Time)', value: 'America/Denver' },
		{ label: 'PST (Pacific Standard Time)', value: 'America/Los_Angeles' },
		{ label: 'AST (Alaska Standard Time)', value: 'America/Anchorage' },
		{ label: 'HST (Hawaii Standard Time)', value: 'Pacific/Honolulu' },
		{ label: 'GMT (Greenwich Mean Time)', value: 'Europe/London' },
		{ label: 'CET (Central European Time)', value: 'Europe/Berlin' },
		{ label: 'CEST (Central European Summer Time)', value: 'Europe/Belgrade' },
		{ label: 'EET (Eastern European Time)', value: 'Europe/Bucharest' },
		{ label: 'MSK (Moscow Time)', value: 'Europe/Moscow' },
		{ label: 'IST (India Standard Time)', value: 'Asia/Kolkata' },
		{ label: 'CST (China Standard Time)', value: 'Asia/Shanghai' },
		{ label: 'JST (Japan Standard Time)', value: 'Asia/Tokyo' },
		{ label: 'AEST (Australian Eastern Standard Time)', value: 'Australia/Sydney' },
		{ label: 'NZST (New Zealand Standard Time)', value: 'Pacific/Auckland' },
		{ label: 'BRT (Brasília Time)', value: 'America/Sao_Paulo' },
		{ label: 'ART (Argentina Time)', value: 'America/Argentina/Buenos_Aires' },
		{ label: 'SAST (South Africa Standard Time)', value: 'Africa/Johannesburg' },
		{ label: 'WAT (West Africa Time)', value: 'Africa/Lagos' },
		{ label: 'EAT (East Africa Time)', value: 'Africa/Nairobi' },
		{ label: 'SGT (Singapore Time)', value: 'Asia/Singapore' },
		{ label: 'KST (Korea Standard Time)', value: 'Asia/Seoul' },
		{ label: 'IRST (Iran Standard Time)', value: 'Asia/Tehran' },
		{ label: 'GST (Gulf Standard Time)', value: 'Asia/Dubai' },
		{ label: 'MVT (Maldives Time)', value: 'Indian/Maldives' },
		{ label: 'BST (Bangladesh Standard Time)', value: 'Asia/Dhaka' },
		{ label: 'VET (Venezuelan Standard Time)', value: 'America/Caracas' },
		{ label: 'CLT (Chile Standard Time)', value: 'America/Santiago' },
		{ label: 'PKT (Pakistan Standard Time)', value: 'Asia/Karachi' },
		{ label: 'UYT (Uruguay Standard Time)', value: 'America/Montevideo' },
		{ label: 'AZT (Azerbaijan Time)', value: 'Asia/Baku' },
		{ label: 'THA (Thailand Standard Time)', value: 'Asia/Bangkok' },
		{ label: 'WIB (Western Indonesian Time)', value: 'Asia/Jakarta' },
		{ label: 'ALMT (Alma-Ata Time)', value: 'Asia/Almaty' }
	];

	function handleTimezoneChange(selectedTimeZone) {
		if ($settingsStore) {
			$settingsStore.appTimeZone = selectedTimeZone;
		}
	}
</script>

<div class="time-zone-wrapper">
	<div class="time-zone">
		<div class="select-zone">
			<Select {t} onChange={handleTimezoneChange} options={timeZones} value={timeZone} />
		</div>
	</div>
</div>

<style type="text/postcss">
	.time-zone {
		@apply flex justify-center p-2 bg-primary;
	}

	.select-zone {
		@apply w-full md:w-[600px];
	}

	.time-zone-wrapper {
		@apply flex flex-col h-full;
	}
</style>
