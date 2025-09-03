<script setup lang="ts">
  import { ref, watch, defineProps } from 'vue';

  const props = defineProps<{
    modelValue?: string[]
  }>();

  const newTag = ref('');
  const showInput = ref(false);
  const tags = defineModel<string[]>({ required: true });
  if (!tags.value) tags.value = [];

  watch(() => props.modelValue, (val) => {
    tags.value = val ?? [];
  });

  function toggleInput() {
    if (showInput.value && newTag.value.trim()) {
      addTag();
    }
    showInput.value = !showInput.value;
  }

  function addTag() {
    const trimmed = newTag.value.trim();
    if (trimmed && !tags.value.includes(trimmed)) {
      tags.value.push(trimmed);
    }
    newTag.value = '';
    showInput.value = false;
  }

  function removeTag(index: number) {
    tags.value.splice(index, 1);
  }
</script>

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
      <!-- Only show input when editing -->
      <input
        v-if="showInput"
        id="tag-input"
        v-model="newTag"
        @keyup.enter="addTag"
        type="text"
        placeholder="Add a tag"
      />
      <button class="primary-btn small-btn" @click="toggleInput">
        {{ showInput ? 'Save Tag' : 'Add Tag' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.tags-label {
  font-weight: 500;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: #f0f0f0;
  color: #333;
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
  padding: 0.25em 0.5em; /* smaller height */
  border-radius: 6px;
  border: 1px solid #ddd;
  outline: none;
  background-color: #f8f8f8;
  font-family: inherit;
  font-size: 0.8rem;
}

.add-tag input:focus {
  border-color: var(--primary-green);
  box-shadow: 0 0 0 2px var(--primary-green);
}

/* smaller button */
.small-btn {
  padding: 0.3em 0.8em;
  font-size: 0.85rem;
}
</style>
