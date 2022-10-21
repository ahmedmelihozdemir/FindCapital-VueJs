<template>
    <nav>
        <!-- <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link> -->
    </nav>
    <router-view />
</template>

<style lang="scss">
#app {
    font-family: Fredoka One, cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #ACE1AF;
    width: 100vw;
    height: 100vh;
}  

nav {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
        margin: 30px;
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
