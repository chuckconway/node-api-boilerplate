
/** insecureRoutes **/
//express.unless
//https://github.com/jfromaniello/express-unless

/** corsOptions **/
//Cors configuration
//https://github.com/expressjs/cors

/** controllers.prependToRoutes **/
//This prepends an url to the routes. For example, if you want '/api/v1' appended to all the routes, then set it below.
//Ideally the controllers section should be an array so we can define sub sets of controllers to have different prepends and
//settings

/** controllers.scanGlob **/
//This is what directory should be scaned for the controllers. At the moment it CWD is /setup. Ideally we need to set it up
//So that the root is the current working directory (CWD)

export default {
  jwtToken:'',
  insecureRoutes:[
    '/api/v1/tests',
    '/api/v1/authentication/signin',
    '/api/v1/authentication/signup'
    //{ url: '/', methods: ['GET', 'PUT']  } //Example route when routes need to be restricted to the method level.
  ],
  corsOptions: {
    origin:undefined
  },
  controllers:{
    prependToRoutes: '/api/v1',
    scanGlob:'/api/**/*.js'
  },
  mongoConnectionString: ''
};
