<script setup lang="ts">
  import { type Ref } from 'vue';

  const selectedFile: Ref<string | null> = defineModel() as Ref<string | null>;

  function onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          selectedFile.value = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<template>
  <div class="file-input-container">
    <label class="file-input-label" for="file-upload">
      <span class="file-btn">Choose File</span>
      <span class="file-name" v-if="selectedFile">{{ selectedFile }}</span>
    </label>
    <input type="file" id="file-upload" @change="onFileChange" />
  </div>
</template>

<style scoped>
.file-input-container {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.file-input-label {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Hide the default file input */
#file-upload {
  display: none;
}

.file-btn {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-green, #4caf50);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.file-btn:hover {
  background-color: var(--primary-green-darken, #45a049);
}

.file-name {
  color: #ddd;
  font-size: 0.9rem;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
</style>
