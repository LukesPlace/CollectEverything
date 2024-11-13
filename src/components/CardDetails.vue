<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Edit Card Details</h2>
      <div class="modal-body">
        <label for="name">Name:</label>
        <input type="text" v-model="localName" id="name" />

        <label for="description">Description:</label>
        <textarea v-model="localDescription" id="description"></textarea>

        <label>
          <checkbox v-model="localCompleted"></checkbox>
        </label>
      </div>

      <div class="modal-actions">
        <button @click="closeModal" class="secondary-btn">Cancel</button>
        <button @click="saveChanges" class="primary-btn">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { type CollectionItem } from '@/stores/collection';
import Checkbox from './Checkbox.vue';

const props = defineProps<{
  isVisible: Boolean,
  item: CollectionItem,
}>();

const emit = defineEmits(['close', 'save']);

// Local data to edit card details before saving. Dont apply on cancel.
const localName = ref(props.item.name);
const localDescription = ref(props.item.description);
const localCompleted = ref(props.item.completed);

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    localName.value = props.item.name;
    localDescription.value = props.item.description;
    localCompleted.value = props.item.completed;
  }
});

function closeModal() {
  emit('close');
}

function saveChanges() {
  props.item.name = localName.value;
  props.item.description = localDescription.value;
  props.item.completed = localCompleted.value;
  emit('save');
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.modal-body {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

label {
  font-weight: 500;
}

input[type="text"], textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #2e2e2e;
  color: #ffffff;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.primary-btn, .secondary-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.primary-btn {
  background-color: var(--primary-green, #32cd32);
  color: #ffffff;
}
</style>
