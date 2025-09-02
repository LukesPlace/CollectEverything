<template>
  <div class="tags-section">
    <label for="tag-input" class="tags-label">Tags:</label>
    <ul class="tags-list">
      <li v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag }}
        <button class="remove-btn delete-btn" @click="removeTag(index)">×</button>
      </li>
    </ul>

    <div class="add-tag">
      <input
        id="tag-input"
        v-model="newTag"
        @keyup.enter="addTag"
        type="text"
        placeholder="Add a tag"
      />
      <button class="primary-btn" @click="addTag">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue?: string[]
}>();

const newTag = ref('');
const tags = defineModel<string[]>({required: true});
if(!tags.value)
  tags.value = [];

watch(() => props.modelValue, (val) => {
  tags.value = val ?? [];
});

function addTag() {
  const trimmed = newTag.value.trim();
  if (trimmed && !tags.value.includes(trimmed)) {
    tags.value.push(trimmed);
    newTag.value = '';
  }
}

// Remove a tag
function removeTag(index: number) {
  tags.value.splice(index, 1);
}
</script>

<style scoped>
.tags-label {
  font-weight: 500;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 1rem 0 1rem 0;
  list-style: none;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: var(--primary-green);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.9rem;
}

.remove-btn {
  padding: 0 0.3rem;
  font-weight: bold;
  font-size: 1rem;
}

.add-tag {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.add-tag input {
  flex: 1;
  padding: 0.5em 0.75em;
  border-radius: 6px;
  border: 1px solid #ddd;
  outline: none;
  background-color: #f8f8f8;
  font-family: inherit;
}

.add-tag input:focus {
  border-color: var(--primary-green);
  box-shadow: 0 0 0 3px var(--primary-green);
}
</style>
