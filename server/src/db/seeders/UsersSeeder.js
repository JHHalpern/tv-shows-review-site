import { User } from "../../models/index.js"
import dotenv from "dotenv"
dotenv.config()

class UsersSeeder {
  static async seed() {
    const userData = [
      {
        email: "thisshowsux@gmail.com",
        password: process.env.PASSWORD_thisshowsux,
        admin: true
      },
      {
        email: "ilikemovies@gmail.com",
        password: process.env.PASSWORD_ilikemovies,
        admin: false
      },
      {
        email: "supergoodemail@gmail.com",
        password: process.env.PASSWORD_supergoodemail,
        admin: false
      },
      {
        email: "nicksSECRETemail@gmail.com",
        password: process.env.PASSWORD_nicksSECRETemail,
        admin: false
      },
    ]

    for(const singleUser of userData) {
      const currentUser = await User.query().findOne({ email: singleUser.email })
      if(!currentUser) {
        await User.query().insert(singleUser)
      }
    }
  }
}

export default UsersSeeder