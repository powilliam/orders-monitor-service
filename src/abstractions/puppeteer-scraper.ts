import { Browser, Page } from "puppeteer";
export abstract class PuppeteerScraper {
  private browser!: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  public async goto(url: string): Promise<Page> {
    const page = await this.browser.newPage();
    await page.goto(url);
    return page;
  }
}
