<script setup lang="ts">
  import HomeItem from './HomeItem.vue'
  import DocumentationIcon from './icons/IconDocumentation.vue'
  import ToolingIcon from './icons/IconTooling.vue'
  import EcosystemIcon from './icons/IconEcosystem.vue'
  import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
    <HomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading><RouterLink to="/collections">Collections</RouterLink></template>
      Manage your current collections.
  </HomeItem>

  <HomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Analytics</template>
      Coming soon..
  </HomeItem>

  <HomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>
      Coming soon..
  </HomeItem>

  <HomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Settings</template>
      Coming soon..
  </HomeItem>
</template>
