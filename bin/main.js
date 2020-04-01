const app = require('../app/app');
const dbSync = require('./db-sync');

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');

  dbSync()
    .then(() => {
      console.log('Database sync');
    });
});