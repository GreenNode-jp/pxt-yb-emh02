# joystickValue

ジョイスティックの傾きを、起動時に記録した中心を基準にした数値で返します。**X**・**Y** はおおよそ **-127〜127** で、中央付近はデッドゾーンにより **0** になります。**XY** を選ぶと、同じ正規化した **x**・**y**（整数）について **`x + 256 × y`** を1つの数として返します（無線などで1値だけ送る用途向け。復号は **unpackJoystickValue** で一意にできます）。

```sig
ybemh02.joystickValue(ybemh02.Axis.X)
```

## Parameters

**axis**: 読み取る軸（**X**、**Y**、または **XY**）。

## Returns

* 傾きを表す [number](/types/number)。**X**・**Y** は四捨五入した**整数**。**X** は左寄りが正・右寄りが負。**Y** は上寄りが負・下寄りが正。**XY** は **`x + 256 × y`** の複合整数です。

## Example

X の傾きで左右にドットを動かす例です。

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

**setVibration** — 該当ブロックを右クリック → **ヘルプ** で同じサイドパネルに開きます。

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
