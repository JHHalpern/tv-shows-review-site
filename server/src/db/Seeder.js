import { connection } from "../boot.js"

import ShowsSeeder from "./seeders/ShowsSeeder.js"


class Seeder {
  static async seed() {
    console.log("seeding shows....underway")
    await ShowsSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder