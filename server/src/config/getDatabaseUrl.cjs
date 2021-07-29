const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:asdf1235@localhost:5432/tv-shows-review-site_development",
      test: "postgres://postgres:asdf1235@localhost:5432/tv-shows-review-site_test",
      e2e: "postgres://postgres:asdf1235@localhost:5432/tv-shows-review-site_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
