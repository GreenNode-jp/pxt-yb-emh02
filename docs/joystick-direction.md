# joystickDirection

指定方向へ十分傾いていれば `true`。
**閾値**は最大振幅（±127）の **60%**（整数 **76**）。

```sig
ybemh02.joystickDirection(ybemh02.JoystickDirection.Up)
```

## Parameters

**direction**: 上 / 下 / 左 / 右 / 中央

## Returns

`true` / `false`

## Example

```blocks
basic.forever(function () {
    if (ybemh02.joystickDirection(ybemh02.JoystickDirection.Up)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
```

## See also

**joystickValue**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
