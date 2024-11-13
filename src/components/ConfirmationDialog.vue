<template>
  <div v-if="isVisible" class="dialog-overlay">
    <div class="dialog-content">
      <header class="dialog-header">
        <h2 class="default-text">{{ title }}</h2>
        <button @click="onClose" class="dialog-close-btn">X</button>
      </header>
      <div class="dialog-body">
        <slot />
      </div>
      <footer class="dialog-footer">
        <button @click="onClose" class="secondary-btn">Cancel</button>
        <button v-if="!isDeleteDialog"  @click="onSave" class="primary-btn">Save</button>
        <button v-else  @click="onDelete" class="delete-btn">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

const props = defineProps<{
  title: string;
  show: boolean;
  isDeleteDialog?: boolean
}>();

const isVisible = ref(props.show);

watch(() => props.show, (newVal) => {
  isVisible.value = newVal;
});

const emit = defineEmits(['close', 'save', 'delete'])
function onClose() {
  isVisible.value = false;
  emit('close');
}
function onSave() {
  emit('save');
}
function onDelete() {
  emit('delete');
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background-color: var(--color-background-mute);
  width: 90%;
  max-width: 500px;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-close-btn {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.dialog-body {
  margin: 1em 0;
}

.dialog-footer {
  text-align: right;
}
</style>
