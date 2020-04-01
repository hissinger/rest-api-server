const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_rest_api', 'root', '', {host: 'localhost', dialect:'mysql'});

const User = sequelize.define('user', {
  name: Sequelize.STRING
});

module.exports = {
  sequelize: sequelize,
  User: User
}