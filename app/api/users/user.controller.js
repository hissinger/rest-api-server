const models = require('../../models/models');

module.exports = {
  index: async (req, res) => {
    users = await models.User.findAll()
    return res.json(users);
  },
  show: async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({err: 'Incorrect id'});
    }

    user = await models.User.findOne({where: {id}});
    if (!user) {
      return res.status(404).json({err: 'No user'});
    } else {
      return res.json(user);
    }
  },
  delete: async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({err: 'Incorrect id'});
    }
    
    num = await models.User.destroy({
      where: {
        id: id
      }
    })
    if (num == 0) {
        return res.status(404).json({err: 'No user'});
    } else {
      return res.status(204).send();
    }
  },
  create: async (req, res) => {
    const name = req.body.name || '';
    if (!name.length) {
      return res.status(400).json({err: 'Incorrect name'});
    }
  
    user = await models.User.create({
      name: name
    });
    
    return res.status(201).json(user);
  }
}
