let lastLED_X = 2
let lastLED_Y = 2

// --- イベント駆動セクション ---
// B2が「押された時」に振動開始
ybemh02.onButtonEvent(ybemh02.Button.B2, ybemh02.ButtonEvent.Pressed, function() {
    ybemh02.setVibration(true)
})

// B2が「離された時」に振動停止
ybemh02.onButtonEvent(ybemh02.Button.B2, ybemh02.ButtonEvent.Released, function() {
    ybemh02.setVibration(false)
})

// --- メインループ（ジョイスティック監視のみ） ---
basic.forever(function () {
    let xInput = ybemh02.joystickValue(ybemh02.Axis.X)
    let yInput = ybemh02.joystickValue(ybemh02.Axis.Y)

    // マッピングの入れ替え ＆ LED左右反転
    // newLED_X (LED左右) <- yInput(物理上下) : 0-4 を 4-0 にして左右反転
    let newLED_X = Math.round(Math.map(yInput, -100, 100, 4, 0)) 
    // newLED_Y (LED上下) <- xInput(物理左右)
    let newLED_Y = Math.round(Math.map(xInput, -100, 100, 0, 4))

    if (newLED_X != lastLED_X || newLED_Y != lastLED_Y) {
        led.unplot(lastLED_X, lastLED_Y)
        led.plot(newLED_X, newLED_Y)
        lastLED_X = newLED_X
        lastLED_Y = newLED_Y
    }

    basic.pause(20)
})