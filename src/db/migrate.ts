import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from ".";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("migration successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main(); 