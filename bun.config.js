import path from 'path';
import fs from 'fs';

const config = {
  env: "inline",
  sourcemap: "external",
  entrypoints: ["app/frontend/application.js"],
  outdir: path.join(process.cwd(), "app/assets/builds"),
};

const build = async (config) => {
  const result = await Bun.build(config);

  if (!result.success) {
    if (process.argv.includes('--watch')) {
      console.error("Build failed");
      for (const message of result.logs) {
        console.error(message);
      }
      return;
    } else {
      throw new AggregateError(result.logs, "Build failed");
    }
  }
};

(async () => {
  await build(config);

  if (process.argv.includes('--watch')) {
    fs.watch(path.join(process.cwd(), "app/frontend"), { recursive: true }, (eventType, filename) => {
      console.log(`File changed: ${filename}. Rebuilding...`);
      build(config);
    });
  } else {
    process.exit(0);
  }
})();
