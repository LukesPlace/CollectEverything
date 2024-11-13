<script setup lang="ts">
import HomeItem from './HomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
</script>

<template>
    <HomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading><RouterLink to="/collections">Collections</RouterLink></template>
      Get an extensive in depth look at your current collection.
  </HomeItem>

  <HomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Card List</template>
      A complete card list of all the current cards in all the current sets.
  </HomeItem>

  <HomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>
      Deck builder
  </HomeItem>
</template>
