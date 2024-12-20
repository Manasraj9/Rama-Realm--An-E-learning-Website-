module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  settings: {
    cors: {
      enabled: true,
    },
    body: {
      multipart: {
        maxFileSize: 100000000,  // 100MB limit (adjust as needed)
        maxFields: 1000,         // Max number of fields (adjust as needed)
      },
    },
  },
});
