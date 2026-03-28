# setVibration

振動モータのオン・オフを切り替えます。制御信号はデジタル **P0** に出力されます。

```sig
ybemh02.setVibration(true)
```

## Parameters

**on**: `true` で振動オン、`false` でオフ。

## Example

ボタンを押している間だけ振動させる例です。

```blocks
basic.forever(function () {
    ybemh02.setVibration(ybemh02.isButtonPressed(ybemh02.Button.B1))
})
```

## See also

- **isButtonPressed** — 右クリック → **ヘルプ**
- **joystickValue** — 右クリック → **ヘルプ**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
