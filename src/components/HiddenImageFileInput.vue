<template>
  <div class="image-upload-wrapper" @click="triggerFileInput">
    <img
      v-if="selectedFile"
      :src="selectedFile"
      alt="Uploaded image"
      class="uploaded-image"
    />
    <div v-else class="card-placeholder">
      <p>{{ placeholderText }}</p>
    </div>
    <input
      type="file"
      ref="fileInput"
      @change="onFileChange"
      accept="image/*"
      style="display: none;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, type Ref } from 'vue';

const props = defineProps<{
  placeholderText?: string;
}>();

const selectedFile: Ref<string | null> = defineModel() as Ref<string | null>;

const fileInput = ref<HTMLInputElement | null>(null);

// watch(() => props.modelValue, (val) => {
//   imageSrc.value = val;
// });

function triggerFileInput() {
  fileInput.value?.click();
}

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

<style scoped>
.image-upload-wrapper {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.card-placeholder {
  width: 100%;
  padding-top: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  color: #555;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  position: relative;
}

.card-placeholder p {
  position: absolute; 
  top: 10%; 
  white-space: nowrap;      
  font-size: xx-large;
  background-color: #ddd;
}
</style>
