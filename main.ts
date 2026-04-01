/** YB-EMH02 向け拡張（ボタン・ジョイスティック・振動）。ブロックのヘルプは docs の Markdown（`//% help=github:pxt-yb-emh02/docs/名前`、拡張子なし）。 */
//% weight=100 color=#488470 icon="\uf11b" block="コントローラ"
namespace ybemh02 {
    let initialized = false;
    const JOYSTICK_CENTER = 512;
    const JOYSTICK_SCALE_DIV = 4;
    const JOYSTICK_ROUND_BIAS = 2;
    const JOYSTICK_VALUE_MAX = 127;
    const JOYSTICK_DIRECTION_THRESHOLD_PERCENT = 60;
    const JOYSTICK_DIRECTION_THRESHOLD = Math.idiv(JOYSTICK_VALUE_MAX * JOYSTICK_DIRECTION_THRESHOLD_PERCENT, 100);

    export enum JoystickMode {
        //% block="通常"
        Normal = 0,
        //% block="詳細"
        Detailed = 1
    }

    let joystickMode = JoystickMode.Normal;

    /** B1〜B4 → P13〜P16。 */
    export enum Button {
        B1 = DigitalPin.P13,
        B2 = DigitalPin.P14,
        B3 = DigitalPin.P15,
        B4 = DigitalPin.P16
    }

    /** X / Y アナログ、またはパック済み XY（`x + 256*y`）。 */
    export enum Axis {
        X = AnalogPin.P2,
        Y = AnalogPin.P1,
        //% block="XY"
        XY = -1
    }

    export enum JoystickAxis {
        //% block="X"
        X = 0,
        //% block="Y"
        Y = 1
    }

    export enum JoystickDirection {
        //% block="上"
        Up = 0,
        //% block="下"
        Down = 1,
        //% block="左"
        Left = 2,
        //% block="右"
        Right = 3,
        //% block="中央"
        Center = 4
    }

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
        initialized = true;
    }

    //% block="ジョイスティックモードを %mode に設定する"
    //% weight=93
    //% help=github:pxt-yb-emh02/docs/set-joystick-mode
    export function setJoystickMode(mode: JoystickMode): void {
        joystickMode = mode;
    }

    /** ボタンの押下 / 離しでハンドラを実行。 */
    //% block="ボタン %button が %event のとき"
    //% weight=95
    //% help=github:pxt-yb-emh02/docs/on-button-event
    export function onButtonEvent(button: Button, event: ButtonEvent, handler: () => void) {
        init();
        control.onEvent(<number>button, <number>event, handler);
    }

    /** いまボタンが押されていれば真。 */
    //% block="ボタン %button が押されている"
    //% weight=90
    //% help=github:pxt-yb-emh02/docs/is-button-pressed
    export function isButtonPressed(button: Button): boolean {
        init();
        return pins.digitalReadPin(button as number) == 0;
    }

    /** アナログを `idiv(raw-512±2,4)` を反転・クリップした整数。**通常**はさらに `idiv(|v|+8,16)*16-1`。**XY** は `x+256y`。 */
    //% block="ジョイスティック %axis の値"
    //% help=github:pxt-yb-emh02/docs/joystick-value
    export function joystickValue(axis: Axis): number {
        init();
        if (axis == Axis.XY) {
            let jx = applyJoystickMode(joystickValueAxis(Axis.X));
            let jy = applyJoystickMode(joystickValueAxis(Axis.Y));
            return jx + 256 * jy;
        }
        return applyJoystickMode(joystickValueAxis(axis));
    }

    function joystickValueAxis(axis: Axis): number {
        let raw = pins.analogReadPin(axis as number);
        let d = raw - JOYSTICK_CENTER;
        let q = Math.idiv(d + (d >= 0 ? JOYSTICK_ROUND_BIAS : -JOYSTICK_ROUND_BIAS), JOYSTICK_SCALE_DIV);
        let val = -q;
        if (val < -JOYSTICK_VALUE_MAX) val = -JOYSTICK_VALUE_MAX;
        else if (val > JOYSTICK_VALUE_MAX) val = JOYSTICK_VALUE_MAX;
        return val;
    }

    function applyJoystickMode(val: number): number {
        if (joystickMode != JoystickMode.Normal || val == 0) return val;
        let sign = val > 0 ? 1 : -1;
        let a = Math.abs(val);
        let mag = Math.idiv(a + 8, 16) * 16 - 1;
        if (mag < 0) return 0;
        return sign * mag;
    }

    /** `x+256y` から X または Y を取り出す。 */
    //% block="ジョイスティックXY %packed の %component"
    //% help=github:pxt-yb-emh02/docs/unpack-joystick-value
    export function unpackJoystickValue(packed: number, component: JoystickAxis): number {
        // `packed = x + 256*y` かつ `x` は [-127,127] なので、
        // `packed/256` を四捨五入すると常に `y` を復元できる。
        let jy = Math.round(packed / 256);
        let jx = packed - 256 * jy;
        return component == JoystickAxis.X ? jx : jy;
    }

    function directionState(jx: number, jy: number, direction: JoystickDirection): boolean {
        switch (direction) {
            case JoystickDirection.Up:
                return jy >= JOYSTICK_DIRECTION_THRESHOLD;
            case JoystickDirection.Down:
                return jy <= -JOYSTICK_DIRECTION_THRESHOLD;
            case JoystickDirection.Left:
                return jx <= -JOYSTICK_DIRECTION_THRESHOLD;
            case JoystickDirection.Right:
                return jx >= JOYSTICK_DIRECTION_THRESHOLD;
            case JoystickDirection.Center:
                return Math.abs(jx) < JOYSTICK_DIRECTION_THRESHOLD && Math.abs(jy) < JOYSTICK_DIRECTION_THRESHOLD;
            default:
                return false;
        }
    }

    /** `joystickValue` ベース（JoystickMode 反映済み）。閾値は最大振幅の 60%。 */
    //% block="ジョイスティックが %direction に傾いている"
    //% help=github:pxt-yb-emh02/docs/joystick-direction
    export function joystickDirection(direction: JoystickDirection): boolean {
        init();
        let jx = joystickValue(Axis.X);
        let jy = joystickValue(Axis.Y);
        return directionState(jx, jy, direction);
    }

    /** P0 で振動 ON/OFF。 */
    //% block="振動を %on にする"
    //% help=github:pxt-yb-emh02/docs/set-vibration
    export function setVibration(on: boolean): void {
        init();
        pins.digitalWritePin(DigitalPin.P0, on ? 1 : 0);
    }
}
