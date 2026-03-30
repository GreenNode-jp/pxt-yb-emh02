# MakeCode for micro:bit — YB-EMH02

ゲームパッド **YB-EMH02** 用（ボタン・ジョイスティック・振動）。日本語ブロック。

## 拡張の追加

**拡張機能** に GitHub URL を追加: `https://github.com/GreenNode-jp/pxt-yb-emh02`

<details open>
<summary><strong>動作イメージ</strong></summary>

![](imgs/howto.gif)

</details>




## API リファレンス

`docs/` およびブロックの **ヘルプ**（右クリック）。

- [isButtonPressed](docs/is-button-pressed.md)
- [joystickDirection](docs/joystick-direction.md)
- [joystickValue](docs/joystick-value.md)
- [setJoystickMode](docs/set-joystick-mode.md)
- [unpackJoystickValue](docs/unpack-joystick-value.md)
- [onButtonEvent](docs/on-button-event.md)
- [setVibration](docs/set-vibration.md)





# ハードウェア

![](imgs/YB-EMH02.jpg)



## IO ポート対応表

| IO port | Description |
| :--- | :--- |
| P0 | 振動モータ・圧電スピーカー | 
| P1 | ジョイスティック Y | 
| P2 | ジョイスティック X | 
| P8 | ジョイスティック ボタン | | |
| P13 | ボタン B1 (赤) |
| P14 | ボタン B2 (緑) |
| P15 | ボタン B3 (青) |
| P16 | ボタン B4 (黄) |
| - | 電源スイッチ (S2) <br/>左: OFF <br/>右: ON (電池から給電)  |
| - | 振動モータ・圧電スピーカ制御スイッチ　（S3)<br/>左: ソフト制御(P0で制御)<br/>右: 自動連動(ボタン押下で自動的に振動) |


## ビルド（開発者向け）

```bash
npx makecode build
```

成果物は `built/`。HEX がエディタで弾かれる場合は PXT CLI も試す。

```bash
npx pxt target microbit
npx pxt build
```

エディタ: [makecode.microbit.org](https://makecode.microbit.org)（[beta](https://makecode.microbit.org/beta)）


sudo pkill bluetoothd

2. Google公式のWeb Bluetoothテスター
特定のサービスに限定せず、デバイスを探せる汎用的なツールです。

URL: https://googlechrome.github.io/samples/web-bluetooth/device-info.html


chrome://bluetooth-internals/#devices

プロジェクト設定から
JustWorks pairing (default): Pairing is automatic once the pairing is initiated.