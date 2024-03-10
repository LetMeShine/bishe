const config = {
    port: process.env.PORT || 3300,
    database: {
        database: 'myloan',
        user: 'root',
        password: 'root',
        host: '127.0.0.1',
        port: '3306',
        dateStrings: true
    },

}
export default config