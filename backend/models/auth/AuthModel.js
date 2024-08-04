import { pool } from '../../config/db.config.js';

class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
  }

  static create(newUser, result) {
    pool.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newUser });
    });
  }

  static findByUsername(username, result) {
    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: 'not_found' }, null);
    });
  }
}

export default User;
