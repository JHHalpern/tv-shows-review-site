import { Show } from "../../models/index.js"

class ShowsSeeder {
  static async seed() {
    const showsData = [
      {
        name: "Supernatural",
        description: "Two brothers hunting demons, angels, and everything in between"
      },
      {
        name: "Friends",
        description: "Six friends will be there for you"
      },
      {
        name: "Game of Thrones",
        description: "Everyone has sex or gets killed by a dragon"
      }
    ]

    for (const singleShowData of showsData) {
      const currentShow = await Show.query().findOne(singleShowData)
      if (!currentShow) {
        await Show.query().insert(singleShowData)
      }
    }
  }
}

export default ShowsSeeder