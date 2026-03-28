# unpackJoystickValue

`joystickValue(Axis.XY)` で得た **複合値**（`x + 256 × y`）から、**X 成分**または **Y 成分**を取り出します。`packed` は整数である想定です（`y = trunc(packed / 256)`、`x = packed - 256 * y`）。

```sig
ybemh02.unpackJoystickValue(0, ybemh02.JoystickAxis.X)
```

## Parameters

**packed**: `joystickValue(ybemh02.Axis.XY)` の戻り値。

**component**: 取り出す軸（**X** または **Y**）。

## Returns

* 取り出した成分を表す [number](/types/number)。

## See also

**joystickValue** — 該当ブロックを右クリック → **ヘルプ** で同じサイドパネルに開きます。

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
