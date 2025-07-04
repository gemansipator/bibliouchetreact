const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        maximize: true, // Максимизирует окно при запуске
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Загружаем React-приложение через локальный сервер
    win.loadURL('http://localhost:3000');

    // Открываем DevTools для отладки (по желанию, закомментируй, если не нужно)
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});