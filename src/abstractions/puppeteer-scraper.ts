import { Browser } from "puppeteer";

export abstract class PuppeteerScraper {
  protected browser!: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }
}
