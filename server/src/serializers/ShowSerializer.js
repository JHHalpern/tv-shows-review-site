class ShowSerializer {
  static async getSummary(show) {
    const allowedAttributes = ["name", "description", "id"]

    let serializedShow = {}
    allowedAttributes.forEach(attribute => {
      serializedShow[attribute] = show[attribute]
    })

    serializedShow.reviews = await show.$relatedQuery("reviews")
    return serializedShow
  }
}

export default ShowSerializer