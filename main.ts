/**
 * ゲームパッド(YB-EMH02)用機能拡張。ボタン・ジョイスティック・振動モータを扱います。
 *
 * ブロックごとに `//% help=github:pxt-yb-emh02/docs/（ページ名）` で `docs/*.md` をサイドに出します（**help= に引用符を付けない**。`.md` は書かない）。
 * PXT は `github:…#見出し` のような **アンカー付き URL を解釈しない**ため、見出しジャンプではなく **ファイルを分ける**形にしています。
 * `dependencies` のキーは **`pxt-yb-emh02`**（`pxt.json` の `name` と同じ）にしてください。
 */
//% weight=100 color=#2c3e50 icon="\uf11b" block="コントローラ"
namespace ybemh02 {
    let initialized = false;
    let centerX = 512;
    let centerY = 512;
    /** `joystickDirection` が真になる最小の絶対値（`joystickValue` の -127〜127 スケール）。 */
    const JOYSTICK_DIRECTION_THRESHOLD = 80;

    /** パッド前面のボタン（B1〜B4）。それぞれマイコン上のデジタルピンに対応します。 */
    export enum Button {
        B1 = DigitalPin.P13,
        B2 = DigitalPin.P14,
        B3 = DigitalPin.P15,
        B4 = DigitalPin.P16
    }

    /**
     * ジョイスティックの X 軸・Y 軸（アナログピン読み取り）、または XY 複合（`x + 256 * y`）。
     * `XY` はピン番号ではないため `joystickValue` 内で分岐します。
     */
    export enum Axis {
        X = AnalogPin.P2,
        Y = AnalogPin.P1,
        //% block="XY（x+256y）"
        XY = -1
    }

    /** `unpackJoystickValue` で X か Y のどちらを取り出すか。 */
    export enum JoystickAxis {
        //% block="X"
        X = 0,
        //% block="Y"
        Y = 1
    }

    /** ジョイスティックの傾き方向。`joystickDirection` でしきい値以上かどうかを調べます。 */
    export enum JoystickDirection {
        //% block="上"
        Up = 0,
        //% block="下"
        Down = 1,
        //% block="左"
        Left = 2,
        //% block="右"
        Right = 3
    }

    /**
     * ボタンのイベント種別。`onButtonEvent` で「押された」「離された」を選びます。
     */
    export enum ButtonEvent {
        //% block="押された"
        Pressed = PulseValue.Low,
        //% block="離された"
        Released = PulseValue.High
    }

    function init() {
        if (initialized) return;
        [DigitalPin.P13, DigitalPin.P14, DigitalPin.P15, DigitalPin.P16].forEach(pin => {
            pins.setPull(pin, PinPullMode.PullUp);
            pins.setEvents(pin, PinEventType.Pulse);
        });
        pins.digitalWritePin(DigitalPin.P0, 1);
        centerX = pins.analogReadPin(AnalogPin.P1);
        centerY = pins.analogReadPin(AnalogPin.P2);
        initialized = true;
    }

    /**
     * 指定したボタンで、押下または離されたタイミングでコールバックを実行します。
     */
    //% block="ボタン %button が %event のとき"
    //% weight=95
    //% help=github:pxt-yb-emh02/docs/on-button-event
    export function onButtonEvent(button: Button, event: ButtonEvent, handler: () => void) {
        init();
        control.onEvent(<number>button, <number>event, handler);
    }

    /**
     * ボタンが現在押されているかどうかを返します。
     */
    //% block="ボタン %button が押されている"
    //% weight=90
    //% help=github:pxt-yb-emh02/docs/is-button-pressed
    export function isButtonPressed(button: Button): boolean {
        init();
        return pins.digitalReadPin(button as number) == 0;
    }

    /**
     * ジョイスティックの傾きを、起動時の中心を基準に正規化した数値で返します。
     * X・Y はおおよそ -127〜127。**戻り値は常に整数**（デッドゾーンはマップ直後の値で判定し、それ以外は四捨五入）。`Axis.XY` は `x + 256 * y`。
     * 中央付近は小さなデッドゾーンがあり 0 になります。
     */
    //% block="ジョイスティック %axis の値"
    //% help=github:pxt-yb-emh02/docs/joystick-value
    export function joystickValue(axis: Axis): number {
        init();
        if (axis == Axis.XY) {
            let jx = joystickValueAxis(Axis.X);
            let jy = joystickValueAxis(Axis.Y);
            return jx + 256 * jy;
        }
        return joystickValueAxis(axis);
    }

    function joystickValueAxis(axis: Axis): number {
        let raw = pins.analogReadPin(axis as number);
        let center = axis == Axis.X ? centerX : centerY;
        let val = raw > center ? Math.map(raw, center, 1023, 0, 127) : Math.map(raw, 0, center, -127, 0);
        val = -val;
        return Math.abs(val) < 8 ? 0 : Math.round(val);
    }

    /**
     * `joystickValue(Axis.XY)` の戻り値（`x + 256 * y`）から X または Y 成分を取り出します。
     */
    //% block="ジョイスティック複合 %packed の %component"
    //% help=github:pxt-yb-emh02/docs/unpack-joystick-value
    export function unpackJoystickValue(packed: number, component: JoystickAxis): number {
        let jy = Math.trunc(packed / 256);
        let jx = packed - 256 * jy;
        return component == JoystickAxis.X ? jx : jy;
    }

    /**
     * ジョイスティックが指定した方向に、正規化値の絶対値が閾値以上傾いているかどうかを返します。
     * `joystickValue` と同じ符号（X: 左正・右負、Y: 上負・下正）です。
     */
    //% block="ジョイスティックが %direction に傾いている"
    //% help=github:pxt-yb-emh02/docs/joystick-direction
    export function joystickDirection(direction: JoystickDirection): boolean {
        init();
        let jx = joystickValue(Axis.X);
        let jy = joystickValue(Axis.Y);
        switch (direction) {
            case JoystickDirection.Up:
                return jy >= JOYSTICK_DIRECTION_THRESHOLD;
            case JoystickDirection.Down:
                return jy <= -JOYSTICK_DIRECTION_THRESHOLD;
            case JoystickDirection.Left:
                return jx >= JOYSTICK_DIRECTION_THRESHOLD;
            case JoystickDirection.Right:
                return jx <= -JOYSTICK_DIRECTION_THRESHOLD;
            default:
                return false;
        }
    }

    /**
     * 振動モータのオン・オフを切り替えます。制御はデジタルピン P0 に出力されます。
     */
    //% block="振動を %on にする"
    //% help=github:pxt-yb-emh02/docs/set-vibration
    export function setVibration(on: boolean): void {
        init();
        pins.digitalWritePin(DigitalPin.P0, on ? 1 : 0);
    }
}
