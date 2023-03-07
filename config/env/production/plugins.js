module.exports = ({ env }) => ({
    // ...
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.example.com'),
                port: env('SMTP_PORT', 587),
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
                secure: true
                // ... any custom nodemailer options
            },
            settings: {
                defaultFrom: 'php.del.by@gmail.com',
                defaultReplyTo: 'php.del.by@gmail.com',
            },
        },
    },
    upload: {
        config: {
            provider: "strapi-provider-upload-supabase-v4",
            providerOptions: {
                apiUrl: env("SUPABASE_API_URL"),
                apiKey: env("SUPABASE_API_KEY"),
                bucket: env("SUPABASE_BUCKET"),
                directory: env("SUPABASE_DIRECTORY"),
                options: {},
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
});