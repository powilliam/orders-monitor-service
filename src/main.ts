import "dotenv/config";
import { app } from "@root/app";

async function main() {
  try {
    app.listen(process.env.APP_PORT, () => {
      console.log(`> Listening on *:${process.env.APP_PORT}`);
    });
  } catch (_) {
    throw "Couldn`t initialize or maintain the app";
  }
}

main();
