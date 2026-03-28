# joystickDirection

ジョイスティックが、指定した方向へ **正規化値の絶対値が 80 以上**傾いているかどうかを返します。判定には `joystickValue` と同じ基準（起動時の中心・デッドゾーン）が使われます。

```sig
ybemh02.joystickDirection(ybemh02.JoystickDirection.Up)
```

## Parameters

**direction**: 調べる方向（上・下・左・右）。

## Returns

* その方向へ十分傾いていれば `true`、そうでなければ `false`。

## Example

上に倒しているときにアイコンを表示する例です。

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

**joystickValue** — 該当ブロックを右クリック → **ヘルプ** で同じサイドパネルに開きます。

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
