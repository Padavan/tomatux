const esbuild = require('esbuild');
const fsp = require('fs').promises;
const path = require('path');

async function build() {
  const buildFolder = path.join(__dirname, 'dist');
  if (!fs.existsSync(buildFolder)) {
    await fs.promises.mkdir(buildFolder);
  }

  fsp.cp(
    path.join(__dirname, 'public'),
    buildFolder,
    { recursive: true }
  );

  await esbuild.build({
    bundle: true,
    logLevel: "info",
    entryPoints: ["src/index.tsx"],
    outfile: "dist/app.js",
    loader: { '.wav': 'file' },
    minify: true,
    format: 'esm',
    sourcemap: false,
  })
}

build();