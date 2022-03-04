import moment from "moment"

let inputDate = "2024-11-30" // YYYY-MM-DD
console.log(inputDate)

let currentDate = moment()

let dateSliced = inputDate.split("-")

// TO-DO
// Make array to store errors in so they can be listed and called for further usage
// Month Checker remaining

export const validateDate = () => {
    if (parseInt(dateSliced[2]) < 1) {
        console.log("Day cannot be than than 1")
    }
    if (parseInt(dateSliced[0]) < currentDate.year()) {
        console.log("Scheduled year cannot be less than current year")
    } else if (dateSliced[0].length > 4) {
        console.log("Im too old for this. Ask my great grandson to do this")
    }
    // Check for months > 12 || months < 1

    switch (parseInt(dateSliced[1])) {
        case 1:
            console.log("January")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
            }
            break
        case 2:
            console.log("February")
            if (
                parseInt(dateSliced[2]) > 29 &&
                parseInt(dateSliced[0]) % 4 === 0
            ) {
                console.log("Days > 29")
            } else if (
                parseInt(dateSliced[2]) > 29 &&
                parseInt(dateSliced[0]) % 4 !== 0
            ) {
                console.log("Days > 28")
            }
            break
        case 3:
            console.log("March")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
            }
            break
        case 4:
            console.log("April")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
            }
            break
        case 5:
            console.log("May")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
            }
            break
        case 6:
            console.log("June")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
            }
            break
        case 7:
            console.log("July")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
            }
            break
        case 8:
            console.log("August")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
            }
            break
        case 9:
            console.log("September")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
            }
            break
        case 10:
            console.log("October")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
            }
            break
        case 11:
            console.log("November")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
            }
            break
        case 12:
            console.log("December")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
            }
            break
        default:
            console.log("This is default")
    }
}

try {
    validateDate()
} catch (err) {
    console.log(err)
}
