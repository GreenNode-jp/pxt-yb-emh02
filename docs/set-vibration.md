# setVibration

振動モータ **ON/OFF**（**P0**）。

```sig
ybemh02.setVibration(true)
```

## Parameters

**on**: `true` で ON、`false` で OFF

## Example

```blocks
basic.forever(function () {
    ybemh02.setVibration(ybemh02.isButtonPressed(ybemh02.Button.B1))
})
```

## See also

**isButtonPressed**, **joystickValue**

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
