const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../../api/users/users.model");
const { validateEmail, validatePassword } = require("../helpers/validations");

const loginStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      const error = new Error(
        "Datos incorrectos. Revisa los requisitos de email y constraseña"
      );
      error.status = 400;
      return done(error);
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      const error = new Error("No existe el usuario, regístrate primero");
      error.status = 401;
      return done(error);
    }

    const isValidUserPassword = await bcrypt.compare(password, user.password);

    if (!isValidUserPassword) {
      const error = new Error("Constraseña incorrecta");
      error.status = 401;
      return done(error);
    }

    user.password = null;
    return done(null, user);
  }
);

module.exports = loginStrategy;
