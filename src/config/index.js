const env = process.env.NODE_ENV;
const devUrl = process.env.DEV_API_URL;
const prodUrl = process.env.PROD_API_URL;

export default {
	baseUrl: env === 'development' ? devUrl : prodUrl,
};
