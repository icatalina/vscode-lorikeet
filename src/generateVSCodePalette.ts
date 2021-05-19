import { Instance } from 'tinycolor2';

export const generateVSCodePalette = (
    base: Instance,
    accentColor: Instance,
    secondAccent: Instance
) => {
    return {
        'activityBar.activeBorder': accentColor.toHexString(),
        'activityBar.background': secondAccent.toHexString(),
        'activityBar.border': secondAccent.toHexString(),
        'activityBar.foreground': accentColor.toHexString(),
        'activityBar.inactiveForeground': accentColor.clone().setAlpha(0.4).toHex8String(),
        'activityBarBadge.background': accentColor.toHexString(),
        'activityBarBadge.foreground': secondAccent.toHexString(),
        'statusBar.background': base.toHexString(),
        'statusBar.border': base.toHexString(),
        'statusBar.foreground': accentColor.toHexString(),
        'statusBarItem.hoverBackground': secondAccent.toHexString(),
        'titleBar.activeBackground': base.toHexString(),
        'titleBar.activeForeground': accentColor.toHexString(),
        'titleBar.border': base.toHexString(),
        'titleBar.inactiveBackground': base.toHexString(),
        'titleBar.inactiveForeground': accentColor.clone().setAlpha(0.6).toHex8String(),
    };
};
