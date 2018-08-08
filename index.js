const argv = require("minimist")(process.argv.slice(2));
const request = require("request");
const glob = require("glob");

module.exports = function() {
  const _ = argv._;
  const job = argv.job;
  const build = argv.build;
  const file = argv.file;
  const commit = argv.commit;
  const branch = argv.branch;
  const cmd = _[0];
  const fileGlob = _[1];
  let req;
  let form;

  if (cmd === "upload") {
    req = request.post(
      `/api/build/${build}/upload?token=${process.env.OVERSEER_TOKEN}`
    );
    form = req.form();
    glob(fileGlob, {}, function(err, files) {
      if (err) {
        console.error(err);
        return;
      }

      files.forEach(function(file) {
        form.append("file", fs.createReadStream(file), {
          filename: file
        });
      });
    });
  }

  if (cmd === "finish") {
    req = request.post(
      `/api/build/${build}/upload-finish?token=${process.env.OVERSEER_TOKEN}`
    );
    form = req.form();
  }

  form.append("commit", commit);
  form.append("branch", branch);
  form.append("job", job);
};
