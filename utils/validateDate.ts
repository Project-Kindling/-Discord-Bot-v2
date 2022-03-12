export const validateDate = (due: string) => {
    let errors = 0 // Keeps track of the number of errors
    let currentDate = new Date()
    let dateSliced = due.split("-")

    if (isNaN(parseInt(due)) === true) {
        errors += 1
    }
    if (
        isNaN(parseInt(dateSliced[0])) === true ||
        isNaN(parseInt(dateSliced[1])) === true ||
        isNaN(parseInt(dateSliced[2])) === true
    ) {
        errors += 1
    }

    if (parseInt(dateSliced[2]) < 1) {
        console.log("Day cannot be than than 1")
        errors += 1
    }
    if (parseInt(dateSliced[0]) < currentDate.getFullYear()) {
        console.log("Scheduled year cannot be less than current year")
        errors += 1
    } else if (dateSliced[0].length > 4 || dateSliced[0].length < 4) {
        console.log("Im too old for this. Ask my great grandson to do this")
        errors += 1
    }
    if (parseInt(dateSliced[1]) > 12 || parseInt(dateSliced[1]) < 1) {
        console.log("Month INVALID")
        errors += 1
    }

    switch (parseInt(dateSliced[1])) {
        case 1:
            console.log("January")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
                errors += 1
            }
            break
        case 2:
            console.log("February")
            if (
                parseInt(dateSliced[2]) > 29 &&
                parseInt(dateSliced[0]) % 4 === 0
            ) {
                console.log("Days > 29")
                errors += 1
            } else if (
                parseInt(dateSliced[2]) > 29 &&
                parseInt(dateSliced[0]) % 4 !== 0
            ) {
                console.log("Days > 28")
                errors += 1
            }
            break
        case 3:
            console.log("March")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
                errors += 1
            }
            break
        case 4:
            console.log("April")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
                errors += 1
            }
            break
        case 5:
            console.log("May")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
                errors += 1
            }
            break
        case 6:
            console.log("June")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
                errors += 1
            }
            break
        case 7:
            console.log("July")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
                errors += 1
            }
            break
        case 8:
            console.log("August")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
                errors += 1
            }
            break
        case 9:
            console.log("September")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
                errors += 1
            }
            break
        case 10:
            console.log("October")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
                errors += 1
            }
            break
        case 11:
            console.log("November")
            if (parseInt(dateSliced[2]) > 30) {
                console.log("Days > 30")
                errors += 1
            }
            break
        case 12:
            console.log("December")
            if (parseInt(dateSliced[2]) > 31) {
                console.log("Days > 31")
                errors += 1
            }
            break
        default:
            console.log("This is default")
    }
    return errors
}
