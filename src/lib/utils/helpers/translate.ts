export default (labels, lang, fallback) => {
	let parsedLang = 'en';

	if (lang === 'sr-Latn-BA') {
		parsedLang = 'bih';
	}

	if (!labels) {
		return fallback;
	}

	const label = labels[parsedLang];
	if (!label) {
		return fallback;
	}

	return label;
};
