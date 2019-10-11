export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.NODE_PORT || 3000,
    isDev() {
        const env = this.get('app.env');
        return env === 'development';
    }
};