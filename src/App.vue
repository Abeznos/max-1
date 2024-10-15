<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
  .app-container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
</style>