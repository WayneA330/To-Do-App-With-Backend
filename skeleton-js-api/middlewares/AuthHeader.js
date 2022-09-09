const passport = require("passport");

const Authenticate = () => {
  return passport.authenticate("oauth-bearer", {
    session: false,
    failureRedirect: "/UnAuthorized",
  });
};
module.exports = Authenticate;
