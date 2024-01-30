import axios from 'axios';
import { AUTH_SERVER_DOMAIN } from '$lib/utils/env';
import { DateTime } from 'luxon';
import { navigation } from 'super-navigation';
import { authentication } from '$lib/stores/auth';

import { get } from 'svelte/store';

const axiosClient = axios.create({
	baseURL: AUTH_SERVER_DOMAIN
});

const freeEndpoints = ['/login/url', '/login', '/reservations/confirm', '/register'];

axiosClient.interceptors.request.use(
	async (config) => {
		axios.defaults.headers.common['Accept'] = 'application/json';
		axios.defaults.headers.common['Content-Type'] = 'application/json';

		const isFree = freeEndpoints.some((endpoint) => config.url.includes(endpoint));

		if (isFree) {
			return config;
		}

		const { refreshToken, accessToken, expiresAt } = get(authentication);

		const expiresDateTime = DateTime.fromISO(expiresAt).toMillis();
		const dateNow = DateTime.now().toMillis();

		if (expiresDateTime > dateNow) {
			config.headers['Authorization'] = 'Bearer ' + accessToken;
			return config;
		}

		if (!refreshToken || refreshToken === 'undefined') {
			authentication.logout();

			const { navigating } = get(navigation);

			if (!navigating) {
				navigation.navigate('/login');
			}

			return Promise.reject('Error');
		}

		const { data } = await axios.post(`${AUTH_SERVER_DOMAIN}/refresh-access-token`, {
			provider: 'GOOGLE',
			refresh_token: refreshToken
		});

		const userToken = {
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			openIdToken: data.openid_token,
			expiresAt: data.expires_at,
			provider: data.provider
		};

		authentication.setUserToken(userToken);

		config.headers['Authorization'] = 'Bearer ' + userToken.accessToken;

		return config;
	},
	async (error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
