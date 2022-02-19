// Countdown to announcement class
class Timer {
    counter: number

    timerUtils = () => {
        // eventDate will be queried from the database
        const eventDate: Date = new Date("2022-02-19 15:53:20")
        // Set to currentDate + 5(seconds)
        const currentDate = new Date()

        // Getting currentDate & eventDate
        let timeLeft = eventDate.getTime() - currentDate.getTime()

        // Conveting the time from ms to seconds
        let timeLeftInSeconds = timeLeft / 1000
        // Flooring the value
        let counter = Math.floor(timeLeftInSeconds)

        return counter
    }

    checker = () => {
        if (this.counter === 0) {
            // Announcement here
        }
    }
    constructor() {
        let intervalId = setInterval(() => {
            this.counter = this.counter - 1
            console.log(this.counter)
            if (this.counter === 0) {
                clearInterval(intervalId)
            }
            this.counter = this.counter
            this.checker()
        }, 1000)
        this.timerUtils()
        this.counter = this.timerUtils()
    }
}

export { Timer }
