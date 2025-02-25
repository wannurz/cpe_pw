//% weight=50 color=#FFA500 icon="\uf11b"
namespace cpe {
    /**
     * Enumeration of Motor Directions.
     */
    enum cpeMotor {
        //% block="Forward \u21c8"
        Forward,
        //% block="Backward \u21ca"
        Backward
    }

    /**
     * Enumeration of Servo Channels.
     */
    enum cpeServo {
        //% block="1"
        SV1,
        //% block="2"
        SV2
    }

    /**
     * Motor Block to drive the motor forward and backward.
     * The speed motor is adjustable between 0 to 100.
     * @param speed percent of maximum speed, eg: 50
     */
    //% blockId="cpe_Motor" block="Motor %cpeMotor|speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=95
    export function Motor(Motor: cpeMotor, speed: number): void {
        let motorspeed = pins.map(speed, 0, 100, 0, 1023)
        if (Motor == cpeMotor.Forward) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        if (Motor == cpeMotor.Backward) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }

    /**
     * Control Servo 1 or 2 set degree between 0 - 180
     * @param degree servo degree 0-180, eg: 90
     */
    //% blockId="cpe_Servo" block="Servo %cpeServo|Degree %degree"
    //% degree.min=0 degree.max=180
    //% weight=75
    export function Servo(servo: cpeServo, degree: number): void {
        let angle = Math.max(0, Math.min(180, degree));
        if (servo == cpeServo.SV1) {
            pins.servoWritePin(AnalogPin.P8, angle);
        }
        if (servo == cpeServo.SV2) {
            pins.servoWritePin(AnalogPin.P12, angle);
        }
    }
}
