import {httpPost} from 'express-auto-routes';
import {tokenForUser} from './auth-utility';
import {User} from '../../core/data/schema/Schema';

import passport from 'passport';

//const requireAuth = passport.authenticate('jwt', {session:false});

export class signupController {

    @httpPost('/authentication/signup')
    post(req, res, next){
      const user = User();

      const email = req.body.email;
      const password = req.body.password;

      if(!email || !password){
        return res.status(422).send({error:'You must provide email and password'})
      }

      //See if the user with the given email exists
      user.findOne({email:email}, function(err, existingUser){

        if(err){ return next(err);}

        //if a user with a does exist, return an Error
        if(existingUser){
          return res.status(422).send({error:'Email is in use'});
        }

        //if a user with a email does not exist, create and save user record.
        const newUser = new user({
          email:email,
          password:password
        });

        newUser.save(function(err){
            if(err){return next(err);}
        });

          //Respond to request indicating the user was created
          res.json({token: tokenForUser(user)});
      });
    }
}
