<template>
    <div>
        <div class="about">首页主页</div>
        <div class="div1">
            div1
        </div>
    </div>

</template>

<script>
    export default {
    }
</script>

<style lang="scss">
$darkColor: #000;

.div1 {
    background-color:$darkColor;
    width: 100px;
    height: 100px;
    .div2 {
        border:1px solid $darkColor;
        .div31 {
            background-color: $darkColor;
        }
        .div32 {
            background-color: $darkColor;
        }
    }
}
</style>