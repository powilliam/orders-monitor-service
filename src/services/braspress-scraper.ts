import { Browser } from "puppeteer";

import { BraspressScraperHelper } from "@abstractions/braspress-scraper-helper";
import { BraspressOrder } from "@root/models/braspress-order";

interface ServiceOptions {
  hash: string;
  identifier: string;
}

export interface BraspressScraperService {
  execute(p0: ServiceOptions): Promise<BraspressOrder>;
}

export class BraspressScraperServiceImpl
  extends BraspressScraperHelper
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

    return await this.doScraping(filledHref);
  }
}
