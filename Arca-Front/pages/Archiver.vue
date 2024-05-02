<template>
<div class="flex justify-center items-center h-screen mt-[-5%]">
  <div class="drop-document-container w-[45%] max-h-[60%]  text-center border-2 border-[#027BCE] rounded-[10px] p-[8%]">
    <h1 class="text-[#000] mb-[16px]">Déposer un document</h1>
    <div class="drop-area py-[20px]"
         @dragover.prevent="handleDragOver"
         @drop.prevent="handleFileDrop">
      <p class="font-bold m-0">Faites glisser votre document ici</p>
      <span class="block my-[10px]">ou</span>
      <input type="file" id="fileInput" ref="fileInput" @change="handleFileSelect" style="display: none;" />
      <button type="button"
              class="browse-button bg-[#007BFF] text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]"
              @click="triggerFileInput">Parcourir vos fichiers</button>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">

  import { ref } from 'vue';

  const fileInput = ref<HTMLInputElement | null>(null);

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleFileDrop(event: DragEvent) {
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      console.log("File dropped:", file.name);
    }
  }

  function handleFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      console.log("File selected:", files[0].name);
    }
  }

  function triggerFileInput() {
    fileInput.value?.click();
  }


</script>