import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
interface Media {
  id: ID!
  title: String!
  media_type: String!
}

type Movie implements Media {
  id: ID!
  title: String!
  media_type: String!
  duration: Int!
  box_office: Int!
  original_title: String
  original_language: String
  poster_path: String
  imdb_id: String
  vote: Int!
}

  type Person {
    id: ID!
    name: String
    popularity: Float
    known_for: [Media]
    imdb_id: String
  }


  type Query {
    movies: [Movie]
    movie(id: ID, imdb_id: String): Movie
    persons: [Person]
    person(id: ID, imdb_id: String): Person
  }

  type Mutation {
    upvoteMovie (
      movieId: Int!
    ): Movie
  }

`;

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, { id }) => find(movies, { id: id }),
  },
  Mutation: {
    upvoteMovie: (_, { movieId }) => {
      const movie = find(movies, { id: movieId });
      if (!movie) {
        throw new Error(`Couldn't find post with id ${movieId}`);
      }
      movie.votes += 1;
      return movie;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


export default schema
