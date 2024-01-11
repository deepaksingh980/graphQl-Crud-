const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const app = express();

app.set('port', (process.env.PORT || 7005));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// var ObjectId = new ObjectID();

// graph ql
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const graphQlSchema = require('./graphQl/Schema/index');  // Path for Schema
const graphQlResolvers = require('./graphQl/Resolver/index');


//GraphQl Configuration
app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema, // GraphQl Schema
    rootValue: graphQlResolvers, // GraphQl Resolvers
    graphiql: true // Enables the GraphiQL UI tool, accessible at /graphql
}));
// ROUTES

// ROUTES

//Database
var dbb = require('./config/collection');
var prod = true;
if (prod) {
    var prod_url = require('./config/connection');
    url = prod_url;
}
//Database

//Configuring Routes


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function (req, res) {
    res.send("WELCOME To My Project App");
});