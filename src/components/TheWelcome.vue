<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
    <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading><RouterLink to="/collections">Collections</RouterLink></template>
      Get an extensive in depth look at your current collection.
  </WelcomeItem>
  
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading><RouterLink to="/collection/test">Collection</RouterLink></template>
      Get an extensive in depth look at your current collection.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Card List</template>
      A complete card list of all the current cards in all the current sets.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>
      Deck builder
  </WelcomeItem>
</template>
