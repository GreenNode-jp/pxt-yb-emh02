# isButtonPressed

いまボタンが押されていれば `true`。

```sig
ybemh02.isButtonPressed(ybemh02.Button.B1)
```

## Parameters

**button**: B1〜B4

## Returns

`true` / `false`

## Example

```blocks
basic.forever(function () {
    if (ybemh02.isButtonPressed(ybemh02.Button.B1)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
```

## See also

**onButtonEvent**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
