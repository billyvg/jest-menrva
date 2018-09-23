import path from "path";

import puppeteer from "puppeteer";
import menrva from "menrva-client";
import readConfig from "jest-environment-puppeteer/lib/readConfig";

let browser;
let queue = [];

(async () => {
  const config = await readConfig();
  browser = puppeteer.launch(config.launch);
})();

const createSnapshot = async ({ html, fileName, testName }) => {
  const page = await (await browser).newPage();
  const dir = path.resolve(process.cwd(), ".artifacts");
  await page.setContent(html);
  const imagePath = path.resolve(dir, `${fileName}.png`);
  await page.screenshot({
    path: imagePath,
    fullPage: true
  });
  await menrva.upload({
    filePath: imagePath,
    fileName,
    testName
  });
};

export const addSnapshot = (...args) => {
  console.log("add snapshot", queue.length);
  const promise = createSnapshot(...args);
  queue.push(promise);
  return promise;
};

export default async function menrvaGlobalTeardown() {
  console.log("teardown");
  try {
    await Promise.all(queue);
  } catch (err) {
    console.error(err);
  }

  await (await browser).close();
}
