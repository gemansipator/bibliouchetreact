const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow() {
    // Получаем размеры экрана
    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

    // Проверяем, поддерживает ли экран 1920x1200
    const isWidescreen = screenHeight >= 1200 && screenWidth >= 1920

    // Выбираем разрешение: 1920x1200 (если поддерживается) или 1920x1080 (минимум)
    const windowWidth = 1920
    const windowHeight = isWidescreen ? 1200 : 1080

    // Если экран меньше выбранного разрешения - используем максимум доступного
    const finalWidth = Math.min(windowWidth, screenWidth)
    const finalHeight = Math.min(windowHeight, screenHeight)

    const win = new BrowserWindow({
        width: finalWidth,
        height: finalHeight,
        minWidth: 1920,  // Минимум Full HD
        minHeight: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    })

    // Центрируем окно
    win.center()

    // Загружаем index.html
    win.loadFile(path.join(__dirname, '..', 'build', 'index.html'))

    // Плавное появление после загрузки
    win.once('ready-to-show', () => {
        win.show()

        // Для отладки (можно удалить)
        console.log(`Запущено в ${finalWidth}x${finalHeight} (${isWidescreen ? '1920x1200' : '1920x1080'})`)
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})