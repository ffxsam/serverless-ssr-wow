<script setup lang="ts"></script>

<template>
  <div>
    <label class="block text-sm font-medium leading-6 text-gray-900">
      Search breweries:
    </label>
    <div class="flex items-center">
      <div class="relative rounded-md shadow-sm">
        <input
          type="text"
          class="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search by city"
        />
      </div>
      <div class="ml-2">
        <button
          class="search-button text-white py-1 px-4 rounded"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-button {
  background-color: #ca8a03;
}
</style>