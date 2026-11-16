import {defineConfig} from 'vite'

/**
 * Unlike the playground, this example uses the _built_ versions of
 * `@theatre/core` and `@theatre/studio` (run `yarn cli build` at the root of
 * the repo first), just like a project that installs them from npm.
 *
 * Since the two packages are linked from the monorepo rather than installed in
 * `node_modules`, and they're published as CommonJS, vite has to be told to
 * pre-bundle them.
 */
export default defineConfig({
  optimizeDeps: {
    include: ['@theatre/core', '@theatre/studio'],
  },
  build: {
    commonjsOptions: {
      include: [/theatre[\\/](core|studio)[\\/]dist/, /node_modules/],
    },
  },
})
