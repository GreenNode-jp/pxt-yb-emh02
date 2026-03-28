# isButtonPressed

指定したボタンが、いま押されているかどうかを返します。プルアップ入力のため、接点が GND に落ちている（LOW）ときに真になります。

```sig
ybemh02.isButtonPressed(ybemh02.Button.B1)
```

## Parameters

**button**: 調べるボタン（B1〜B4）。

## Returns

* 押されていれば `true`、そうでなければ `false`。

## Example

B1 が押されているときだけハートを表示する例です。

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

**onButtonEvent** — 該当ブロックを右クリック → **ヘルプ** で同じサイドパネルに開きます。

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
