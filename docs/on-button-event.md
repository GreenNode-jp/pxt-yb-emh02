# onButtonEvent

指定したボタンが押されたとき、または離されたときに、登録した処理を実行します。

```sig
ybemh02.onButtonEvent(ybemh02.Button.B1, ybemh02.ButtonEvent.Pressed, function () {})
```

## Parameters

**button**: 対象のボタン（B1〜B4）。

**event**: `押された` または `離された`。

**handler**: イベントが起きたときに実行する関数。

## Example

B1 が押されたらアイコンを表示する例です。

```blocks
ybemh02.onButtonEvent(ybemh02.Button.B1, ybemh02.ButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Heart)
})
```

## See also

**isButtonPressed** — ワークスペースで該当ブロックを右クリックし **ヘルプ** を選ぶと、このサイドパネルにそのブロック用の説明が開きます（拡張同士のページリンクは CDN に本文が無く開けません）。

```package
pxt-yb-emh02=github:GreenNode-jp/pxt-yb-emh02#main
```
