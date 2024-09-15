export default (gallery) => {
	if (!gallery) {
		return null;
	}

	let thumbnailMedia = gallery.find((media) => media.settings.isThumbnail);

	if (!thumbnailMedia && gallery.length) {
		thumbnailMedia = gallery[0];
	}

	let url = null;

	const foundRes =
		thumbnailMedia.resolutions['thumbnail'] || thumbnailMedia.resolutions['original'];

	if (foundRes) {
		url = foundRes.url;
	}

	return url;
};
