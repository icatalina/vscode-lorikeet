import { random, Instance, mostReadable, readability } from 'tinycolor2';

export const getRandomColor = (color = random()): Instance => {
    const contrast = mostReadable(color, ['#fff', '#000']);

    if (readability(contrast, color) > 9) {
        return color;
    }

    const newColor = color.isDark() ? color.darken(5) : color.lighten(5);

    return getRandomColor(newColor);
};
