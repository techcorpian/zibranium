import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/auth/AuthModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, password: hashedPassword });

  User.create(newUser, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while creating the User.' });
      return;
    }
    res.send(data);
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ message: `Not found User with username ${username}.` });
      } else {
        res.status(500).send({ message: 'Error retrieving User with username ' + username });
      }
      return;
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });

    res.status(200).send({
      id: user.id,
      username: user.username,
      accessToken: token
    });
  });
};
