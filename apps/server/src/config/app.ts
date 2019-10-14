export default {
    env: process.env.NODE_ENV,
    port: process.env.NODE_PORT,
    isDev() {
        const env = this.get('app.env');
        return env === 'development';
    }
};
