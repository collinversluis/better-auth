// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      domain: `${process.env.CONVEX_SITE_URL}`,
      applicationID: "convex",
    },
    {
      domain: "https://localhost:3000",
      applicationID: "local",
    }
  ],
  trustedOrigins: [
    "https://localhost:3000",
    "https://your-production-domain.com"
  ],
};
