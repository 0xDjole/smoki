export default (labels, lang) => {
	let parsedLang = 'en';

	if (lang === 'sr-Latn-BA') {
		parsedLang = 'bih';
	}

	const label = labels[parsedLang];
	if (!label) {
		return label['en'];
	}

	return label;
};
