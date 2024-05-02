<template>
<div class="flex-col  w-5/6 mx-auto h-4/5 ">
    <div class="  h-1/6 content-center">
        <div class="">
            <p class="inline-block font-bold text-2xl">Document:</p>
            <p class="inline-block text-xl indent-2">{{titreFichier}}</p>
        </div>
        <div v-if=isVisible>
            <p class="inline-block font-semibold text-lg">Ajouté par:</p>
            <p class="inline-block text-lg indent-2 ">{{ajoutePar}}</p>
        </div>
        
        
    
    </div>
    <div class=" flex-col h-4/5 space-y-2">
        <div class="flex-none lg:h-1/9 "> 
            <p class="text-2xl" >Description</p>
        </div>
        <div class="relative h-full border-2 border-black rounded-md">
            <textarea class="border text-lg relative h-full w-full text-justify resize-none"></textarea>
        </div>
    </div>
</div>




</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        titreFichier: {
            type: String,
            default: ''
        },
        ajoutePar: {
            type: String,
            default: ''
        }
    }
    
}


</script>

