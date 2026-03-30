let lastLED_X = 2
let lastLED_Y = 2

ybemh02.onButtonEvent(ybemh02.Button.B2, ybemh02.ButtonEvent.Pressed, function() {
    ybemh02.setVibration(true)
})

ybemh02.onButtonEvent(ybemh02.Button.B2, ybemh02.ButtonEvent.Released, function() {
    ybemh02.setVibration(false)
})

basic.forever(function () {
    let xInput = ybemh02.joystickValue(ybemh02.Axis.X)
    let yInput = ybemh02.joystickValue(ybemh02.Axis.Y)

    let newLED_X = Math.round(Math.map(yInput, -127, 127, 4, 0))
    let newLED_Y = Math.round(Math.map(xInput, -127, 127, 0, 4))

    if (newLED_X != lastLED_X || newLED_Y != lastLED_Y) {
        led.unplot(lastLED_X, lastLED_Y)
        led.plot(newLED_X, newLED_Y)
        lastLED_X = newLED_X
        lastLED_Y = newLED_Y
    }

    basic.pause(20)
})