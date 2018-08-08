const client = require("./client");

const job = process.env.TRAVIS_JOB_ID;
const build = process.env.TRAVIS_BUILD_ID;
const commit = process.env.TRAVIS_COMMIT;
const branch = process.env.TRAVIS_BRANCH;
const repo = process.env.TRAVIS_REPO_SLUG;
const token = process.env.MENRVA_TOKEN;
const url = process.env.MENRVA_URL || "https://menrva.ngrok.io";

module.exports = {
  upload: args =>
    client.upload({
      url,
      token,
      repo,
      job,
      build,
      commit,
      branch,
      ...args
    }),
  finish: args =>
    client.finish({
      url,
      token,
      repo,
      job,
      build,
      commit,
      branch,
      ...args
    })
};
