<template>
<div class="flex justify-center items-center h-screen mt-[-5%]">
  <div class="drop-document-container w-[45%] max-h-[50%]  text-center border-2 border-[#027BCE] rounded-[10px] p-[8%]" v-if="!uploaded">
    <div >
      <h1 class="text-[#000] mb-[16px]">Déposer un document</h1>
      <div class="drop-area py-[20px]"
           @dragover.prevent="handleDragOver"
           @drop.prevent="handleFileDrop">
        <p class="font-bold m-0">Faites glisser votre document ici</p>
        <span class="block my-[10px]">ou</span>
        <input type="file" id="fileInput" ref="fileInput" @change="handleFileSelect" style="display: none;" />
        <button type="button"
                class="browse-button bg-[#007BFF] text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]"
                @click="triggerFileInput">Parcourir vos fichiers
        </button>
      </div>
    </div>
  </div>

  <div class="drop-document-container w-[45%] max-h-[50%] flex flex-col justify-center items-center border-2 border-[#027BCE] rounded-[10px]  p-[2%]" v-else>
  <div class="flex-col justify-center items-center  w-2/3 h-2/3 p-[5%]">
    <div class="flex justify-center items-center">
      <DocumentCheckIcon class="w-1/2 h-1/2 text-gray-400"/>
    </div>
    <p class="text-[#000] mb-[12px] text-sm text-center" >{{ fileName }}</p>
    <h1 class="text-[#000] mb-[16px] text-center">Document déposé</h1>
  </div>

  <div class="flex w-full h-1/2 text-center justify-between p-[3%]">
    <div class="flex justify-center items-center relative w-1/3">
      <button type="button" class="browse-button bg-[#007BFF] text-white border-none rounded-[20px] px-[20px]  w-full py-[10px] text-[20px] cursor-pointer outline-none hover:bg-[#0056b3]" @click="triggerFileInput">Saisie Manuelle</button>
    </div>
    <div class="flex justify-center items-center  relative w-1/3">
      <button type="button" class="browse-button bg-[#007BFF] text-white -none rounded-[20px] px-[15px]  w-full py-[10px] text-[20px] cursor-pointer outline-none hover:bg-[#0056b3]" @click="triggerFileInput">Analyse Automatique</button>
    </div>
  </div>
</div>




</div>

  

  

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DocumentCheckIcon} from '@heroicons/vue/24/outline'
import axios from 'axios';


const fileUploaded = ref(DocumentCheckIcon);



const fileInput = ref<HTMLInputElement | null>(null);
const uploaded = ref(false); // Initialize the uploaded variable
const fileName = ref('');


function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleFileDrop(event: DragEvent) {
  if (event.dataTransfer?.files) {
    const file = event.dataTransfer.files[0];
    console.log("File dropped:", file.name);
    uploaded.value = true; // Set uploaded to true when a file is dropped
    fileName.value = file.name;
  }
}

function handleFileSelect(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    console.log("File selected:", files[0].name);
    uploaded.value = true; // Set uploaded to true when a file is selected
    fileName.value = files[0].name;

  }
}

function triggerFileInput() {
  fileInput.value?.click();
}


function postFile() {
  if (fileInput.value?.files) {
    const file = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post('https://example.com/upload', formData)
      .then(response => {
        // Handle the response
        console.log(response.data);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }
}
</script>
