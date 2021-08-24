import { User } from "../../models/index.js"
import dotenv from "dotenv"
dotenv.config()

class UsersSeeder {
  static async seed() {
    const userData = [
      {
        email: "ilikemovies@gmail.com",
        password: ILIKEMOVIES_PASSWORD,
        admin: false
      },
      {
        email: "supergoodemail@gmail.com",
        password: SUPERGOODEMAIL_PASSWORD,
        admin: false
      },
      {
        email: "imabot@yoohoo.com",
        password: IMABOT_PASSWORD,
        admin: false
      },
      {
          email: "admin@test.com",
          password: ADMIN_PASSWORD,
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
