import {httpGet} from 'express-auto-routes';

export class testsController{

    @httpGet('/tests')
    get(req, res, next){
      res.json({"Chuck":"HI"});
    }
}
