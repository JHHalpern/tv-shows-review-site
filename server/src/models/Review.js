const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get relationMappings() {
    const Show = require("./Show.js")

    return {
      show: {
        relation: Model.BelongsToOneRelation,
        modelClass: Show,
        join: {
          from: "reviews.showId",
          to: "shows.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["body"],
      properties: {
        body: { type: "string", minLength: 1, maxLength: 10000 }
      }
    }
  }
}

module.exports = Review