const passport = require('passport');

const postRegister = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        const error = new Error('Falta campo email o password en tu formulario');
        error.status = 400;
        return next(error);
    }

    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(201).json(user);
        });
    };
    passport.authenticate('registro', done)(req);
};

const postLogin = (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json(user);
        });
    };
    passport.authenticate('login', done)(req);
};

const postLogout = async (req, res, next) => {
    if (req.user) {
        await req.logout(() => {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                return res.status(200).json('¡Hasta pronto!');
            });
        });
    } else {
        return res.sendStatus(304);
    }
};

module.exports = {
    postRegister,
    postLogin,
    postLogout,
};
     
