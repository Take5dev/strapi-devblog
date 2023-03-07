module.exports = ({ env }) => ({
    url: env("PUBLIC_ADMIN_URL", "/dashboard"),
    serveAdminPanel: env("PUBLIC_ADMIN_URL") == undefined
});
