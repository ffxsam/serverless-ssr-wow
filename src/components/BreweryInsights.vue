<script setup lang="ts">
import { ref } from 'vue';
import BButton from './BButton.vue';
import TypingIndicator from './TypingIndicator.vue';
import { useChatGpt } from '../composables/chat-gpt';
import { systemMessage } from '../constants';
import type { Brewery } from '../types';
import { newlinesToHtmlBreaks } from '../utils/newlines-to-html-breaks';

const props = defineProps<{
  brewery: Brewery;
}>();

const { addUserMessage, sendMessages } = useChatGpt({ system: systemMessage });

const asking = ref(false);
const assistantResponse = ref('');

async function getInsights() {
  asking.value = true;
  addUserMessage(
    'Tell me everything you know about this brewery:\n\n + ' +
      props.brewery.name +
      '\n\n' +
      `Brewery type: ${props.brewery.brewery_type}\n` +
      `Address: ${props.brewery.street}, ${props.brewery.city}, ${props.brewery.state}\n` +
      `URL: ${props.brewery.website_url}\n`
  );
  const response = await sendMessages();

  assistantResponse.value = newlinesToHtmlBreaks(
    response.choices[0].message.content
  );
}
</script>

<template>
  <div>
    <BButton v-if="!asking && !assistantResponse" @click="getInsights">
      Tell me about this brewery
    </BButton>
    <TypingIndicator v-else-if="asking && !assistantResponse" />
    <div v-else v-html="assistantResponse" class="assistant-response" />
  </div>
</template>

<style scoped>
.assistant-response {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
