<template>
  <div class="hello">
      <h1>登录</h1>
      <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  methods:{
      login(){
          this.$router.push('./home');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
