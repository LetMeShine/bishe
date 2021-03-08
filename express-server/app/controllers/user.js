// 用户接口
const userCtrl = {
    //生成jwt token
    generateJwtToken(data){
        return jwt.sign(data, Constant.secret, {
            expiresIn: '60000'  //单位 毫秒  1d-1天
        })
    },
    //request  response
    login: function(req, resp) {
        logger.info("===登录开始")
        // resp.send("hello")
        let {account, pwd} = req.body;
        //判断account pwd为空
        if (account && pwd) {
            userService.findUserByAccountPassword(account, pwd)
                .then(data => {
                    // console.log(data)
                    if (data) {
                        //生成jwt
                        let result = {
                            id: data.id,
                            account: data.account
                        }

                        let jwt = userCtrl.generateJwtToken(result);
                        resp.json({code: 200, data: data, token: jwt});
                    } else {
                        resp.json({code: 200, msg: '无此用户'});
                    }
                })
        } else {
            resp.json({code: 200, msg: '参数无效!'});
        }

    },
}
export default userCtrl;