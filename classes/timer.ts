// Countdown to announcement class
class Timer {
    counter: number

    timerUtils = () => {
        // eventDate will be queried from the database
        const eventDate: Date = new Date("2022-02-19 19:40:20")
        // Set to currentDate + 5(seconds)
        const currentDate: Date = new Date()

        // Getting currentDate & eventDate
        let timeLeft: number = eventDate.getTime() - currentDate.getTime()

        // Conveting the time from ms to seconds
        let timeLeftInSeconds: number = timeLeft / 1000
        // Flooring the value
        let counter: number = Math.floor(timeLeftInSeconds)

        return counter
    }

    checker = () => {
        if (this.counter === 0) {
            // Announcement here
        }
    }
    constructor() {
        let intervalId: NodeJS.Timer = setInterval(() => {
            this.counter = this.counter - 1
            console.log(this.counter)
            if (this.counter === 0) {
                clearInterval(intervalId)
            }
            this.counter = this.counter
            this.checker()
        }, 1000)

        this.counter = this.timerUtils()
    }
}

export { Timer }
