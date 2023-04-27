import { ref, computed } from 'vue';
import axios from 'axios';
import { newlinesToHtmlBreaks } from '../utils/newlines-to-html-breaks';

export interface ChatMessage {
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

interface UseChatGptOptions {
  /** System instructions */
  system: string;
}

const messages = ref<ChatMessage[]>([]);

export function useChatGpt(
  { system }: UseChatGptOptions = { system: 'You are a helpful assistant.' }
) {
  messages.value.push({ role: 'system', content: system });

  const convoStarted = computed(() => messages.value.length > 1);
  const onlyChatMessages = computed(() =>
    messages.value.filter((message) => message.role !== 'system')
  );

  function addAssistantMessage(content: string) {
    messages.value.push({ role: 'assistant', content });
  }

  function addUserMessage(content: string) {
    messages.value.push({ role: 'user', content });
  }

  function resetConvo() {
    messages.value = [{ role: 'system', content: system }];
  }

  async function sendMessages() {
    window.setTimeout(() => {
      messages.value.push({ role: 'assistant', content: '...' });
    }, 1500);

    const response = await axios.post<GPTResponse>(
      import.meta.env.PUBLIC_BEER_GPT_API_URL + '/beer-gpt',
      {
        messages: messages.value,
      }
    );

    messages.value.at(-1)!.content = newlinesToHtmlBreaks(
      response.data.choices[0].message.content
    );

    return response.data;
  }

  return {
    addAssistantMessage,
    addUserMessage,
    convoStarted,
    onlyChatMessages,
    resetConvo,
    sendMessages,
  };
}
