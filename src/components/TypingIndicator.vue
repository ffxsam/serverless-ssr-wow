<template>
  <div class="ellipsis-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<style scoped>
.ellipsis-container {
  display: flex;
  justify-content: space-between;
  width: 30px;
  height: 1rem;
  padding-top: 0.5rem;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #333;
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}
</style>
