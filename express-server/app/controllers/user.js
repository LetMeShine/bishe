// 用户接口
const userCtrl = {
    login(req,res){
        res.send(''+new Date().valueOf())
    }
}
export default userCtrl;