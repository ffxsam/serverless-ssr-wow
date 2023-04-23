import type { SSTConfig } from 'sst';
import { AstroSite, Api } from 'sst/constructs';

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
      const api = new Api(stack, 'gpt', {
        routes: {
          'POST /beer-gpt': {
            function: {
              handler: 'src/lambda/beer-gpt.main',
              memorySize: 1024,
              timeout: 30,
              environment: {
                OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
              }
            }
          },
        },
      });

      stack.addOutputs({
        apiUrl: api.url,
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
