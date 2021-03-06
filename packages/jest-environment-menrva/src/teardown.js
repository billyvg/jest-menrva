import path from "path";

import puppeteer from "puppeteer";
import menrva from "menrva-client";

const DEFAULT_CONFIG_CI = {
  launch: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  },
  exitOnPageError: true
};

let browser = puppeteer.launch(process.env.CI ? DEFAULT_CONFIG_CI.launch : {});
let queue = [];

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
