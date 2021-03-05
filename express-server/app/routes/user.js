// 用户路由
import express from 'express'
import userRouter from '../controllers/user'
import logger from '../utils/logger'
const router = express.Router();

export default (app) => {
    router.route('/user/login').post(userRouter.login);
    router.route('/user/query').get(userRouter.login);

    // /api是路由的前缀
    app.use('/',router);
    logger.info('日志------')
}