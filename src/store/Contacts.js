import firebase from "firebase/app";
import 'firebase/database'
import { makeAutoObservable } from "mobx";
import auth from './Auth'

class Contacts {
    common = []
    elected = []
    electedIds = []

    elect(user) {
        let ref = firebase.database().ref(`users/${auth.token}/elected`)
        if (user.isElected) {
            ref.child(user.uid).remove()

        }
        else {
            ref.update({ [user.uid]: user.uid })
        }
    }

    observer = () => {
        if (auth.token) {
            new Promise(resolve => {
                firebase.database().ref('users').on('value', (snapshot) => {
                    const data = Object.values(snapshot.val() || {})
                    this.common = data.map(user => (
                        {
                            ...user,
                            isElected: this.electedIds.includes(user.uid)
                        }
                    ))
                    resolve()
                })
            })
                .then(() => {
                    firebase.database().ref(`users/${auth.token}/elected`).on('value', (snapshot) => {
                        const _elected = Object.values(snapshot.val() || {})
                        this.common = this.common.map(user => {
                            return {
                                ...user,
                                isElected: _elected.includes(user.uid)
                            }
                        })
                        this.electedIds = _elected
                        this.elected = this.common.filter(user => _elected.includes(user.uid))
                    })
                })
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Contacts()