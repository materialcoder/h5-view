<template>
  <div class="home">
    <HelloWorld msg="Test" />
    <h-text text="这是一段文字"></h-text>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
