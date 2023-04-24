# Serverless SSR Wow!

This is an example mini project demonstrating the amazingness that is [Astro](https://astro.build) + [SST](https://sst.dev).

## Setup Instructions
1. Clone this repo.
1. Run `pnpm i` (Don't have pnpm? [Install it!](https://pnpm.io/installation))
1. Run `pnpm sst:dev` and give it a few minutes to deploy. When it completes, you should see something like "Deployed" followed by `beerGptApiUrl: https://xx.lambda-url.us-east-1.on.aws`.
1. Kill the SST process.
1. Copy `.env.dev.local.dist` to `.env.dev.local` and drop your OpenAI API key in there as well as the API URL provided in the SST deployment output (that's `PUBLIC_BEER_GPT_API_URL`). If you don't have access to the GPT-4 model yet, change that as well.
1. Run `pnpm sst:dev` again.
1. Run `pnpm dev` in another tab/window (this is for the Astro site).
1. Go to `http://localhost:3000` and have fun!
