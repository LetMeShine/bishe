<template>
    <div id="app">
        <div>name: {{ this.$store.state.name }}</div>
        <div>getName: {{ this.$store.getters.getName }}</div>
        <div>it-count: {{ this.$store.state.it.count }}</div>
        <button @click="good">赞美同步</button>、
        <button @click="asyncGood">赞美异步</button>
        <button @click="syncItGood">it同步增加</button>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>
<script>
// @ is an alias to /src

export default {
    name: "App",
    components: {},
    data() {
        return {
            well: " is very good!!",
        };
    },
    methods: {
        good() {
            this.$store.commit("syncGood", this.well);
        },
        asyncGood() {
            this.$store.dispatch("asyncGood", this.well);
        },
        syncItGood() {
            this.$store.commit("addCount", 15);
        },
    },
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
