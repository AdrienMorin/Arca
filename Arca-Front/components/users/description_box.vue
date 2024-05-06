<template>
<div class="flex-col flex h-full " v-if=isVisible>
    <div class="flex-col h-4/5 space-y-1">
        <div class="flex-none lg:h-1/9"> 
            <p class="text-2xl">{{titre}}</p>
        </div>
        <div class="flex-grow h-4/5  rounded-md">
            <textarea v-model="description" class="border text-lg relative w-full h-full text-justify resize-none"></textarea>
        </div>
    </div>
    

    <div class="flex-none  h-1/5 content-center">
        <div>
            <p class="inline-block font-semibold text-lg">Ajouté par:</p>
            <p class="inline-block text-lg indent-2 ">{{ajoutePar}}</p>
        </div>    
        <div>
            <p class="inline-block font-semibold text-lg">Modifié à:</p>
            <p class="inline-block text-lg indent-2 ">{{dateModif}}</p>
        </div>  
    </div>
</div>

<div class="flex-col  w-5/6 mx-auto h-4/5 h-full " v-else>
        <div class=" flex-col h-4/5 space-y-2">
        <div class="flex-none lg:h-1/9 "> 
            <p class="text-2xl" >{{titre}}</p>
        </div>
        <div class="relative h-full border-2 border-black rounded-md">
            <textarea v-model="description" class="border text-lg relative h-full w-full text-justify resize-none"></textarea>
        </div>
    </div>
</div>





</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
          required: false,
          default: false,
        },  
        ajoutePar: {
            type: String,
            default: ''
        },
        dateModif:{
            type: String,
            default: ''
        },
        titre:{
            type: String,
            default: ''
        },
        content:{
            type: String,
            default: ''
        }
    },
    data(){
        return {
            description: this.content,
        }
    },
    method: {
        getDescription(){
        
            return this.description;
        },
        setDescription(description){
            this.description = description;
        },
    }
    
}


</script>

