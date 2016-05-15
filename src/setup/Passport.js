// import passport from 'passport';
// import {UserModel} from '../core/models/UserModel';
// import {Local} from './passport/Local';
//
// export class Passport{
//     configure(){
//         this.setUserSerialization();
//         this.loadStrategies();
//     }
//
//     setUserSerialization(){
//         let model = new UserModel();
//         let User = model.model();
//
//         passport.serializeUser((user, done) => {
//             done(null, user.id)
//         })
//
//         passport.deserializeUser((id, done) => {
//             User.load({ criteria: { _id: id } }, (err, user) =>{
//                 done(err, user)
//             })
//         })
//     }
//
//     loadStrategies(){
//         let local = new Local();
//         passport.use(local.initialize());
//     }
// }

import passport from 'passport';
import {User} from '../core/data/schema/Schema';
import config from '../config';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import LocalStrategy from 'passport-local';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey:config.jwtToken
};

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
      User().findOne({email:email}, function(err, user){
        if(err) {return done(err);}

        if(!user){ return done(null, false);}

        //compare passwords
          user.comparePassword(password, function(err, isMatch){
            if(err) {return done(err);}

            if(!isMatch){ return done(null, false);}

            return done(null, user);
          });

      });
});


//create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User().findById(payload.sub, function(err, user){
    if(err){return done(err, false);}

    if(user){
      done(null, user);
    } else {
      done(null, false);
    }

  })
});

passport.use(jwtLogin);
passport.use(localLogin);
//Tess passport to use this strategy
