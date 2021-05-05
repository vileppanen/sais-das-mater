import { Command } from "./command-interface"
import * as vscode from 'vscode';

const Bytes = {
    KILOBYTE: 1024,
    MEGABYTE: 1048576,
    GIGABYTE: 1073741824
}
const getSelection = (editor: vscode.TextEditor | undefined) => {
    vscode.workspace
    const selection = editor?.selection
    const selectedString = editor?.document.getText(selection) || 'no editor'
    return selectedString
}
const roundedSize = (size: number, decimals: number = 2) => Number(Math.round(Number(size + 'e' + decimals)) + 'e-' + decimals);
const getSize = (selectedText: string) => {
    const bytes = Buffer.byteLength(selectedText)
    if (bytes < Bytes.KILOBYTE) {
        return { size: bytes, unit: 'B'}
    }
    if (bytes < Bytes.MEGABYTE) {
        return { size: roundedSize(bytes / Bytes.KILOBYTE), unit: 'kB' }
    }
    if (bytes < Bytes.GIGABYTE) {
        return { size: roundedSize(bytes / Bytes.MEGABYTE), unit: 'MB' }
    } else {
        return { size: roundedSize(bytes / Bytes.GIGABYTE), unit: 'GB'}
    }
}
const commandHandler = () => {
    const selection = getSelection(vscode.window.activeTextEditor)
    
    if (selection !== 'no editor') {
        const {size, unit} = getSize(selection)
        vscode.window.showInformationMessage(`Selection size: ${size} ${unit}`)
    } else {
        vscode.window.showInformationMessage('No active editor')
    }
}

const command: Command = {
    name: 'sais-das-mater.displaySize',
    handler: commandHandler
}

export default command