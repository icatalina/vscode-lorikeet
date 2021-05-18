import tinycolor from 'tinycolor2';
import color, { Instance, mix, mostReadable, readability } from 'tinycolor2';

export const generateColorPalette = (baseColor: string) => {
    const base = color(baseColor);

    const secondAccent = getSecondAccent(base);
    const accent = getAccentColor(base);

    return {
        base,
        accent,
        secondAccent,
    };
};

const DISTANCE = 5;

const isLight = (color: Instance) => {
    const dark = tinycolor('#333');
    const light = tinycolor('#fff');
    const endColor = mostReadable(color, [dark, light]);

    return endColor.toHexString() === dark.toHexString();
};

const getSecondAccent = (color: Instance, amount: number = 5): Instance => {
    const endColor = isLight(color)
        ? tinycolor('#000000')
        : tinycolor('#ffffff');

    const secondAccent = mix(color, endColor, amount);

    if (readability(secondAccent, color) > 1.5) {
        return secondAccent;
    }

    return getSecondAccent(color, amount + 5);
};

export const getAccentColor = (color: Instance, step = DISTANCE): Instance => {
    const contrast = isLight(color)
        ? color.clone().darken(step)
        : color.clone().lighten(step);

    if (readability(contrast, color) > 8 || step > 100) {
        return contrast;
    }

    return getAccentColor(color, step + DISTANCE);
};
