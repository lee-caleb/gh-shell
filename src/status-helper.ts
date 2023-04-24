import * as core from '@actions/core'
import { count } from 'console'

/**
 * 指示POST操作是否正在运行
 */
export const IsPost = !!core.getState('isPost')

/**
 * POST操作的存储库路径。该值在MAIN操作期间为空。
 */
export const RepositoryPath = core.getState('repositoryPath')

/**
 * POST操作的set-safe目录。如果在MAIN操作中设置了“safe-directory”，则设置该值。
 */
export const PostSetSafeDirectory = core.getState('setSafeDirectory') === 'true'

/**
 * POST操作的SSH密钥路径。该值在MAIN操作期间为空。
 */
export const SshKeyPath = core.getState('sshKeyPath')

/**
 * POST操作的SSH已知主机路径。该值在MAIN操作期间为空。
 */
export const SshKnownHostsPath = core.getState('sshKnownHostsPath')

/**
 * 保存存储库路径，以便POST操作可以检索该值。
 */
export function setRepositoryPath(repositoryPath: string): void {
    core.saveState('repositoryPath', repositoryPath)
}

/**
 * 保存SSH密钥路径，以便POST操作可以检索该值。
 */
export function setSshKeyPath(sshKeyPath: string): void {
    core.saveState('sshKeyPath', sshKeyPath)
}

/**
 * 保存SSH已知主机路径，以便POST操作可以检索该值。
 */
export function setSshKnownHostsPath(sshKnownHostsPath: string): void {
    core.saveState('sshKnownHostsPath', sshKnownHostsPath)
}

/**
 * 保存set-safe目录输入，以便POST操作可以检索该值。
 */
export function setSafeDirectory(): void {
    core.saveState('setSafeDirectory', 'true')
}

// 发布一个变量，以便在POST操作运行时，它可以确定应该运行清理逻辑。
// 这是必要的，因为我们没有单独的入口点。
if (!IsPost) {
    core.saveState('isPost', 'true')
}

function getInput(name: string, defaultValue?: string ): string | undefined | null {
    const value = core.getInput(name)
    return value === '' ? defaultValue : value
}

function getEnv(name: string, defaultValue?: string ): string | undefined | null {
    const value = process.env[name]
    return value ?? defaultValue
}


export const inputName = {
    jumpserver: {
        host: getInput('jumpserver-host') ?? getEnv('JUMPSERVER_HOST'),
        ptoken: getInput('jumpserver-ptoken') ?? getEnv('JUMPSERVER_PTOKEN'),
    },

    shell: {
        username: getInput('shell-username') ?? getEnv('SHELL_USERNAME', 'runner'),
        password: getInput('shell-password') ?? getEnv('SHELL_PASSWORD'),
    },

    tailscal: {
        hostname: getInput('tailscal-hostname') ?? getEnv('HOSTNAME'),
        authKey: getInput('tailscal-auth-key') ?? getEnv('TAILSCALE_AUTH_KEY'),
    }
}
