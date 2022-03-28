export default function getCenter(component: Component): Coordinates{
    return {
        x: component.x + component.width / 2,
        y: component.y + component.height / 2
    };
}