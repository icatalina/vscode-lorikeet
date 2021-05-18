import { Instance } from 'tinycolor2';

export const generateVSCodePalette = (
    base: Instance,
    accentColor: Instance,
    secondAccent: Instance
) => {
    return {
        'activityBar.background': secondAccent.toHexString(),
        'activityBar.activeBorder': accentColor.toHexString(),
        'activityBarBadge.background': accentColor.toHexString(),
        'activityBarBadge.foreground': secondAccent.toHexString(),
        'activityBar.foreground': accentColor.toHexString(),
        'activityBar.inactiveForeground': accentColor
            .clone()
            .setAlpha(0.4)
            .toHex8String(),
        'statusBar.background': base.toHexString(),
        'statusBar.foreground': accentColor.toHexString(),
        'statusBarItem.hoverBackground': secondAccent.toHexString(),
        'titleBar.activeBackground': base.toHexString(),
        'titleBar.activeForeground': accentColor.toHexString(),
        'titleBar.inactiveBackground': base.toHexString(),
        'titleBar.inactiveForeground': accentColor
            .clone()
            .setAlpha(0.6)
            .toHex8String(),
    };
};
