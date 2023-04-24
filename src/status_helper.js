import core from '@actions/core'


function getInput(name, defaultValue = undefined) {
    const value = core.getInput(name)
    return value === '' ? defaultValue : value
}

function getEnv(name, defaultValue = undefined) {
    const value = process.env[name]
    return value ?? defaultValue
}

function loadDotenv(filename='.env') {
    const dotenv = require('dotenv')
    const envConfig = dotenv.config({ path: filename }).parsed

    for (const k in envConfig) {
        process.env[k] = envConfig[k]
    }
};

loadDotenv()


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