const models = require('../../models/models');

module.exports = {
  index: (req, res)=> {
    models.User.findAll()
      .then(users => res.json(users));
  },
  show: (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({err: 'Incorrect id'});
    }

    models.User.findOne({
      where: {
        id: id
      }
    }).then(user => {
      if (!user) {
        return res.status(404).json({err: 'No user'});
      }
      return res.json(user);
    })
  },
  delete: (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({err: 'Incorrect id'});
    }
    
    models.User.destroy({
      where: {
        id: id
      }
    }).then( num => {
      if (num == 0) {
        return res.status(404).json({err: 'No user'});
      }
      return res.status(204).send()
    });
  },
  create: (req, res) => {
    const name = req.body.name || '';
    if (!name.length) {
      return res.status(400).json({err: 'Incorrect name'});
    }
  
    models.User.create({
      name: name
    }).then(user => res.status(201).json(user));
  }
}
