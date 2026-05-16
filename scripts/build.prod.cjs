const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

(async function() {
  const buildFolder = path.resolve('dist');
  const publicFolder = path.resolve('public');

  /** @type {import('esbuild').BuildOptions} */
  const BUILD_OPTIONS = {
    bundle: true,
    entryPoints: ["src/index.js"],
    format: 'esm',
    loader: { '.wav': 'file' },
    logLevel: "info",
    minify: true,
    outfile: "dist/app.js",
    sourcemap: false,
    treeShaking: true,
    define: {
      'process.env.NODE_ENV': '"production"',
    }
  };


  console.log("buildFolder", buildFolder);

  console.log("[build.prod] Cleaning build folder");
  if (fs.existsSync(buildFolder)) {
    fs.rmSync(buildFolder, { recursive: true });
  }

  console.log("[build.prod] Create build folder");
  fs.mkdirSync(buildFolder);

  console.log("[build.prod] Copy public artefacts");
  fs.cpSync(publicFolder, buildFolder, { recursive: true });

  console.log("[build.prod] Running esbuild");
  await esbuild.build(BUILD_OPTIONS);
  console.log("[build.prod] Finished")
})();

