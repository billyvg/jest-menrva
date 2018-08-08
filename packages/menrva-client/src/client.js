const fs = require("fs");

const request = require("request");

function finish({ job, build, commit, branch, repo, token, url }) {
  let req = request.post(`${url}/build/${build}/upload-finish?token=${token}`);
  let form = req.form();

  form.append("commit", commit);
  form.append("branch", branch);
  form.append("job", job);
  form.append("repo", repo);
}

function upload(args) {
  const { job, build, commit, branch, repo, token, url, files } = args;
  let req = request
    .post(`${url}/build/${build}/upload?token=${token}`, {}, function(
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
      // console.error(err);
    });
  let form = req.form();
  files.forEach(function(file) {
    form.append("file", fs.createReadStream(file), {
      filename: file
    });
  });
  form.append("commit", commit);
  form.append("branch", branch);
  form.append("job", job);
  form.append("repo", repo);
}

module.exports = {
  upload: upload,
  finish: finish
};
