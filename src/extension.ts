// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateColorPalette } from './generateColorPalette';
import { generateVSCodePalette } from './generateVSCodePalette';
import { getRandomColor } from './getRandomColor';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
    registerCommands();

    const config = vscode.workspace.getConfiguration();
    const configuredColor = config.inspect<string>('lorikeet.color');

    if (!configuredColor) {
        return;
    }

    setColorPalette(
        configuredColor.workspaceValue ?? getRandomColor().toHexString()
    );
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
    vscode.commands.registerCommand('lorikeet.randomizeColor', () => {
        const newColor = getRandomColor().toHexString();

        vscode.window.showInformationMessage(newColor);

        setColorPalette(newColor);
    });
};

// this method is called when your extension is deactivated
export function deactivate() {}
