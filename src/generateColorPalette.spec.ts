import tinycolor, { readability } from 'tinycolor2';
import { generateColorPalette, getAccentColor } from './generateColorPalette';
import { getRandomColor } from './getRandomColor';

expect.extend({
    toBeReadable(received, contrast, level = 5) {
        const readLevel = readability(received, contrast);
        if (readLevel > level) {
            return {
                message: () =>
                    `Color ${received} should not be readable on ${contrast}: ${readLevel}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `Color ${received} is not readable on ${contrast}: ${readLevel}`,
                pass: false,
            };
        }
    },
});

it('generates from a dark color', () => {
    const test = Array.from(Array(400), () => getRandomColor());

    const result = test.map(color => {
        const processed = generateColorPalette(color);

        return {
            color,
            accent: processed.accent.toHexString(),
            secondAccent: processed.secondAccent.toHexString(),
            base: processed.base.toHexString(),
        };
    });

    result.forEach(color => {
        expect(color.base).toEqual(color.color);
        // @ts-ignore
        expect(color.base).toBeReadable(color.accent);
    });
});

it('generates from a dark color', () => {
    const processed = generateColorPalette('#d68fe5');

    expect(processed.accent.toHexString()).not.toEqual('#ffffff');
});

it('generates a correct accent color', () => {
    const color = tinycolor('#731d97');

    //@ts-ignore
    expect(getAccentColor(color)).toBeReadable(color);
});

it('if the color does not have enough contrast, takes it to the extreme (white)', () => {
    const color = tinycolor('#ff0000');

    expect(getAccentColor(color).toHexString()).toEqual('#ffffff');
});
