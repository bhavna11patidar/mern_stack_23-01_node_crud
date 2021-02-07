const username=require('./appConfig').username;
const password=require('./appConfig').password;
const database=require('./appConfig').database;

module.exports={
    mongoDbUri:`mongodb+srv://${username}:${password}@cluster0.ocd2i.mongodb.net/${database}?retryWrites=true&w=majority
    `
}