import { User } from "../../models/index.js"

class UsersSeeder {
  static async seed() {
    const userData = [
      {
        email: "thisshowsux@gmail.com",
        cryptedPassword: "thisshowsux",
        admin: true
      },
      {
        email: "ilikemovies@gmail.com",
        cryptedPassword: "password",
        admin: false
      },
      {
        email: "supergoodemail@gmail.com",
        cryptedPassword: "12345",
        admin: false
      },
      {
        email: "nicksSECRETemail@gmail.com",
        cryptedPassword: "nickisthebest",
        admin: false
      }
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