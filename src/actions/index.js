import { SIGN_IN, SIGN_OUT } from './types'

export function signIn (id) {
    return {
        type: SIGN_IN,
        id,
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}