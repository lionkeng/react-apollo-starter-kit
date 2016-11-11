import { schema as countSchema, resolvers as countResolvers } from './count'
import { schema as photoSchema, resolvers as photoResolvers } from './photo'
import Data from './data'
import { makeExecutableSchema } from 'graphql-tools'

const rootSchema = `
  type RootQuery {
    count: Count
    photo: Photo
  }

  type RootMutation {
    addCount(amount: Int!): Count
    induceError: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

const rootResolvers = {
  RootQuery: {
    count: () => Data.count,
    photo: () => Data.photo
  },
  RootMutation: {
    addCount(_, { amount }) {
      Data.count += amount
      return Data.count
    },
    induceError() {
      throw new Error('Custom error message')
    }
  }
}

const schema = [
  rootSchema,
  countSchema,
  photoSchema
]

const resolvers = {
  ...rootResolvers,
  ...countResolvers,
  ...photoResolvers
}

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})

export default executableSchema
