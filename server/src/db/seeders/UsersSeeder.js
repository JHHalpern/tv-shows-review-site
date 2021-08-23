import { User } from "../../models/index.js"
import dotenv from "dotenv"
dotenv.config()

class UsersSeeder {
  static async seed() {
    const userData = [
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
        email: "imabot@yoohoo.com",
        password: "milk",
        admin: false
      },
      {
          email: "admin@test.com",
          password: "testing123",
          admin: true
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
