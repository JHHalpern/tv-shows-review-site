const Model = require("./Model.js")

class Show extends Model {
  static get tableName() {
    return "shows"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string", minLength: 10 }
      }
    }
  }
}

module.exports = Show