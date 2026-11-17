// @cspotcode/zx is zx in CommonJS
import {$, cd, path, ProcessPromise} from '@cspotcode/zx'
import {testServerAndPage} from '../../utils/testUtils'

const PATH_TO_PACKAGE = path.join(__dirname, `./package`)

/**
 * Next 14 is the last major version of Next whose supported version of React
 * is 18, which is what `@theatre/r3f` (through `@react-three/fiber` v8) works
 * with.
 */
describe(`next 14`, () => {
  describe(`build`, () => {
    test(`command runs without error`, async () => {
      cd(PATH_TO_PACKAGE)
      const {exitCode} = await $`npm run build`
      // at this point, the build should have succeeded
      expect(exitCode).toEqual(0)
    })

    describe(`next start`, () => {
      testServerAndPage({
        startServerOnPort: (port: number) => {
          cd(PATH_TO_PACKAGE)

          return $`npm run start -- --port ${port}`
        },

        // next prints "✓ Ready in 123ms" once the server is listening
        checkServerStdoutToSeeIfItsReady: (chunk) => chunk.includes('Ready in'),
      })
    })
  })

  describe(`$ next dev`, () => {
    testServerAndPage({
      startServerOnPort: (port: number) => {
        cd(PATH_TO_PACKAGE)

        return $`npm run dev -- --port ${port}`
      },
      // next prints "✓ Ready in 1.2s" once the server is listening. It only
      // compiles the page when it's first requested.
      checkServerStdoutToSeeIfItsReady: (chunk) => chunk.includes('Ready in'),
    })
  })
})
