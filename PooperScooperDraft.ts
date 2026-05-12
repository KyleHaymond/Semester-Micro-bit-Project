// M1 is right wheel
// M2 is left wheel

// TODO: DETECT WALLS AND TURN
// TODO: DETECT POOP AND HANDLE IT

let turnDir = 0
let distance = 0
let x = 0

let tPause = 1500
let hPause = 100
let speed = 30
let turnSpeed = 10

let heading = 0

// have to calibrate compass every time?
input.calibrateCompass()
x = input.compassHeading()

while (x >= 120 || x < 100) {
    MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.red1)
    MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.red1)
    MiniCar.motor(Motorlist.M1, Direction1.Forward, turnSpeed)
    basic.pause(hPause)
    x = input.compassHeading()
    heading = x
}

basic.forever(function () {
    distance = MiniCar.ultra()
    x = input.compassHeading()

    if (distance > 10) {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.green1)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.green1)
        MiniCar.motor(Motorlist.M1, Direction1.Forward, speed)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, speed)
    }

    else {
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
        basic.pause(tPause)

        let currentHeading = input.compassHeading()
        let heading = 0

        if (turnDir % 2 == 0) {
            heading = (currentHeading + 90) % 360
            while (true) {
                let reading = input.compassHeading()
                let diff = Math.abs(reading - heading)
                if (diff > 180) { diff = 360 - diff }
                if (diff < 5) break;

                MiniCar.motor(Motorlist.M2, Direction1.Forward, turnSpeed)
                basic.pause(hPause)
            }
        } else {
            heading = (currentHeading + 270) % 360
            // TURN LEFT
            while (true) {
                let reading = input.compassHeading()
                let diff = Math.abs(reading - heading)
                if (diff > 180) { diff = 360 - diff }
                if (diff < 5) break;

                MiniCar.motor(Motorlist.M1, Direction1.Forward, turnSpeed)
                basic.pause(hPause)
            }
        }
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
        turnDir++
    }

    /*
    else {
        MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.red1)
        MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.red1)
        MiniCar.motor(Motorlist.M1, Direction1.Forward, 0)
        MiniCar.motor(Motorlist.M2, Direction1.Forward, 0)
        basic.pause(tPause)

        if (turnDir % 2 == 0) {
            let heading = (input.compassHeading() + 90) % 360
            while (Math.abs(input.compassHeading() - heading) > 5) {
                MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.cyan)
                MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.cyan)
                MiniCar.motor(Motorlist.M2, Direction1.Forward, turnSpeed)
                x = input.compassHeading()
                basic.pause(hPause)
            }
            turnDir++
        }
        else {
            let heading = (input.compassHeading() + 270) % 360
            while (Math.abs(input.compassHeading() - heading) > 5) {
                MiniCar.led_rgb(LED_rgb_L_R.LED_R, LED_color.cyan)
                MiniCar.led_rgb(LED_rgb_L_R.LED_L, LED_color.cyan)
                MiniCar.motor(Motorlist.M1, Direction1.Forward, turnSpeed)
                x = input.compassHeading()
                basic.pause(hPause)
            }
            turnDir++
        }
    }*/
})
