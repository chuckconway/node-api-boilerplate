import {Express} from './setup/Express';
import {Mongoose} from './setup/Mongoose';
import passport from './setup/Passport';

var express = new Express(__dirname);


module.exports = express.configure((app)=> {

    //set up mongoose
    let mongoose = new Mongoose();
    mongoose.configure();
    //
    // //configure passport to use mongoose to authenticate user.
    // let passport = new Passport();
    // passport.configure();

});
