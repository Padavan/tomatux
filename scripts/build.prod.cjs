const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

(async function() {
  const buildFolder = path.resolve('dist');
  const publicFolder = path.resolve('public');

  /** @type {import('esbuild').BuildOptions} */
  var BUILD_OPTIONS = {
      bundle: true,
      logLevel: "info",
      entryPoints: ["src/index.jsx"],
      outfile: "dist/app.js",
      loader: { '.wav': 'file' },
      minify: true,
      treeShaking: true,
      format: 'esm',
      sourcemap: false,
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

