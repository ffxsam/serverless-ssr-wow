<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import BButton from './BButton.vue';
import TypingIndicator from './TypingIndicator.vue';

interface ChatMessage {
  /** The role of the author of this message. */
  role: 'system' | 'user' | 'assistant';
  /** The contents of the message. */
  content: string;
  /**
   * The name of the author of this message. May contain a-z, A-Z, 0-9, and
   * underscores, with a maximum length of 64 characters.
   */
  name?: string;
}

interface GPTResponse {
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: ChatMessage;
  }[];
}

const systemMessage: ChatMessage = {
  role: 'system',
  content: `
    You are BeerGPT, a helpful assistant who specializes in beer and the science
    behind brewing beer. If the user asks about topics other than beer, politely
    steer them back on the topic of beer. Limit your responses to no more than
    four sentences. Speak in the voice of Jimmy Fallon.
  `,
};
const chatVisible = ref(false);
const userInput = ref('');
const totalCost = ref(0);
const tokenCount = ref(0);
const thinking = ref(false);
const messages = ref<ChatMessage[]>([systemMessage]);

const onlyChatMessages = computed(() =>
  messages.value.filter((message) => message.role !== 'system')
);
const convoStarted = computed(() => messages.value.length > 1);

function toPrice(cost: number) {
  return `$${cost.toFixed(3)}`;
}

function endConvo() {
  messages.value = [systemMessage];
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
  messages.value.push({
    role: 'user',
    content: userInput.value,
  });

  window.setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: '...',
    });
  }, 1500);

  thinking.value = true;
  userInput.value = '';

  const response = await axios.post<GPTResponse>(
    'https://3yhnp46ipi.execute-api.us-east-1.amazonaws.com/beer-gpt',
    {
      messages: messages.value,
    }
  );

  messages.value.at(-1)!.content = response.data.choices[0].message.content;
  totalCost.value +=
    (response.data.usage.prompt_tokens / 1000) * 0.03 +
    (response.data.usage.completion_tokens / 1000) * 0.06;
  tokenCount.value += response.data.usage.total_tokens;

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
                  <template v-else>{{ message.content }}</template>
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
            class="rounded-lg p-2 outline-none"
            v-model="userInput"
            cols="60"
            rows="4"
            placeholder="Ask BeerGPT anything related to beer!"
            @keydown.meta.enter="sendMessage"
            @keydown.ctrl.enter="sendMessage"
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
