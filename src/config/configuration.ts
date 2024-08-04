export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || 'balloon',
    password: process.env.POSTGRES_PASSWORD || '9Qpk2km4EC',
    name: process.env.POSTGRES_DB || 'balloon_db',
  },
});
