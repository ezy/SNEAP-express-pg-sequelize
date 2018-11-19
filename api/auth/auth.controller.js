const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../../config/environment');
const User = require('../../models').User; // eslint-disable-line prefer-destructuring

const { validateEmail, validatePassword } = require('../../services/validations');

const verifyUser = (req, res, next) => {
  const userEmail = req.body.email ? req.body.email.trim() : '';
  const { password } = req.body;
  const failed = {
    error: 'Authentication failed. Wrong email or password.',
  };

  if (!userEmail || !password) {
    return res
      .status(422)
      .send(failed);
  }

  User.findOne({ where: { userEmail: req.body.email } })
    .then((user) => {
      const userHash = user.userPass;
      const validUser = bcrypt.compareSync(password, userHash);

      if (!user || !validUser) {
        return res
          .status(401)
          .send(failed);
      }

      if (validUser) {
        const token = jwt.sign({ user }, config.jwtSecret);
        const userObj = {
          id: user.id,
          email: user.userEmail,
        };
        return res.json({
          user: userObj,
          token,
        });
      }
    })
    .catch(err => next(err));
};

const createUser = async (req, res, next) => {
  const userEmail = req.body.email ? req.body.email.trim() : '';
  const userPass = req.body.password ? req.body.password.trim() : '';

  if (!userEmail || !userPass) {
    return res
      .status(422)
      .send({ error: 'Email, and password are required.' });
  }

  const emailValidationError = validateEmail(userEmail);
  if (emailValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: emailValidationError }); // array of errors
  }

  const passwordValidationError = validatePassword(userPass);
  if (passwordValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: passwordValidationError });
  }

  User.findOne({
    where: { userEmail },
  })
    .then((user) => {
      if (user) {
        return res
          .status(409)
          .send({ error: 'The email is already registered.' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userPass, salt);

      const newUser = {
        userEmail,
        userPass: hash,
      };

      User.create(newUser)
        .then((user) => {
          const token = jwt.sign({ userfromToken: user }, config.jwtSecret, { expiresIn: '8h' });
          res.json({
            user,
            token,
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

module.exports = {
  verifyUser,
  createUser,
};
