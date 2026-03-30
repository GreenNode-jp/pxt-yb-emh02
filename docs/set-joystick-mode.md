# setJoystickMode

**joystickValue** / **joystickDirection** のモード。

* **通常**（既定）: **`idiv(|v|+8,16)×16−1`** で **0, ±15, ±31, … ±127** 相当にまとめる。
* **詳細**: 正規化どおりの連続した整数（**−127〜127**）。

```sig
ybemh02.setJoystickMode(ybemh02.JoystickMode.Normal)
```

## Parameters

**mode**: **通常** / **詳細**

## Example

```blocks
ybemh02.setJoystickMode(ybemh02.JoystickMode.Detailed)
basic.forever(function () {
    let x = ybemh02.joystickValue(ybemh02.Axis.X)
})
```

（**通常**だけならブロック不要。）

## See also

**joystickValue**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
