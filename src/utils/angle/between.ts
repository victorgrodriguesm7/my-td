interface BetweenProps {
    origin: Coordinates;
    target: Coordinates;
}

export function between({
    origin,
    target
}: BetweenProps){
    return Math.atan2(origin.y - target.y, origin.x - target.x) * 180 / Math.PI
}