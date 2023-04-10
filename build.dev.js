const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function run() {
  const buildFolder = path.join(__dirname, 'www');
  if (!fs.existsSync(buildFolder)) {
    await fs.promises.mkdir(buildFolder);
  }

  fs.promises.cp(
    path.join(__dirname, 'public'),
    buildFolder,
    { recursive: true }
  );

  let ctx = await esbuild.context({
    bundle: true,
    logLevel: "info",
    entryPoints: ["src/index.tsx"],
    outfile: "www/app.js",
    loader: { '.wav': 'file' },
    minify: false,
    format: 'esm',
    sourcemap: true,
  })

  await ctx.watch()

  let { host, port } = await ctx.serve({
    servedir: 'www',
  })
}

run();

// TODO tsc --noEmit in parallel