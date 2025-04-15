const esbuild =  require('esbuild');
const fs =  require('node:fs');
const path =  require('node:path');

(async function() {
  const buildFolder = path.resolve('www');
  const publicFolder = path.resolve('public');

  /** @type {import('esbuild').BuildOptions} */
  var BUILD_OPTIONS = {
    bundle: true,
    logLevel: "info",
    entryPoints: ["src/index.jsx"],
    outfile: "www/app.js",
    minify: false,
    treeShaking: true,
    format: 'esm',
    sourcemap: true,
    loader: { '.wav': 'file' },
  };

  /** @type {import('esbuild').ServeOptions} */
  var SERVICE_OPTIONS = {
    servedir: 'www',
    fallback: "www/index.html",
    host: "127.0.0.1",
    port: 3000,
  }

  console.log("[build.dev] Checking temporary server folder");
  if (!fs.existsSync(buildFolder)) {
    await fs.promises.mkdir(buildFolder);
  }

  console.log("[build.dev] Copy public artefacts");
  fs.cpSync(publicFolder, buildFolder, { recursive: true });

  console.log("[build.dev] Running esbuild");
  let ctx = await esbuild.context(BUILD_OPTIONS)
  await ctx.watch()
  await ctx.serve(SERVICE_OPTIONS)
})();

