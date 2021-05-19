import { Instance, mostReadable, random, readability } from 'tinycolor2';

const getColor = (color = random()): Instance => {
    const contrast = mostReadable(color, ['#fff', '#000']);

    if (readability(contrast, color) > 9) {
        return color;
    }

    const newColor = color.isDark() ? color.darken(5) : color.lighten(5);

    return getColor(newColor);
};

export const getRandomColor = (): string => {
    return getColor().toHexString();
}
