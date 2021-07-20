class ShowSerializer {
  static getSummary(show) {
    const allowedAttributes = ["name", "description", "id"]

    let serializedShow = {}
    allowedAttributes.forEach(attribute => {
      serializedShow[attribute] = show[attribute]
    })

    return serializedShow
  }
}

export default ShowSerializer