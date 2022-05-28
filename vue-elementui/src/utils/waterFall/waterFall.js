/**
瀑布流：特点是图片等宽不等高
图片不留白，不变形
定位（脱离文档流）、如果是栅格化就不用脱离文档流
绝对定位
top 高度和最小的高度
left 高度和最小的索引*图片宽度
列数 屏幕的宽度/图片的宽度
 */
// $(function(){})  dom加载完就执行
$(window).on("load", function () {
    // 内容都加载完才执行
    waterFall();
});
function waterFall() {
    // 求出列数
    var box = $(".div_img");
    var boxWidth = box.outerWidth();
    var screenWidth = $(document).width();
    var cols = parseInt(screenWidth / boxWidth);
    // var padd = parseInt((screenWidth-boxWidth*cols)/cols) 计算间距的值
    // 创建当前高度值的数组
    var heightArr = [];
    // 遍历循环图片，第一排不需要定位，取高度值，其他拍定位处理
    $.each(box, function (index, item) {
        // 图片高度
        var boxHeight = $(item).outerHeight();
        if (index < cols) {
            // 第一排的高度
            heightArr[index] = boxHeight;
        } else {
            // 最小图片的高度
            var minHeight = Math.min(...heightArr);
            // 最小图片的索引
            var minIndex = heightArr.indexOf(minHeight);
            $(item).css({
                position: "absolute",
                left: minIndex * boxWidth + "px",
                top: minHeight + "px",
            });
            // 高度追加，高度更新
            heightArr[minIndex] += boxHeight;
        }
    });
}