# onButtonEvent

ボタンが押された／離されたときに処理を実行する。

```sig
ybemh02.onButtonEvent(ybemh02.Button.B1, ybemh02.ButtonEvent.Pressed, function () {})
```

## Parameters

**button**: B1〜B4

**event**: 押された / 離された

**handler**: コールバック

## Example

```blocks
ybemh02.onButtonEvent(ybemh02.Button.B1, ybemh02.ButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Heart)
})
```

## See also

**isButtonPressed**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
