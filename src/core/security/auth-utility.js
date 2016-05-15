const jwt = require('jwt-simple');
const config = require('../../config');

export function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.default.jwtToken)
}
