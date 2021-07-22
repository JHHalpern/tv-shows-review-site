import { connection } from "../boot.js"
import ShowsSeeder from "./seeders/ShowsSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"
import ReviewsSeeder from "./seeders/ReviewsSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding shows....underway")
    await ShowsSeeder.seed()

    console.log("Seeding reviews... go!")
    await ReviewsSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder