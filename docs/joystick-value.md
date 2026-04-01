# joystickValue

ジョイスティックの傾き（**−127〜127**  整数）。

- **通常**（既定）: -127, ... -15, 0, 15, 31, ..., 127
- **詳細**: -127, -126, ..., -1, 0, 1, 2, ...., 127



```sig
ybemh02.joystickValue(ybemh02.Axis.X)
```

## Parameters

**axis**: 
- X: X座標
- Y: Y座標
- XY: X,Y座標を1つの整数にまとめる。X + 256 * Y ()
　※無線通信等でunpackJoystickValueと使うと便利

## Returns



## Example

```blocks
basic.forever(function () {
    let x = ybemh02.joystickValue(ybemh02.Axis.X)
    led.unplot(2, 2)
    if (x > 20) {
        led.plot(0, 2)
    } else if (x < -20) {
        led.plot(4, 2)
    } else {
        led.plot(2, 2)
    }
})
```

## See also

**unpackJoystickValue**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
