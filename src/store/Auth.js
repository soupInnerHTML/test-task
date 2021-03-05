import { makeAutoObservable, configure } from "mobx";
import firebase from "firebase/app";
import 'firebase/database'
import "firebase/auth"

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
            const { email, password, firstName, lastName } = payload
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
            const { user, } = userCredential
            await user.updateProfile({
                displayName: `${firstName} ${lastName}`,
            })
            const { uid } = user
            await firebase.database().ref('users/' + uid).set({
                email,
                firstName,
                lastName,
                uid
            })
            this._auth(uid)
        }
        catch (e) {
            this.isFetching = false
            this.error = e.toString()
        }
    }

    async signIn({ email, password }) {
        try {
            this.isFetching = true
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
            this._auth(userCredential.user.uid)
        }
        catch (e) {
            this.isFetching = false
            this.error = e.toString()
        }
    }

    _auth(token) {
        localStorage.setItem('auth', token)
        this.isAuth = true
        this.token = token
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