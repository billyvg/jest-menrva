import JsDomEnvironment from "jest-environment-jsdom";
import PuppeteerEnvironment from "jest-environment-puppeteer"; // const fs = require("fs");
// const os = require("os");
// const path = require("path");
// const JsDomEnvironment = require("jest-environment-jsdom");
// const PuppeteerEnvironment = require("jest-environment-puppeteer");
// const puppeteer = require('puppeteer');
// const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class MenrvaEnvironment extends JsDomEnvironment {
  async setup() {
    console.log("setup: puppeteer connected");
    await PuppeteerEnvironment.prototype.setup.call(this);
    this.global.page.setViewport({
      width: 1200,
      height: 600,
      deviceScaleFactor: 4
    });
  }

  async teardown() {
    console.log("Teardown Test Environment.");
    await PuppeteerEnvironment.prototype.teardown.call(this);
    await super.teardown();
  }

}

export default MenrvaEnvironment;