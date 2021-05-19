// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import tinycolor from 'tinycolor2';
import * as vscode from 'vscode';
import { generateColorPalette } from './generateColorPalette';
import { generateVSCodePalette } from './generateVSCodePalette';
import { getRandomColor } from './getRandomColor';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
    registerCommands();

    setColorPalette(getCurrentColor() ?? getRandomColor());
}

const setColorPalette = (base: string) => {
    const config = vscode.workspace.getConfiguration();
    const palette = generateColorPalette(base);

    const lorikeetPalette = generateVSCodePalette(
        palette.base,
        palette.accent,
        palette.secondAccent
    );

    const currentColors =
        config.inspect<Record<string, string>>('workbench.colorCustomizations')
            ?.workspaceValue ?? {};

    config.update(
        'workbench.colorCustomizations',
        {
            ...currentColors,
            ...lorikeetPalette,
        },
        vscode.ConfigurationTarget.Workspace
    );

    config.update('lorikeet.color', base, vscode.ConfigurationTarget.Workspace);
};

const registerCommands = () => {
    vscode.commands.registerCommand('lorikeet.surpriseMe', () => {
        const newColor = getRandomColor();

        setColorPalette(newColor);
    });

    vscode.commands.registerCommand('lorikeet.darken', () => {
        const color = getCurrentColor();
        const newColor = tinycolor(color).darken();

        setColorPalette(newColor.toHexString());
    });

    vscode.commands.registerCommand('lorikeet.lighten', () => {
        const color = getCurrentColor();
        const newColor = tinycolor(color).lighten();

        setColorPalette(newColor.toHexString());
    });

    vscode.commands.registerCommand('lorikeet.saturate', () => {
        const color = getCurrentColor();
        const newColor = tinycolor(color).saturate();

        setColorPalette(newColor.toHexString());
    });

    vscode.commands.registerCommand('lorikeet.desaturate', () => {
        const color = getCurrentColor();
        const newColor = tinycolor(color).desaturate();

        setColorPalette(newColor.toHexString());
    });
};

const getCurrentColor = (): string | undefined => {
    const config = vscode.workspace.getConfiguration();
    const configuredColor = config.inspect<string>('lorikeet.color');

    return configuredColor?.workspaceValue;
};