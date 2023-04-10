import { defineConfig } from "astro/config";
import aws from "astro-sst/lambda";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [tailwind(), vue()],
});
