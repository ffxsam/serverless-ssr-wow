import type { SSTConfig } from 'sst';
import { AstroSite, Function } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'astro-sst',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new AstroSite(stack, 'site', {
        environment: {
          API_URL: process.env.API_URL!,
        },
      });
      const beerGptFunc = new Function(stack, 'BeerGPT', {
        handler: 'src/lambda/beer-gpt.main',
        memorySize: 1024,
        timeout: 60,
        environment: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
          OPENAI_MODEL: process.env.OPENAI_MODEL!,
        },
        url: true,
      });

      stack.addOutputs({
        beerGptApiUrl: beerGptFunc.url,
      });
    });
  },
} satisfies SSTConfig;
