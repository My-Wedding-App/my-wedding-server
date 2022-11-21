
const username = encodeURIComponent("my-wedding-db");
const password = encodeURIComponent("@wFJiL7d9@6q@MH");
const cluster = "cluster0.ve3msrf.mongodb.net";
const database = "my-wedding-db"

const dbUrl = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

module.exports = {
  dbUrl
}