import passport from 'passport';
import {User} from '../core/data/schema/schema';
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

  });
});

passport.use(jwtLogin);
passport.use(localLogin);
//Tess passport to use this strategy
