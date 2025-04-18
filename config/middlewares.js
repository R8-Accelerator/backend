module.exports = [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000','http://localhost:1337', 'http://127.0.0.1:1337', 'http://20.203.106.128:1337', 'http://20.203.106.128:3000', 'https://dashboard.r8accelerator.com','https://admin.r8accelerator.com','https://admin.r8accelerator.com/admin/','https://api.r8accelerator.com'],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  "global::custom-middleware",
];