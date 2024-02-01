import getExtensionFromMimeType from './getExtensionFromMimeType';

export default async (link: string) => {
	const response = await fetch(link, { method: 'GET', headers: { 'Cache-Control': 'no-cache' } });
	const blob = await response.blob();

	// Determine the file extension based on the MIME type
	const extension = getExtensionFromMimeType(blob.type) || 'bin'; // Default to 'bin' if MIME type is unknown
	const filename = `image.${extension}`;

	const file = new File([blob], filename, { type: blob.type });
	return file;
};
