# 说明
信贷审核

此项目是 vue + node 构建的后台管理系统，所有的数据都是从服务器实时获取的真实数据，具有真实的注册、登陆、管理数据、权限验证等功能。

## 技术栈
vue2 + vuex + vue-router + element-ui + express

## 项目运行
1. 前端项目运行vue-elementui，可直接下载node压缩包直接解压，
npm start可运行
2. 后端服务 express-server
npm install安装依赖包
npm start 启动项目

## 演示地址 
http://121.43.135.81/loanWeb/#/login
管理员：admin  admin@123
普通用户: test1 123456

二维码

![show](./show.png)



## 新增功能
### 个人中心可以修改密码
### 提交审核后，编辑和删除都禁用
### 统计合同下载次数（直接模拟数据）？有必要否？
### 有空添加下意见反馈

# TODO 分割线

1. 每天0点准时更新的功能
要想实现0点更新，但是又不想每一秒轮训太快了，可以借助工具函数实现
**思路：**
+ 获取当前时间，获取今天最后时间23:59:59，计算当前时间和今天最后时间的间隔作为定时器的时间，这样到了今天最后时间就会执行**更新时间时机**了。
+ 时机一到后，就可以轮训后面一天轮训一次了

```js
// startDateWatcher函数进入倒计时

startDateWatcher() {
    console.log(this.searchTime[1],'yestoday898989')
    // 每天凌晨0点1秒后检查更新（避免立即触发），引入moment.js
    const now = moment();
    // 距离第二天0点1秒后的间隔
    const initialDelay = Math.max(
        0,
        moment()
            .endOf('day')
            .add(1, 'seconds')
            .diff(now)
    );
    console.log(initialDelay,'initialDelay')
    
    // 到第二天0点的时候开始更新时间且进入下一次轮训
    this.dateTimer = setTimeout(() => {
        this.updateDateRange();
        // 后续每天检查一次，一天轮训一次
        this.dateTimer = setInterval(this.updateDateRange, 86400000);
    }, initialDelay);
},

// 执行更新操作，这里是同步更新时间选择器的状态和结束时间
updateDateRange(){
    if(yestoday === endTime){
        // 更新结束时间为今天
        this.searchTime[1] = moment().endOf('day');
    }
    // nowDay作为时间选择器的key，进行更新
    this.nowDay = new Date().getDate()
}

```

