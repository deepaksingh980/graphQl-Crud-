const { gql } = require('apollo-server');

const typeDefs = gql`
  type Category {
    _id: ID!,
    name: String!,
    createdAt: String!,
    updatedAt: String!,
  }

  type DeleteCategory {
    _id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    deleted: Boolean!
  }

  input CategoryInput {
    name: String!,
   
  }

  input UpdateCategoryInput {
    categoryId: ID!
    updatedCategory: CategoryInput!
  }

  type RootQuery {
    categorys(): [Category!]!,
    categoryById(categoryId: ID!): Category,
  }

  type RootMutation {
    createCategory(categoryInput: CategoryInput): Category
    deleteCategory(categoryId: ID!): DeleteCategory
    updateCategory(category: UpdateCategoryInput!): Category
  }
`;

module.exports = [typeDefs];
