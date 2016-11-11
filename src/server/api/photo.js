export const schema = `
  type Photo {
    id: String
    name: String
    location: String
    fname: String
  }
`

export const resolvers = {
  Photo: {
    id: () => "PhotoID"
  }
}