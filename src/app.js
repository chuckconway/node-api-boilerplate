import {Express} from './setup/express-setup';
import {Mongoose} from './setup/mongoose-setup';
import passport from './setup/passport-setup';

var express = new Express(__dirname);

export default express.configure((app)=> {

    //set up mongoose
    let mongoose = new Mongoose();
    mongoose.configure();
});
