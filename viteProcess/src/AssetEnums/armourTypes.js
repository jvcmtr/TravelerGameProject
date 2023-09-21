import slots from "./armourSlots"

const ArmourType = {
    MASK : [
        slots.FACE
    ],
    HAT : [
        slots.HEAD
    ],
    HELMET : [
        slots.FACE,
        slots.HEAD
    ],
    CLOAK : [
        slots.HEAD, 
        slots.BODY1
    ],
    CAPE : [
        slots.BODY1
    ],
    VEST : [
        SLOTS.BODY2
    ],
    ARMOUR : [
        SLOTS.BODY1,
        SLOTS.BODY2
    ]
}
export default ArmourType