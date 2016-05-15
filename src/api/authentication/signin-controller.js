import {httpPost} from 'express-auto-routes';
import {tokenForUser} from '../../core/security/auth-utility';
import passport from 'passport';

const requireSignin = passport.authenticate('local', {session:false});

export class signinController {

    @httpPost('/authentication/signin', requireSignin)
    post(req, res, next){
      res.send({token:tokenForUser(req.user)});
    }
}
