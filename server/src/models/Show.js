const Model = require("./Model.js")

class Show extends Model {
  static get tableName() {
    return "shows"
  }

  static get relationMappings() {
    const Review = require("./Review.js")

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "shows.id",
          to: "reviews.showId"
        }
      }
    }
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
  static get relationMappings() {
    const { Review } = require("./index.js")

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "shows.id",
          to: "reviews.showId"
        }
      }
    }
  }
}

module.exports = Show