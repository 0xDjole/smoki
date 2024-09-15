export default (gallery, size) => {
	let thumbnailMedia = gallery.find((media) => media.settings.isThumbnail);

	if (!thumbnailMedia && gallery.length) {
		thumbnailMedia = gallery[0];
	}

	let url = null;

	const foundRes = thumbnailMedia.resolutions[size || 'original'];

	if (foundRes) {
		url = foundRes.url;
	}

	return url;
};
