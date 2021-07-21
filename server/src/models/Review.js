const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["reviewBody", "score", "showId"],
      properties: {
        reviewBody: { type: "string", minLength: 10 },
        score: { type: "integer" }
      }
    }
  }
  
  static get relationMappings() {
    const { Show } = require("./index.js")

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
}

module.exports = Review