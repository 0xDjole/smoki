export default (mimeType: string): string | null => {
	const mimeTypeToExt: { [key: string]: string } = {
		'image/png': 'png',
		'image/jpeg': 'jpeg',
		'image/gif': 'gif',
		'image/bmp': 'bmp',
		'image/svg+xml': 'svg',
		'image/tiff': 'tiff'
	};

	return mimeTypeToExt[mimeType] || null;
};
