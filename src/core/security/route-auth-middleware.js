import unless from 'express-unless';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session:false});

export function routeAuth(middlewareOptions){
  requireAuth.unless = unless;
  return requireAuth;
}
