import { Browser } from "puppeteer";

import { PuppeteerScraper } from "@abstractions/puppeteer-scraper";
import { BraspressOrder } from "@root/models/braspress-order";

interface ServiceOptions {
  hash: string;
  identifier: string;
}

export interface BraspressScraperService {
  execute(p0: ServiceOptions): Promise<BraspressOrder>;
}

export class BraspressScraperServiceImpl
  extends PuppeteerScraper
  implements BraspressScraperService {
  private static href: string =
    "https://www.braspress.com.br/site/w/tracking/search/:hash/:identifier";
  private static instance?: BraspressScraperService;

  public static getInstance(p0: Browser): BraspressScraperService {
    if (this.instance) return this.instance;
    const newInstance = new BraspressScraperServiceImpl(p0);
    this.instance = newInstance;
    return newInstance;
  }

  public async execute({
    hash,
    identifier,
  }: ServiceOptions): Promise<BraspressOrder> {
    const filledHref = BraspressScraperServiceImpl.href
      .replace(":hash", hash)
      .replace(":identifier", identifier);

    const page = await this.browser.newPage();
    await page.goto(filledHref);

    return await page.evaluate(() =>
      Array.from(document.querySelectorAll("td[align=center]"))
        .map((it) => it.innerText)
        .filter((it) => !["", "-"].includes(it))
        .reduce<string[]>((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, [])
        .reduce(
          (acumulated, current, index) => {
            if (index === 0) {
              acumulated["pedido"] = current;
            } else if (index === 1) {
              acumulated["nf"] = current;
            } else if (index === 2) {
              acumulated["entrega"] = current;
            } else if (index === 3) {
              acumulated["status"] = current;
            }
            return acumulated;
          },
          { pedido: "", nf: "", entrega: "", status: "" } as BraspressOrder
        )
    );
  }
}
