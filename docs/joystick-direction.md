# joystickDirection

指定方向へ十分傾いていれば `true`。**joystickValue** と同じ値・**JoystickMode**。**ヒステリシス**（最大振幅 ±127 に対する割合）: 基準 **60%**、**入り 70%**（整数 **88**）、**抜け 50%**（整数 **63**）。**中央**は上下左右いずれもラッチしていないとき。

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
