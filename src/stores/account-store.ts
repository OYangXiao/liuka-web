import { observable, action } from "mobx"

import { TheStore, EventStore } from 'stores'

import ajax from 'libs/ajax'
import jwt from 'libs/jwt'

export class AccountStore {
    [name: string]: any;
    theStore: TheStore
    triedLogin: boolean = false

    @observable accountu_id: string = ""
    @observable uid: string = ""
    @observable unm: string = ""
    @observable pic: string = ""
    sig: string = ""

    constructor(theStore: TheStore) {
        this.theStore = theStore
        this._initMe()
    }

    @action _initMe = () => {
        this.triedLogin = true
        if (jwt.isLoggedIn()) {
            ajax.get('/api/user/initme')
                .subscribe(({ response }) => {
                    this.u_id = response._id
                    this.uid = response.uid
                    this.unm = response.unm
                    this.pic = response.pic
                    this.sig = response.sig

                    this.theStore.events = new EventStore(this.theStore, response.initEvents)
                })
        } else {
        }
    }
}
