const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["body", "score", "showId"],
      properties: {
        reviewBody: { type: "string", minLength: 10 },
        score: { type: "integer", minimum: 1, maximum: 5 }
      }
    }
  }
  
  static get relationMappings() {
    const { Show, User } = require("./index.js")

    return {
      show: {
        relation: Model.BelongsToOneRelation,
        modelClass: Show,
        join: {
          from: "reviews.showId",
          to: "shows.id"
        }
      },
      user: {
        relation: Model.BelongToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Review