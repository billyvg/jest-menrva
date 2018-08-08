const fs = require("fs");

const request = require("request");

function finish({ job, build, commit, branch, repo, token, url }) {
  let req = request.post(`${url}/build/upload-finish?token=${token}`);
  let form = req.form();

  form.append("commit", commit);
  form.append("branch", branch);
  form.append("build", build);
  form.append("job", job);
  form.append("repo", repo);
}

function upload(args) {
  const { token, filePath, url, ...rest } = args;
  let req = request
    .post(`${url}/build/upload?token=${token}`, {}, function(
      err,
      httpResponse,
      body
    ) {
      if (err) {
        console.error(err);
        return;
      }

      console.log("finished upload", body);
      finish(args);
    })
    .on("error", function(err) {
      console.error(err);
    });

  let form = req.form();

  form.append("file", fs.createReadStream(filePath), {
    filename: filePath
  });

  Object.keys(rest).forEach(key => form.append(key, rest[key]));
}

module.exports = {
  upload: upload,
  finish: finish
};
