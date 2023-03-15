// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView, ipcRenderer, ipcMain, session } = require('electron');

const path = require('path');
const express = require('express');
const expressApp = express();
const http = require('http');
const server = http.createServer(expressApp);


let mainWindow;

expressApp.get('/:url', (req, res) => {
	mainWindow.loadURL(`https://online.metro-cc.ru/products/${req.params.url}`);
	
	console.log('url', req.params.url);
	
	ipcMain.once('vozvrat', (event, data) => {
		console.log('vozvart222', data);
		res.json(data);
	});
	
	mainWindow.webContents.once('did-finish-load', () => {
		mainWindow.webContents.executeJavaScript("electronAPI.vozvrat(+document.querySelector('.price__value').innerText.replace(' ', ''))");
	});
});

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	})
	// and load the index.html of the app.
	//mainWindow.loadFile('index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
	return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();
	
	const cookie = { url: 'https://online.metro-cc.ru/', name: 'metroStoreId', value: '10' };
	session.defaultSession.cookies.set(cookie)
	.then(() => {
		// success
	}, (error) => {
		console.error(error);
	});
	
	server.listen(7781, () => {
		console.log('listening on *:7781');
	});

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
