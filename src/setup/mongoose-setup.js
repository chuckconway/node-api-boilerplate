import UserSchema from '../core/data/schema/user/user-schema';
import mongoose from 'mongoose';
import config from '../config';


export class Mongoose {
    configure(){
        this.schema();
        this.connection();
    }

    connection(){
        mongoose.connect(config.mongoConnectionString, { server: { socketOptions: { keepAlive: 1 } } });
    }

    schema(){
        let userSchema = new UserSchema();
        userSchema.initialize();
    }
}
