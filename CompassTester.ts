// variables and calibration
input.calibrateCompass()
basic.pause(3000)
let x = input.compassHeading()
let compassValues: number[] = []
let filledArray: number[] = []
let reading = 0

// collect a reading
function readingCollector (compassValues: number[]) {

    let count = 0
    while (count < 12) {
        reading = input.compassHeading()
        compassValues.push(reading)
        basic.showNumber(reading)
        basic.pause(5000)
        count++
    }
}

// get min/max values in a data set of compass readings
function readingSorter (compassValues: number[]) {

    let minVal
    let maxVal

    if (compassValues.length > 0) {
        minVal = compassValues[0]
        maxVal = compassValues[0]

        for (let value of compassValues) {
            if (value < minVal) {
                minVal = value
            }
            if (value > maxVal) {
                maxVal = value
            }
        }
    }
    music.play(music.stringPlayable("D G D G D G D G", 300), music.PlaybackMode.UntilDone)
    basic.showString("MIN: ")
    basic.showNumber(minVal)
    basic.showString("MAX: ")
    basic.showNumber(maxVal)

}

function arrayPopper (compassValues: number[]) {

    while (compassValues.length > 0) {
        compassValues.pop()
    }
}

// turn for half a second
function turn () {

    MiniCar.motor(Motorlist.M1, Direction1.Forward, 45)
    MiniCar.motor(Motorlist.M2, Direction1.Backward, 45)
    basic.pause(500)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
    MiniCar.motor(Motorlist.M2, Direction1.Backward, 0)

}

// main - collect and report readings for 5 minutes
basic.forever(function () {
    
    let count = 0
    while (count < 4) {

        music.play(music.stringPlayable("C B A G F E D", 400), music.PlaybackMode.UntilDone)
        basic.pause(1000)
        readingCollector(compassValues)
        readingSorter(compassValues)
        arrayPopper(compassValues)
        turn()
        basic.pause(3000)
        count++
    }
    music.play(music.stringPlayable("C5 C B D A E G F ", 400), music.PlaybackMode.UntilDone)
})
