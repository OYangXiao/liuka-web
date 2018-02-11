import { observable } from "mobx"

import { EventStore, AccountStore } from 'stores'

export class TheStore {
    [name: string]: any;
    @observable.ref account: AccountStore = new AccountStore(this)
    @observable.ref events: EventStore | undefined
}


