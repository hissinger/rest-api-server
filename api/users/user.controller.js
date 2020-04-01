module.exports = {
  index: (req, res)=> {
    return res.json(users);
  },
  show: (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({err: 'Incorrect id'});
    }
  
    let user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({err: 'Unknown user'});
    }
  
    return res.json(user);
  },
  delete: (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({err: 'Incorrect id'});
    }
  
    const idx = users.findIndex((u) => {
      return u.id === id;
    });
    if (idx === -1) {
      return res.status(404).json({err: 'Unknown user'});
    };
  
    users.splice(idx, 1);
    return res.status(204).send()
  },
  create: (req, res) => {
    const name = req.body.name || '';
    if (!name.length) {
      return res.status(400).json({err: 'Incorrect name'});
    }
  
    const id = users.reduce((maxId, user) => {
      return maxId < user.id ? user.id : maxId;
    }, 0) + 1;
  
    const newUser = {
      id,
      name
    };
  
    users.push(newUser);
  
    return res.status(201).json(newUser);
  }
}

let users = [
  {
    id:1,
    name: 'Hyun'
  },
  {
    id:2,
    name: 'Alice'
  },
  {
    id:3,
    name: 'Kelly'
  }
];