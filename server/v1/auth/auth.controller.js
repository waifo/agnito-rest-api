const jwt = require("jsonwebtoken");
const passport = require("passport");
const {addUser,findUser,updateUser} = require("../users/users.controller");
const secret = '13102c8babab4a090278cb685edcbf608ac078cf082e30ebb66117fbe5525e47'

function tokenForUser(user) {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  // return jwt.encode({sub:user._id.toString(), iat:timestamp},config.secret)
  return jwt.sign(
    {
      sub: user._id.toString(),
      iat: timestamp,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    secret
  );
}

const signin = function({ email, password }, req) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (!user) {
        return reject(err.errmsg);
      }

      req.login(user, () => {
        let token = tokenForUser(user);
        req.res.cookie("token", token, {
          httpOnly: true
        });
        //update user is online
        return updateUser(user._id.toString(), { isOnline: true })
          .then(updated => {
            return resolve({
              email: user.email,
              _id: user._id.toString(),
              isOnline: user.isOnline,
              token
            });
          })
          .catch(err => reject("failed to update"));
      });
    })({ body: { email, password } });
  });
  // res.json({token:tokenForUser(req.user)})
};
const signup = function({ email, password }, req) {
  if (!email || !password) {
    console.log("error:Email or password cannot be empty");
    throw new Error("You must provide an email and password.");
    // return res.status(422).send({error:'Email or password cannot be empty'})
  }

  return findUser.findByEmail(email)
    .then(existingUser => {
      if (existingUser) {
        console.log("error:'Email is in use'");
        throw new Error("Email in use");
        // res.status(422).send({error:'Email is in use'});
      }

      return addUser({ email: email, password: password })
        .then(data => {
          return new Promise((resolve, reject) => {
            resolve(data);
          });
        })
        .catch(error => {
          throw new Error(error, "unexpected error");
        });
    })
    .catch(error => {
      throw new Error(error, "unexpected error");
    });
};

module.exports = {signin,signup}
