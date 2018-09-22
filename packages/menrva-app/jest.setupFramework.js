/* global expect */
// eslint-disable-next-line
import path from "path";

expect.extend({
  toSnapshot(received) {
    return global.addSnapshot({
      html: received.html(),
      name: this.currentTestName,
    });
  },
  toMatchSnapshot(received) {
    return global.addSnapshot({
      html: received.html(),
      name: this.currentTestName,
    });
  },
});
