exports.seed = function (knex, Promise) {
  return knex("users").insert([
    { username: 'morganjones', password:'$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq' },
    { username: 'jessicaprosper', password:'$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq' },
    { username: 'elmo', password:'$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq' }
  ]);
};
