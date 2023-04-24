import * as core from '@actions/core'
import * as exec from '@actions/exec'
import got from 'got'
import { inputName } from './status-helper'

const headers = {
    Authorization: `Token ${inputName.jumpserver.ptoken}`,
    'X-JMS-ORG': '00000000-0000-0000-0000-000000000002',
    'Content-Type': 'application/json',
}


export function register(): void| undefined {
    // 注册至 jumpserver
    let data = {
        "platform": {
            "pk": 1
        },
        "nodes": [
            {
                "pk": "84327184-bd01-4a78-9765-b3748a7ec94d"
            }
        ],
        "protocols": [
            {
                "name": "ssh",
                "port": 22,
                "primary": true,
                "default": false,
                "required": false,
                "secret_types": [
                    "password",
                    "ssh_key"
                ],
                "setting": {
                    "console": false,
                    "security": "any",
                    "sftp_enabled": true,
                    "sftp_home": "/tmp",
                    "autofill": "basic",
                    "username_selector": "",
                    "password_selector": "",
                    "submit_selector": "",
                    "script": [],
                    "auth_username": false
                }
            }
        ],
        "labels": [],
        "is_active": true,
        "name": inputName.tailscal.hostname,
        "address": process.env.HOSTNAME,
        "accounts": [
            {
                "privileged": true,
                "secret_type": "password",
                "push_now": false,
                "is_active": true,
                "name": inputName.shell.username,
                "username": inputName.shell.username,
                "secret": inputName.shell.password,
            }
        ],
        "domain": ""
    }
    try {
        let result = got.post(`${inputName.jumpserver.host}/api/v1/assets/`, { headers: headers, body: JSON.stringify(data)}).json()
        console.log(result)
    } catch (error: any) {
        core.error('HTTP Status Core', error.response.statusCode)
        core.error('Body', error.response.body)
        throw new Error(error)
    }
}

export function unregister(): void {
    // 移除 jumpserver
    try {
        let result = got.delete(`${inputName.jumpserver.host}/api/v1/assets/${inputName.tailscal.hostname}/`, { headers: headers}).json()
        console.log(result)
    } catch (error: any) {
        core.error('HTTP Status Core', error.response.statusCode)
        core.error('Body', error.response.body)
        throw new Error(error)
    }
}
