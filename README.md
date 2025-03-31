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


2. 阿拉伯语语言适配经验方案

+ 利用postcss-rt插件在代码编译的时候把left改成right的
**插件局限性：只处理class类上的属性，但是不处理style样式上的属性，js动态修改的css属性不处理，要手动处理**
针对上面的问题：
+ 代码中的style尽量抽成class类，但是需要注意三方插件的样式，比如echarts鼠标悬浮的的样式，是echarts动态生成到DOM的style元素上的
```js
// 在配置项中的tooltip的formatter自定义DOM样式，抽离样式到class
let option = {
    tooltip: {
        formatter: params => {
            console.log(params[0],'5555555')
            let data = params[0];
            return `<div class="chart-tooltip">
                <div class="chart-tooltip-content">
                    <p class="name">${data.name}</p>
                    <p style="margin-top: 10px">
                        <span class="circle" style="background-color: ${data.color}"></span>
                        <span class="count">${data.value[1]}</span>
                    </p>
                    <div class="extra-div"></div>
                </div>
                <div class="extra-div"></div>
            </div>`
        }
    }
}
```

+ 时间选择器时间查询的拼接（阿拉伯语）
```js
onSubmit(value, dateString) {
    if (!dateString[0] || !dateString[1]) {
        this.initTime();
        return;
    }

    // 转成时间戳
    let startT = value[0].valueOf(),
        endT = value[1].valueOf();
    // 处理应该是当天的0点到23:59:59
    let formatS = moment(startT).format('YYYY-MM-DD') + ' 00:00:00',
        formatE = moment(endT).format('YYYY-MM-DD') + ' 23:59:59',
        startTime = moment(formatS).utc().format('YYYYMMDDTHHmmss[Z]'),
        endTime = moment(formatE).utc().format('YYYYMMDDTHHmmss[Z]')
    console.log(formatS, formatE,startTime, endTime, '时间转换')
}
```

3. 数据接到接口返回的数据最好是全局赋值，尽量不要出现新的属性避免vue2不及时更新
```js
this.list[0].a = 'a'// 确保a是响应式的
```

4. 滑动动效
```css
@keyframes slide {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.slide-animation {
    /* 透明度为0 */
    opacity: 0;
    /* 用于将元素在水平方向上向左移动自身宽度的 100%。 */
    transform: translateX(-100%);
    /* 2秒后出现动画 */
    animation: slide 2s forwards ease-out;
}

```

4. 报警动效，大圈和小圈动效
```css
.marker_container {
	position: absolute;
	width: 40px;
	height: 40px;
	bottom: -63px;
	left: 198px;
}
.marker_container::before {
	content: '';
	position: absolute;
	top: 18px;
	left: -2px;
	transform: translate(0, 0);
	width: 88px;
	height: 60px;
	border-radius: 50%;
	border: 1px solid rgba(255, 165, 0, 0.8);
	background: radial-gradient(closest-side, rgba(255, 255, 255, 0.8), rgba(255, 165, 0, 0.4), transparent);
	animation: firePulse 2s infinite ease-in-out;
}
@keyframes firePulse {
	0% {
		transform: translate(0, 0) scale(1);
		opacity: 1;
	}
	50% {
		transform: translate(0, 0) scale(1.2);
		opacity: 0.5;
	}
	100% {
		transform: translate(0, 0) scale(1);
		opacity: 1;
	}
}
.wave {
	position: absolute;
	bottom: -23px;
	left: 42px;
	width: 22px;
	height: 15px;
	background: rgba(232, 186, 72, 0.1);
	border: 1px solid rgba(255, 165, 0, 0.8);
	border-radius: 50%;
	transform: translate(-50%, -50%);
	animation: waveAnimation 2s infinite;
}
@keyframes waveAnimation {
	0% {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}
	100% {
		transform: translate(-50%, -50%) scale(2.8);
		opacity: 0;
	}
}
```

5. 单行溢出隐藏
```css
.plate-number {
    max-width: calc(100% - 28px);
    overflow: hidden;
    text-overflow: ellipsis; /* 超出部分显示省略号 */
    white-space: nowrap;
}
```

6. 做大屏的时候，一般要求查询时间是今天的时候，基本都是实时的，要轮训的，不然今天的数据没发更新

7. 前端计算百分比的时候记得要处理分母为0的情况

8. 自适应比例，定义缩放组件
主要是给元素设置transform: scale(${scaleW}, ${scaleH})
a. 页面支持的分辨率supportWidth，supportHeight，实际屏幕的分辨率realWidth，realHeight
b. 计算比例 `scaleW = realWidth / supportWidth`, `scaleH = realHeight / supportHeight`
```js
this.$el.style.transform = `scale(${scaleW}, ${scaleH})`;
// 设置为全局变量
document.documentElement.style.setProperty('--scaleW', `${scaleW}`);
document.documentElement.style.setProperty('--scaleH', `${scaleH}`);
// 同时也放置原来的比例，用在不需要缩放的地方使用
document.documentElement.style.setProperty('--no-scaleW', `${1 / scaleW}`);
document.documentElement.style.setProperty('--no-scaleH', `${1 / scaleH}`);
```

9. 实时推送的功能
a. 首次请求默认是传开始时间是空的，结束时间是当前的时间戳。数据返回数据库最新一条的时间戳maxScore。更新请求的开始时间为maxScore+1，结束时间是当前的时间戳。==》这样确保每次查询的时间段内是新推送的数据
b. 遍历新查询的数据，和老数据相比，如果存在重复车的数据，那就删除老的车的数据，保留新的。然后排序即可
c. 轮训时间间隔比较短的，最好不用用setInterval，避免服务器请求过多，压力大。
```js
let params = {
    type: 'faceAndVehicleAlarm',
    start: this.lastId,
    end: Date.now(),
};
getRealQuery(params)
    .then((res) => {
        if (res.results[0]) {
            this.lastId = res.results[0].maxScore + 1;
        }
    })
    .finally(() => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        // 5s轮训一次
        this.timer = setTimeout(() => {
            this.getRealData();
        }, 5 * 1000);
    });
```

10. 善用全局事件总线通信，$ebus，尤其是地图的交互，使用的同一个地图，但是不同模块的交互不能同时出现，那就是需要清空其他的地方的地图交互了。
