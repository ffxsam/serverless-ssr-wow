<script setup lang="ts">
import { ref } from 'vue';
import BButton from './BButton.vue';
import TypingIndicator from './TypingIndicator.vue';
import { useChatGpt, type ChatMessage } from '../composables/chat-gpt';
import { systemMessage } from '../constants';

const {
  addUserMessage,
  convoStarted,
  onlyChatMessages,
  resetConvo,
  sendMessages,
} = useChatGpt({
  system: systemMessage,
});

const chatVisible = ref(false);
const userInput = ref('');
const totalCost = ref(0);
const tokenCount = ref(0);
const thinking = ref(false);

function toPrice(cost: number) {
  return `$${cost.toFixed(3)}`;
}

function endConvo() {
  resetConvo();
  totalCost.value = 0;
  tokenCount.value = 0;
}

function isThinking(message: ChatMessage) {
  return (
    message.role === 'assistant' && message.content === '...' && thinking.value
  );
}

function toggleChat() {
  chatVisible.value = !chatVisible.value;

  // Clear BeerGPT's memory when the chat is closed
  if (!chatVisible.value) {
    endConvo();
  }
}

async function sendMessage() {
  addUserMessage(userInput.value);

  thinking.value = true;
  userInput.value = '';

  const response = await sendMessages();

  totalCost.value +=
    (response.usage.prompt_tokens / 1000) * 0.03 +
    (response.usage.completion_tokens / 1000) * 0.06;
  tokenCount.value += response.usage.total_tokens;

  thinking.value = false;
}
</script>

<template>
  <div>
    <Transition>
      <div v-if="chatVisible && convoStarted" class="bg-white rounded-lg p-4">
        <TransitionGroup name="chat">
          <div v-for="(message, index) in onlyChatMessages" :key="index">
            <div v-if="message.role === 'system'" class="text-gray-500">
              {{ message.content }}
            </div>
            <div v-else class="mt-4 flex">
              <div class="flex-shrink-0 adjust">
                <div v-if="message.role === 'user'" class="text-3xl">🍺🥴</div>
                <div v-else class="text-3xl">🍺🤖</div>
              </div>
              <div class="ml-3">
                <div v-if="message.name" class="font-medium">
                  {{ message.name }}
                </div>
                <div class="text-gray-700">
                  <TypingIndicator v-if="isThinking(message)" />
                  <div v-else v-html="message.content" />
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Transition>
    <div class="mt-4">
      <template v-if="chatVisible">
        <div>
          <textarea
            class="rounded-lg p-2 outline-none w-full"
            v-model="userInput"
            cols="60"
            rows="2"
            placeholder="Ask BeerGPT anything related to beer!"
            data-gramm="false"
            @keydown.prevent.enter="sendMessage"
          >
          </textarea>
        </div>
        <div>
          Cost of this conversation: {{ toPrice(totalCost) }} ({{ tokenCount }}
          tokens)
        </div>
        <BButton class="mt-2 mr-2" :disabled="thinking" @click="sendMessage"
          >Send</BButton
        >
      </template>
      <BButton :disabled="thinking" @click="toggleChat">
        {{ chatVisible ? 'End chat' : 'Chat with BeerGPT' }}
      </BButton>
    </div>
  </div>
</template>

<style>
.adjust {
  position: relative;
  top: -6px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.chat-enter-active,
.chat-leave-active {
  transition: all 0.5s ease;
}
.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
