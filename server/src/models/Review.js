const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["body", "score", "showId", "userId"],
      properties: {
        reviewBody: { type: "string", minLength: 10 },
        score: { type: "integer", minimum: 1, maximum: 5 },
        showId: { type: "integer" },
        userId: { type: "integer" }
      }
    }
  }
  
  static get relationMappings() {
    const { Show, Vote, User } = require("./index.js")

    return {
      show: {
        relation: Model.BelongsToOneRelation,
        modelClass: Show,
        join: {
          from: "reviews.showId",
          to: "shows.id"
        }
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "reviews.id",
          to: "votes.reviewId"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
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