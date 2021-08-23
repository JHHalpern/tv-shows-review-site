import { Show } from "../../models/index.js"

class ShowsSeeder {
  static async seed() {
    const showsData = [
      {
        name: "Supernatural",
        description: "Two brothers hunting demons, angels, and everything in between"
      },
      {
        name: "Jeopardy",
        description: "Answer an answer with a question for prize money"
      },
      {
        name: "Friends",
        description: "Six friends will be there for you"
      },
      {
        name: "Game of Thrones",
        description: "Everyone has s*x or gets killed by a dragon"
      },
      {
        name: "Hells Kitchen",
        description: "Gordon Ramsy hosts the ultimate cooking competition"
      },
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
