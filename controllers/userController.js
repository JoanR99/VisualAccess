const User = require('../models/userModel');

module.exports.renderRegister = (req, res) => {
  res.render('user/register');
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, developer } = req.body.user;
    console.log(developer);
    const user = new User({ email, username, developer });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) next(err);
      req.flash('success', 'Bienvenido a VisualAcces');
      res.redirect('/');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('user/login');
};

module.exports.login = (req, res) => {
  req.flash('success', '¡Bienvenido Nuevamente!');
  const redirectUrl = req.session.returnTo || '/';
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash('success', '¡Adios!');
  res.redirect('/');
};
