<template>

<div class="h-screen overflow-hidden">

        <Popup v-if="mainshow"
          ref="popupConfirmation"
          :title="'Annuler Modifications'"
          :description1="'Etes-vous sûr de vouloir annuler l`ajout du document suivant'"
          :titreDoc="titreDoc"
          :annuler="true" />

<div class="flex justify-center items-center h-screen mt-[-5%]">
  <div class="drop-document-container w-[45%] max-h-[50%]  text-center border-2 border-[#027BCE] rounded-[10px] p-[8%]" v-if="!uploaded">
    <div >
      <h1 class="text-[#000] mb-[16px]">Déposer un document</h1>
      <div class="drop-area py-[20px]"
           @dragover.prevent="handleDragOver()"
           @drop.prevent="handleFileDrop()">
        <p class="font-bold m-0">Faites glisser votre document ici</p>
        <span class="block my-[10px]">ou</span>
        <input type="file" id="fileInput" ref="fileInput" @change="handleFileSelect" style="display: none;" />
        <button type="button"
                class="browse-button bg-[#007BFF] text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]"
                @click="triggerFileInput()">Parcourir vos fichiers
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
</div>
  <div class="flex w-full h-1/2 text-center justify-between p-[3%]">
    <div class="flex justify-center items-center relative w-1/3">
      <button type="button" class="browse-button bg-[#007BFF] text-white border-none rounded-[20px] px-[20px]  w-full py-[10px] text-[20px] cursor-pointer outline-none hover:bg-[#0056b3]" @click="fileTransfer()">Saisie Manuelle</button>
    </div>
    <div class="flex justify-center items-center  relative w-1/3">
      <button type="button" class="browse-button bg-[#007BFF] text-white -none rounded-[20px] px-[15px]  w-full py-[10px] text-[20px] cursor-pointer outline-none hover:bg-[#0056b3]" @click="aiFileTransfer()">Analyse Automatique</button>
    </div>
  </div>
</div>




</div>


  

  

</template>

<script>
import { ref } from 'vue';
import { DocumentCheckIcon } from '@heroicons/vue/24/outline';
import axios from 'axios';
import { useFileStore } from '~/fileTransfer';
import UserController from '~/services/userController.ts';
import Popup from '~/components/users/popup.vue';

definePageMeta({
  middleware:'auth',
});
export default {
  components: {
    DocumentCheckIcon,
    Popup,
  },

  data() {
    return {
      uploaded: false,
      mainshow: false,
      fileName: '',
      file: null,
      showModal: false,
    };
  },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      handleDragOver(event){
      event.preventDefault();
      },

      handleFileDrop(event){
      if (event.dataTransfer?.files) {
        this.file = event.dataTransfer.files[0];
        console.log("File dropped:", file.name);
        this.uploaded= true; // Set uploaded to true when a file is dropped
        this.fileName= file.name;
        }
      },

      handleFileSelect(event){
        const files = event.target.files;
        if (files) {
          console.log("File selected:", `${files[0].webkitRelativePath}`);
          this.uploaded= true; // Set uploaded to true when a file is selected
          this.fileName= files[0].name;
          this.file=files[0];
        }
      },

      triggerFileInput(){
        this.$refs.fileInput.click();
      },

      async aiFileTransfer(){
        console.log('File transfer initiated...');
        const tokenCookie = useCookie('token')
        const token= tokenCookie.value;
        const response = await UserController.getInstance().uploadAiDocument(token,this.file);

        if (response.status === 200) {
          console.log('Document uploaded successfully');
          window.alert('Le téléchargement du document a réussi');
        }else{
          console.log('Document upload failed');
          window.alert('Le téléchargement du document a échoué, veuillez réessayer dans quelques minutes');
        }
        

        
      },

      fileTransfer(){
        console.log('File transfer initiated...');
        const fileStore = useFileStore();
        fileStore.setFile(this.file);
        const test=fileStore.file;
        console.log(test.name);
        this.$router.push('/ajout-document');
      }
    }
};
</script>

