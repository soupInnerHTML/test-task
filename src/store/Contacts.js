import {makeAutoObservable} from "mobx";

class Contacts {
    common = [
        {
            id: 1,
            name: 'Elon Musk',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg'
        },
        {
            id: 2,
            name: 'Elon Musk',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg'
        },
        {
            id: 3,
            name: 'Elon Musk',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg'
        },
        {
            id: 4,
            name: 'Elon Musk',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg'
        }
    ]

    elected = []

    elect(user) {
        user.isElected = !user.isElected
        user.isElected ? this.elected.push(user) : (this.elected = this.elected.filter(item => item.id !== user.id))
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Contacts()