module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      multipart: true,  // Ensure multipart is enabled for file uploads
      formData: {
        maxFileSize: 50 * 1024 * 1024, // Set max file size to 50MB
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:5173'],  // Replace with your frontend URL
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

