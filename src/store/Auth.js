import { makeAutoObservable, configure } from "mobx";
import firebase from "firebase/app";
import 'firebase/database'
import bcrypt from 'bcryptjs'

configure({
    enforceActions: "never",
})

class Auth {
    token = localStorage.getItem('auth')
    isAuth = !!this.token
    isFetching = false
    error = false

    async signUp(payload) {
        try {
            this.isFetching = true
            this.error = false
            const isUserExist = await firebase.database().ref('users/' + payload.email).get()
            if (isUserExist.val()) {
                this.isFetching = false
                return this.error = "The user is already exist!"
            }
            let password = await bcrypt.hash(payload.password, 8)
            await firebase.database().ref('users/' + payload.email).set({ ...payload, password })
            this._auth(payload.email)
        }
        catch (e) {
            this.isFetching = false
            this.error = e.toString()
        }
    }

    async signIn(payload) {
        try {
            this.isFetching = true
            this.error = false
            const user = await firebase.database().ref('users/' + payload.email).get()
            const isMatch = await bcrypt.compare(payload.password, user.val()?.password || '')

            if (!user.val() || !isMatch) {
                this.isFetching = false
                return this.error = "Wrong password or email"
            }

            this._auth(payload.email)
        }
        catch (e) {
            this.isFetching = false
            this.error = e.toString()
        }
    }

    _auth(email) {
        localStorage.setItem('auth', email)
        this.isAuth = true
        this.token = email
        this.isFetching = false
    }

    logout = () => {
        localStorage.removeItem('auth')
        this.isAuth = false
        this.token = null
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Auth()