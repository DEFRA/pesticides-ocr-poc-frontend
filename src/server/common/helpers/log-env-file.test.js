import { vi } from 'vitest'

const mockReadFileSync = vi.fn()

vi.mock('node:fs', async () => {
  const nodeFs = await import('node:fs')
  return {
    ...nodeFs,
    readFileSync: (...args) => mockReadFileSync(...args)
  }
})

const { logEnvFile } = await import('./log-env-file.js')

describe('#logEnvFile', () => {
  let logger

  beforeEach(() => {
    mockReadFileSync.mockReset()
    logger = { info: vi.fn() }
  })

  test('should log only the overridden variable names, never their values', () => {
    mockReadFileSync.mockReturnValue(
      'BACKEND_URL=http://x\nENTRA_CLIENT_SECRET=super-secret'
    )

    logEnvFile(logger)

    expect(logger.info).toHaveBeenCalledWith(
      { overriddenKeys: ['BACKEND_URL', 'ENTRA_CLIENT_SECRET'] },
      'Overridden environment variables'
    )
    // The secret value must never reach the logs.
    expect(JSON.stringify(logger.info.mock.calls)).not.toContain('super-secret')
  })

  test('should note when the .env file is empty', () => {
    mockReadFileSync.mockReturnValue('')

    logEnvFile(logger)

    expect(logger.info).toHaveBeenCalledWith('No env overrides found')
  })

  test('should note when there is no .env file', () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error('ENOENT')
    })

    logEnvFile(logger)

    expect(logger.info).toHaveBeenCalledWith('No .env file found')
  })
})
