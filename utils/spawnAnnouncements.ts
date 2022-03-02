import { pullUnsentFromDB } from "../mongo"

export var GCNote = 0

const pulledAnnouncements = pullUnsentFromDB()
console.log("pulledAnnouncements ~~> ", pulledAnnouncements)
