let methanePin = AnalogPin.P0
serial.redirectToUSB()

// CSV FILE COLUMN HEADERS
serial.writeLine("Time(Sec)" + "," + "Voltage" + "," + "PPM")

// WARMUP SENSOR - let the sensor run to settle it
basic.showString("W")
basic.pause(120000)

// VARIABLES CONVERTING VOLTAGE TO PPM
let loadResistor = 10000 // load resistor per sensor datasheet
let vc = 3.3 // power output of microbit

// GET RAW READING FROM SENSOR
function readVoltage(): number {

    let raw = pins.analogReadPin(methanePin)
    return (raw / 1023) * vc
}

// GET SENSOR RESISTANCE
function calculateRs(rawValue: number): number {

    if (rawValue <= 0.01) {
        return 999999
    }
    return loadResistor * (rawValue / (vc - rawValue))
}

// CONVERT VOLTAGE TO PPM
function convertToPPM(rawValue: number): number {

    let rs = calculateRs(rawValue)
    let ratio = rs / baseline

    let ppm = 5 * Math.pow(ratio, -2.3)
    if (ppm < 1) { ppm = 1 }
    if (ppm > 10000) { ppm = 10000 }

    return Math.round(ppm * 100) / 100
}

// CALIBRATION - gets average of a # of readings to set baseline
let sum = 0
let samples = 200
basic.showString("C")
for (let i = 0; i < samples; i++) {

    let voltage = readVoltage()
    let rs = calculateRs(voltage)

    sum += rs
    basic.pause(100)
}
let baseline = sum / samples

basic.showString("R")

// MAIN ******************************
basic.forever(function () {

    // GET TIME FOR TRACKING
    let time = (input.runningTime() / 1000)
    let adjustedTime = Math.round(time * 10) / 10

    // GET RAW VOLT READING
    let rawValue = readVoltage()

    // CONVERT VOLT READINGS TO PPM AND GET AN AVG OF READINGS TO ELIMINATE NOISE
    let ppmSum = 0
    for (let i = 0; i < 10; i++) {

        let voltage = readVoltage()
        ppmSum += convertToPPM(voltage)
        basic.pause(50)
    }
    let ppm = ppmSum / 10
    ppm = Math.round(ppm * 100) / 100

    // ROUND RAW VALUE FOR PRINTING
    rawValue = Math.round(rawValue * 100) / 100

    // WRITE TO CVS FILE
    serial.writeLine("" + adjustedTime + "," + rawValue + "," + ppm)
    basic.pause(1000)

    // PLAY A TUNE BASED ON PPM RETURN
    if (ppm >= 10) {
        music.stopAllSounds()
        music.play(music.stringPlayable("C D C D C D C D ", 400), music.PlaybackMode.LoopingInBackground)
    }
    if (ppm < 10) {
        music.stopAllSounds()
    }
})
