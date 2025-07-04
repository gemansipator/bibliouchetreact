const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        maximize: true, // Запуск в развернутом режиме
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // Загружаем собранное приложение
    win.loadFile(path.join(__dirname, 'build', 'index.html')); // Для продакшена
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