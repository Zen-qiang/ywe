<template>
  <div>
    <transition name="router-fade" mode="out-in">
      		<router-view></router-view>
    </transition>
  </div>
</template>
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
