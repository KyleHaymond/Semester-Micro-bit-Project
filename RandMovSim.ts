// M2 is right wheel
// M1 is left wheel
// Speeds under 23 cause the motors to act out

// POOP DISCOVERY TIMER INITIALIZATION
let count = 0

// METHANE SENSOR INITIALIZATION
let methaneValue = 0
let sensorPin = AnalogPin.P2
serial.setBaudRate(9600)

// METHANE SENSOR
methaneValue = pins.analogReadPin(sensorPin)
basic.showNumber(methaneValue)
basic.pause(100)

// ULTRASONIC SENSOR VARIABLES
let distance = 0

// TURNING VARIABLES
let turnDir = 0
let sPause = 1000
let tPause = 800
let speed = 65
let turnSpeed = 30

// FORWARD FUNCTION
function forward() {
    MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.green1)
    MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.green1)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, speed)
    MiniCar.motor(Motorlist.M2, Direction1.Forward, speed)
}

// TURNING RIGHT FUNCTION
function turnRight() {
    MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.yellow)
    MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.green1)

    MiniCar.motor(Motorlist.M2, Direction1.Backward, turnSpeed)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, turnSpeed)
    basic.pause(tPause)
    MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
    basic.pause(sPause)
}

// TURNING LEFT FUNCTION
function turnLeft() {
    MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.green1)
    MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.yellow)

    MiniCar.motor(Motorlist.M2, Direction1.Backward, turnSpeed)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, turnSpeed)
    basic.pause(tPause)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
    MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
    basic.pause(sPause)
}

// STOP FUNCTION
function stop() {
    MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.red1)
    MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.red1)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
    MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
    basic.pause(sPause)
}

//SHOVEL POOP
function shovelPoop() {
    music.play(music.stringPlayable("E F G F G C D", 400), music.PlaybackMode.UntilDone)
    for (let i = 1; i < 11; ++i) {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.red1)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.yellow)
        basic.pause(200)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.red1)
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.yellow)
        basic.pause(200)
    }
    basic.pause(1000)
}

// MAIN FUNCTION
basic.forever(function () {
    distance = MiniCar.ultra()
    //basic.showIcon(IconNames.Happy)

    // METHANE SENSOR
    methaneValue = pins.analogReadPin(sensorPin)
    basic.showNumber(methaneValue)
    basic.pause(100)

    // increment poop discovery
    count++

    //if (methaneValue > 100) {
    if (count % 20 == 0) {
        stop()
        basic.showIcon(IconNames.Sad)
        shovelPoop()
    }
    
    // NO WALL, KEEP MOVING
    if (distance > 8) {
        forward()
    }
    // WALL, STOP AND TURN
    else {
        stop()
        // IF TURNING RIGHT
        if (turnDir % 2 == 0) {
            turnRight()
            turnDir++
        }
        // IF TURNING LEFT
        else {
            turnLeft()
            turnDir++
        }
    }
})
