import { Subject } from "./Subject"
import { Event } from "./Event"

export default interface Receive {
    receive(Event: Event, Subject: Subject, data: any):any
}