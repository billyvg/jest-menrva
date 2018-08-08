const client = require("./client");

const {
  TRAVIS_JOB_ID,
  TRAVIS_BUILD_ID,
  TRAVIS_COMMIT,
  TRAVIS_BRANCH,
  TRAVIS_REPO_SLUG,
  TRAVIS_PULL_REQUEST,
  TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_PULL_REQUEST_SHA,
  TRAVIS_PULL_REQUEST_SLUG,
  MENRVA_TOKEN,
  MENRVA_URL
} = process.env;

const defaults = {
  url: MENRVA_URL || "https://menrva.ngrok.io",
  token: MENRVA_TOKEN,
  repo: TRAVIS_REPO_SLUG,
  job: TRAVIS_JOB_ID,
  build: TRAVIS_BUILD_ID,
  commit: TRAVIS_COMMIT,
  branch: TRAVIS_BRANCH,
  pr: TRAVIS_PULL_REQUEST,
  pr_branch: TRAVIS_PULL_REQUEST_BRANCH,
  pr_sha: TRAVIS_PULL_REQUEST_SHA,
  pr_slug: TRAVIS_PULL_REQUEST_SLUG
};

module.exports = {
  upload: args =>
    client.upload({
      ...defaults,
      ...args
    }),
  finish: args =>
    client.finish({
      ...defaults,
      ...args
    })
};
