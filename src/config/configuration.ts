export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 4000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'student',
    password: process.env.DB_PASSWORD || 'student',
    name: process.env.DB_NAME, // Название базы данных
    synchronize: process.env.SYNCHRONIZE,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    tokenTimeLimit: process.env.TOKEN_TIME_LIMIT,
  },
});
