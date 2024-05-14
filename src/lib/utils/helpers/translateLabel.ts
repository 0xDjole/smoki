export default (labels, lang, fallback) => {
	let parsedLang = 'en';

	if (lang === 'sr-Latn-BA') {
		parsedLang = 'bih';
	}

	const label = labels[parsedLang];
	if (!label) {
		return fallback;
	}

	return label;
};
