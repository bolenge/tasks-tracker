<script setup lang="ts">
import TheMenu from './components/TheMenu.vue'
import TheTopTask from './components/TheTopTask.vue'
</script>

<template>
  <div>
    <div class="flex">
      <div class="h-screen w-1/5">
        <TheMenu />
      </div>

      <div class="w-4/5">
        <div>
          <TheTopTask />
        </div>
      </div>
    </div>
  </div>
</template>
