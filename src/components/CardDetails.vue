<script setup lang="ts">
  import { ref, watch, defineEmits, type Ref } from 'vue';
  import { type CollectionItem } from '@/stores/collection';
  import { useCollectionStore } from '@/stores/collection';
  import FileInput from './FileInput.vue';
  import Tag from './Tag.vue';
  import ToggleButton from './ToggleButton.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  const collectionStore = useCollectionStore();
  const props = defineProps<{
    isVisible: Boolean,
    item: CollectionItem,
  }>();

  const emit = defineEmits(['close', 'save']);

  // Local data to edit card details before saving. Dont apply on cancel.
  const localName: Ref<string> = ref(props.item.name);
  const localDescription: Ref<string | null> = ref(props.item.description);
  const localCompleted: Ref<boolean> = ref(props.item.completed);
  const localImageBase64: Ref<string | null> = ref(null); // Store the base64 string
  const localTags: Ref<Array<string>> = ref(props.item.tags ?? []);
  const localCategory: Ref<string | null> = ref(null);

  const isOpen = ref(false);


  watch(() => props.isVisible, (newValue) => {
    if (newValue) {
      localName.value = props.item.name;
      localDescription.value = props.item.description;
      localCompleted.value = props.item.completed;
      localImageBase64.value = props.item.imageBase64;
      localTags.value = props.item.tags ?? [];
      localCategory.value = props.item.category ?? null;
    }
  });

  function closeModal() {
    emit('close');
  }

  function saveChanges() {
    props.item.name = localName.value;
    props.item.description = localDescription.value;
    props.item.completed = localCompleted.value;
    props.item.imageBase64 = localImageBase64.value;
    props.item.tags = localTags.value;
    props.item.category = localCategory.value;
    collectionStore.saveCollection();
    emit('save');
  }
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="wrapper">
      <div class="item-image" :class="[{ 'card-incomplete': !localCompleted }]">
        <img v-if="localImageBase64" :src="localImageBase64 ?? 'https://via.placeholder.com/300x200'" alt="Card image" class="card-image" />
        <div v-else class="card-placeholder">No image</div>
        <font-awesome-icon v-if="!localCompleted" :icon="['fas', 'lock']" class="lock-icon" />
      </div>
      <div class="modal-content">
        <h2>Edit Item Details</h2>
        <div class="modal-body">
          <ToggleButton
          v-model="localCompleted"
          unchecked-state="Add to collection?"
          checked-state="Remove from collection?"
          />
          
          <label for="name">Name:</label>
          <input type="text" v-model="localName" id="name" />
          
          <!-- Accordion -->
          <div class="accordion">
            <button class="accordion-header" @click="isOpen = !isOpen">
              Advanced Details
              <span class="chevron" :class="{ rotated: isOpen }">⌄</span>
            </button>
            
            <transition name="accordion">
              <div v-if="isOpen" class="accordion-body">
                <div class="description">
                  <label for="description">Description:</label>
                  <textarea v-model="localDescription" id="description"></textarea>
                </div>
                
                <div class="tags">
                  <Tag v-model="localTags" />
                </div>
                
                <div class="category">
                  <label for="category">Category</label>
                  <input type="text" v-model="localCategory" id="category" />
                </div>
                
                <div class="fileInput">
                  <FileInput v-model="localImageBase64" />
                </div>
              </div>
            </transition>
          </div>
        </div>
        
        
        <div class="modal-actions">
          <button @click="closeModal" class="secondary-btn">Cancel</button>
          <button @click="saveChanges" class="primary-btn">Save</button>
        </div>
      </div>
    </div>
  </div>
  </template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 5%;
  gap: 5%;
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

/* Accordion Styling */

.accordion {
  margin-top: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  background: #2a2a2a;
}

.accordion-header {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  background: #1e1e1e;
  border: none;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chevron {
  transition: transform 0.3s ease;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.accordion-body {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}

/* Smooth open/close transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0 1rem;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
  padding: 1rem;
}

.card-incomplete {
  filter: brightness(50%);
  position: relative;
}

.lock-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: auto;
  color: black;
  stroke: white;
  stroke-width: 10px;
  paint-order: stroke fill;
}

.item-image {
  width: 30vw;
  max-width: 600px;
  height: auto;
  position: relative;
}

.item-image img {
  width: 100%;
  height: auto;
  display: block; 
  border-radius: 10px;
}

.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  color: #555;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
}
</style>
