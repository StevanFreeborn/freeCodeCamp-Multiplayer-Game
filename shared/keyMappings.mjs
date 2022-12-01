import playerVelocities from "../shared/playerVelocities.mjs"

export default {
    ArrowUp: playerVelocities.up,
    ArrowDown: playerVelocities.down,
    ArrowRight: playerVelocities.right,
    ArrowLeft: playerVelocities.left,
    w: playerVelocities.up,
    s: playerVelocities.down,
    d: playerVelocities.right,
    a: playerVelocities.left,
}