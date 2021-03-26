import "dotenv/config";
import puppeteer from "puppeteer";

import { app } from "@root/app";
import { BraspressScraperServiceImpl } from "@root/services/braspress-scraper";
import { BraspressControllerImpl } from "@controllers/braspress";

async function main() {
  try {
    const browser = await puppeteer.launch();

    app.get("/braspress", async (req, res) => {
      const braspressScraperService = BraspressScraperServiceImpl.getInstance(
        browser
      );
      const braspressController = BraspressControllerImpl.getInstance(
        braspressScraperService
      );

      return await braspressController.index(req, res);
    });

    app.listen(process.env.APP_PORT, () => {
      console.log(`> Listening on *:${process.env.APP_PORT}`);
    });
  } catch (_) {
    throw "Couldn`t initialize or maintain the app";
  }
}

main();
