import { Request, Response } from "express";

import { BraspressScraperService } from "@root/services/braspress-scraper";

export class BraspressControllerImpl {
  private static instance?: BraspressControllerImpl;

  public static getInstance(
    p0: BraspressScraperService
  ): BraspressControllerImpl {
    if (this.instance) return this.instance;
    const newInstance = new BraspressControllerImpl(p0);
    this.instance = newInstance;
    return newInstance;
  }

  constructor(
    private readonly braspressScraperService: BraspressScraperService
  ) {}

  public async index(request: Request, response: Response): Promise<Response> {
    const { hash, identifier } = request.headers;

    try {
      const braspressOrder = await this.braspressScraperService.execute({
        hash: hash as string,
        identifier: identifier as string,
      });

      return response.json(braspressOrder);
    } catch (_) {
      return response.status(500).send();
    }
  }
}
