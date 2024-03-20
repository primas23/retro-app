module.exports = {
    port: process.env.PORT || 4321,
    host: (port) => process.env.WEBSITE_HOSTNAME || `localhost:${port}`,
    websiteUrl: (port) =>
        process.env.WEBSITE_HOSTNAME !== undefined
            ? `https://${process.env.WEBSITE_HOSTNAME}`
            : `http://localhost:${port}`

}