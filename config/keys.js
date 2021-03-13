const username=require('./appConfig').username;
const password=require('./appConfig').password;
const database=require('./appConfig').database;

module.exports={
    mongoDbUri:`mongodb+srv://${username}:${password}@cluster0.ocd2i.mongodb.net/${database}?retryWrites=true&w=majority
    `,
    //googleClientID:'763868416761-lg1vquu4a5tfcmknhva8rum28cetjlcj.apps.googleusercontent.com',
    //googleClientSecret:'ev9c0AtV-468n49YhmQyCfsH',
    googleClientID:'@@@',
    googleClientSecret:'@@@',
}