import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import jwt from 'express-jwt';
import autoRoutes from 'express-auto-routes';
import {routeAuth} from '../core/security/route-auth-middleware';

import Config from '../config';

export class Express {
    constructor(dirname){
        this.dirname = dirname;
    }

    configure(startup) {

        //Setup Express
        let app = express();
        this.settings(app);

        //configure routes
        const router = express.Router();
        this.routes(app, router, Config);
        router.use(routeAuth().unless({path:Config.insecureRoutes}));
        //router.use(jwt({secret:Config.jwtToken}).unless({path:Config.insecureRoutes}));

        //Configure CORS
        app.use(cors(Config.corsOptions || {}));

        //set up error handlers
        this.errorStackTraceHandler(app);
        this.notFoundHandler(app);

        startup(app);

        return app;
    }

    routes(app, router, config){

       if(!config.controllers.scanGlob){
         throw "There must be aleast one glob defined for controllers, please refer to the notes in /config.js";
       }

        let routes = autoRoutes(router, path.join(this.dirname, config.controllers.scanGlob));
        app.use(config.controllers.prependToRoutes || '', routes);
    }

    settings(app){
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
    }

    notFoundHandler(app){
        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            let err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }

    errorStackTraceHandler(app){
        if (app.get('env') === 'development') {
            app.use((err, req, res, next) => {
                res.status(err.status || 500)
                    .json('error',
                        {
                            message: err.message,
                            error: err
                        });
            });
        } else {
            app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: {}
                });
            });
        }
    }
}
