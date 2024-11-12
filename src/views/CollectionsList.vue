<script setup lang="ts">

const collections: Array<string> = ['Cards', 'GameBoys'] 
</script>

<template>
  <div class="collections">
    <h1>All Collections</h1>
    <ul>
      <li v-for="collection in collections"> {{ collection }}</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .collections {
    width: 100%;
    min-height: 100vh;
    align-items: center;
  }
}
</style>
