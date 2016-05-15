import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export default class UserSchema {
	initialize(){
		let schema = this.buildSchema();

		this.preHook(schema);
		mongoose.model('User', schema);

		return schema;
	}

	buildSchema(){
		let Schema = mongoose.Schema;

		return new Schema({
		  email:{type:String, unique:true, lowercase:true},
		  password:String,
			firstname: { type: String, default: '' },
			lastname: { type: String, default: '' },
			createDate: { type: Date, default: Date.now }
		});
	}

	preHook(schema){
		//Before saving a model, run this function
		schema.pre('save', function(next){
		  const user = this;

		  //generate a salt, then run callback
		  bcrypt.genSalt(10, function(err, salt){
		    if(err){return next(err);}

		    //hash our (encrypt) out password using the salt
		    bcrypt.hash(user.password, salt, null, function(err, hash){
		       if(err){ return next(error);}

		       // overwrite the plain text with the encryped password
		       user.password = hash;
		       next();
		    });
		  });
		});

		schema.methods.comparePassword = function(candidatePassword, callback){
		  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		    if(err){return callback(err);}

		    callback(null, isMatch);
		  });
		}
	}
}
