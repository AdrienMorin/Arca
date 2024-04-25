<template>
  <div class="w-screen h-screen pt-8">
    <div class="w-full">
      <div class="text-center mb-4">
        <h1 class="text-3xl font-bold">Recherche intelligente</h1>
      </div>
      <div class="relative mb-8 w-3/4 mx-auto">
        <input type="text" class="form-input w-full pr-10" placeholder="Rentre ce que vous voulez">
        <button class="absolute right-0 top-0 mt-2 mr-2 text-xl">🔍</button>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-4 text-center">Recherche avancée</h2>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
          <div>
            <label class="block mb-2">Date</label>
            <input type="text" class="form-input flex-1" placeholder="Rentre une date">
          </div>
          <div>
            <label class="block mb-2">Type de document</label>
            <select class="form-select w-full">
              <option>Choisir le type de document</option>
            </select>
          </div>
          <div>
            <label class="block mb-2">Lieu</label>
            <input type="text" class="form-input" placeholder="Rentre un lieu">
          </div>
          <div>
            <label class="block mb-2">Personne</label>
            <input type="text" class="form-input flex-1" placeholder="Rentre une personne">
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="bg-[#007BFF] text-white border-none rounded-[20px] px-[20px] py-[10px] text-[16px] cursor-pointer outline-none hover:bg-[#0056b3]">Lancer la recherche</button>
        </div>
      </div>
    </div>
  </div>
</template>