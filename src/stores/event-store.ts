import { observable } from "mobx"

import { TheStore } from 'stores'

export class EventStore {
    theStore: TheStore
    @observable.ref rawEvents: any

    constructor(theStore: TheStore, rawEvents: any) {
        this.theStore = theStore
        this.rawEvents = rawEvents
    }
}