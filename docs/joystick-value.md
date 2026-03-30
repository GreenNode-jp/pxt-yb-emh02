# joystickValue

ジョイスティックの傾き（整数）。アナログ **0〜1023** を **`idiv(raw−512±2, 4)`** で量子化し符号を反転、**−127〜127** に収める。**XY** は **`x + 256×y`**。

* **通常**（既定）: 上記の **v** を **`idiv(|v|+8,16)×16−1`** にまとめる（小さい |v| は **0**）。
* **詳細**: **v** をそのまま返す。

```sig
ybemh02.joystickValue(ybemh02.Axis.X)
```

## Parameters

**axis**: **X** / **Y** / **XY**

## Returns

整数。**X**: 左が正。**Y**: 上が負。**XY**: 複合値。

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
