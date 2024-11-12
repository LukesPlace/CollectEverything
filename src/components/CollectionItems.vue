<script setup lang="ts">

const props = defineProps<{
  cards: Array<img>;
}>();

</script>

<template>
<div class="card-list">
  <!-- <img v-for="img in cards" :key="img" :src="img" alt="Dynamic Image" /> -->
  <div v-for="card in props.cards">
    <img :key="card" :src="card" alt="Dynamic Image"/>
  </div>
</div>
</template>

<style>

.card-list { 
  width: 100%;
  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  grid-template-rows: 20% 20%;
  gap: 5rem;
}

.card-list > div > img {
  width: 100%;
}
</style>