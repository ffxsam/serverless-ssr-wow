import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const main = async (event: any) => {
  try {
    const messages = JSON.parse(event.body).messages;
    const completion = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL!,
      messages,
      max_tokens: 500,
    });
    const { message } = completion.data.choices[0];

    return {
      statusCode: 200,
      body: JSON.stringify(completion.data),
    };
  } catch (e: any) {
    if (e.response?.data) {
      console.error(e.response.data);
    } else {
      console.error(e);
    }

    if (event.body) {
      console.error('event body:', event.body);
    } else {
      console.error('event:', event);
    }

    throw e;
  }
};
