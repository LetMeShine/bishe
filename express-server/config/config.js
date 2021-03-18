const config = {
    port: process.env.PORT || 3300,
    database: {
        database: 'loan',
        user: 'root',
        password: '12345678',
        host: '127.0.0.1',
        port: '3306',
        dateStrings: true
    },

}
export default config