<template>
  <div class="flex gap-2">
    <button 
      class="bg-violet-600 hover:bg-violet-800 rounded-md font-bold py-2 px-4 my-3 transition duration-200 text-sm" 
      @click="$router.push('/admin/add')"
    >
      Games toevoegen
    </button>
    <button 
      class="bg-violet-600 hover:bg-violet-800 rounded-md font-bold py-2 px-4 my-3 transition duration-200 text-sm" 
      @click="$router.push('/admin/manage')"
    >
      Games beheren
    </button>
  </div>
</template>