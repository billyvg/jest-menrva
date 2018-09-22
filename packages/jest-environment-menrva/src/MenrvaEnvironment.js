import JsDomEnvironment from "jest-environment-jsdom";
import slugify from "@sindresorhus/slugify";

import { addSnapshot } from "../lib/teardown";

class MenrvaEnvironment extends JsDomEnvironment {
  constructor(...args) {
    super(...args);
    this.promises = [];
  }

  async setup() {
    await super.setup();
    this.global.addSnapshot = ({ html, name }) => {
      let pass = true;

      try {
        const cloned = this.dom.window.document.documentElement.cloneNode(true);
        const body = cloned.getElementsByTagName("body").item(0);
        // const css = fs
        // .readFileSync(
        // path.resolve(__dirname, '../../src/sentry/static/sentry/dist/sentry.css'),
        // 'utf8'
        // )
        // .replace(/[\r\n]+/g, '');
        // page.addStyleTag({
        // content: css,
        // });
        body.innerHTML = html;
        const slug = slugify(name);
        addSnapshot({
          testName: name,
          html: cloned.outerHTML,
          fileName: slug
        });
      } catch (err) {
        console.error(err);
        pass = false;
        throw err;
      }
      return {
        message: () => "expected to save snapshot",
        pass
      };
    };
  }

  async teardown() {
    await Promise.all([super.teardown(), Promise.all(this.promises)]);
  }
}

export default MenrvaEnvironment;
