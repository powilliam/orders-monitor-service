import { BraspressOrder } from "@root/models/braspress-order";
import { PuppeteerScraper } from "@abstractions/puppeteer-scraper";

export abstract class BraspressScraperHelper extends PuppeteerScraper {
  public async doScraping(href: string): Promise<BraspressOrder> {
    const page = await this.goto(href);

    const listOfData = await page.evaluate(() =>
      Array.from(document.querySelectorAll("td[align=center]"))
        .map((it) => it.innerText)
        .filter((it) => !["", "-"].includes(it))
        .reduce((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, [])
    );

    return BraspressOrder.fromList(listOfData);
  }
}
