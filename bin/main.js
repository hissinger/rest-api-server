const app = require('../app/app');
const dbSync = require('./db-sync');

app.listen(3000, async () => {
  console.log('Example app listening on port 3000!');
  await dbSync();
  console.log('Database sync');
});