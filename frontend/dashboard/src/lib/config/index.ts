export default {
	backendAddress: import.meta.env.VITE_BACKEND_URL ?? '',
	backendDevAddress: import.meta.env.VITE_BACKEND_DEV_URL ?? '',
	backendApiToken: import.meta.env.VITE_BACKEND_API_TOKEN ?? ''
};
