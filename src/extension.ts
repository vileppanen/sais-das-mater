import * as vscode from 'vscode';
import displaySizeCommand from './commands/display-size'

export function activate(context: vscode.ExtensionContext) {
	const displaySize = vscode.commands.registerCommand(displaySizeCommand.name, displaySizeCommand.handler)
	context.subscriptions.push(displaySize)
}

export function deactivate() {}
