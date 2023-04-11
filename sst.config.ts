import type { SSTConfig } from 'sst';
import { AstroSite } from 'sst/constructs';

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
        }
      });

      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
