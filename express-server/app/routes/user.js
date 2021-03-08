// 用户路由
import express from 'express'
import userRouter from '../controllers/user'
const router = express.Router();

export default (app) => {
    router.route('/user/login').post(userRouter.login);
    router.route('/user/query').get(userRouter.login);

    // /api是路由的前缀
    app.use('/',router);
}