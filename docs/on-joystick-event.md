# onJoystickEvent

ジョイスティックの**優先方向**（**Y 優先**: 上→下→左→右、いずれもなければ中央）が**変わったとき**に処理を実行する。約 **100ms** ごとにポーリング。**joystickDirection** と同じヒステリシス・**JoystickMode**。中央に戻ったときもイベントが発生する。

```sig
ybemh02.onJoystickEvent(ybemh02.JoystickDirection.Up, function () {})
```

## Parameters

**direction**: 上 / 下 / 左 / 右 / 中央

**handler**: コールバック

## Example

```blocks
ybemh02.onJoystickEvent(ybemh02.JoystickDirection.Up, function () {
    basic.showArrow(ArrowNames.North)
})
ybemh02.onJoystickEvent(ybemh02.JoystickDirection.Center, function () {
    basic.clearScreen()
})
```

## See also

**joystickDirection**, **setJoystickMode**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
