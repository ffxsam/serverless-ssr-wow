<script setup lang="ts">
console.log(import.meta.env.API_URL);
</script>

<template>
  <div>
    <div class="container mx-auto px-4 py-8">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr class="text-gray-600 text-left bg-gray-200">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Phone</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr class="border-b border-gray-200">
            <td class="px-4 py-3">1</td>
            <td class="px-4 py-3">John Doe</td>
            <td class="px-4 py-3">john.doe@example.com</td>
            <td class="px-4 py-3">+1 (123) 456-7890</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="px-4 py-3">2</td>
            <td class="px-4 py-3">Jane Smith</td>
            <td class="px-4 py-3">jane.smith@example.com</td>
            <td class="px-4 py-3">+1 (234) 567-8910</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="px-4 py-3">3</td>
            <td class="px-4 py-3">Mark Johnson</td>
            <td class="px-4 py-3">mark.johnson@example.com</td>
            <td class="px-4 py-3">+1 (345) 678-9120</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
