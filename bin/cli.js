#! /usr/bin/env node
const argv = require("minimist")(process.argv.slice(2));
const glob = require("glob");
const client = require("../src/client");

const _ = argv._;
const cmd = _[0];
const fileGlob = _[1];
let req;
let form;

const job = argv.job || process.env.TRAVIS_JOB_ID;
const build = argv.build || process.env.TRAVIS_BUILD_ID;
const commit = argv.commit || process.env.TRAVIS_COMMIT;
const branch = argv.branch || process.env.TRAVIS_BRANCH;
const repo = argv.repo || process.env.TRAVIS_REPO_SLUG;
const token = argv.token || process.env.MENRVA_TOKEN;
const url = argv.url || process.env.MENRVA_URL || "https://menrva.ngrok.io";

if (cmd === "upload") {
  glob(fileGlob, {}, function(err, files) {
    if (err) {
      console.error(err);
      return;
    }

    client.upload({
      url,
      token,
      repo,
      job,
      build,
      commit,
      branch,
      files
    });
  });
}

if (cmd === "finish") {
  client.finish({
    url,
    token,
    repo,
    job,
    build,
    commit,
    branch
  });
}
