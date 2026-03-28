# joystickValue

ジョイスティックの傾きを、起動時に記録した中心を基準にした数値で返します。おおよそ **-100〜100** の範囲で、中央付近はデッドゾーンにより **0** になります。

```sig
ybemh02.joystickValue(ybemh02.Axis.X)
```

## Parameters

**axis**: 読み取る軸（X または Y）。

## Returns

* 傾きを表す [number](/types/number)。**X** は左寄りが負・右寄りが正。**Y** は上寄りが負・下寄りが正です。

## Example

X の傾きで左右にドットを動かす例です。

```blocks
basic.forever(function () {
    let x = ybemh02.joystickValue(ybemh02.Axis.X)
    led.unplot(2, 2)
    if (x < -20) {
        led.plot(0, 2)
    } else if (x > 20) {
        led.plot(4, 2)
    } else {
        led.plot(2, 2)
    }
})
```

## See also

**setVibration** — 該当ブロックを右クリック → **ヘルプ** で同じサイドパネルに開きます。

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
