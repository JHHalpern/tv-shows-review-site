import { User } from "../../models/index.js"
import dotenv from "dotenv"
dotenv.config()
// const dotenv = require('dotenv').config()

class UsersSeeder {
  static async seed() {
    const userData = [
      {
        email: "thisshowsux@gmail.com",
        password: "thisshowsux",
        admin: true
      },
      {
        email: "ilikemovies@gmail.com",
        password: "password",
        admin: false
      },
      {
        email: "supergoodemail@gmail.com",
        password: "12345",
        admin: false
      },
      {
        email: "nicksSECRETemail@gmail.com",
        password: "nickisthebest",
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