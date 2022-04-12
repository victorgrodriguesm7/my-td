interface CellsCount {
    horizontal: number;
    vertical: number;

    total: number;
}
export default function getCellsCount(screenSize: ScreenSize, size: number): CellsCount{
    const pixelCount = screenSize.width * screenSize.height;

    return {
        horizontal: screenSize.width / size,
        vertical: screenSize.height / size,
        total: (pixelCount) / (size * size)
    }
}