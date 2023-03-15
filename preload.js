const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    daiMne: (callback) => ipcRenderer.on('daimne', callback),
	vozvrat: (data) => ipcRenderer.send('vozvrat', data),
	vozvrat2: () => ipcRenderer.send('vozvrat', document.querySelector('p').innerHTML),
});



// ipcRenderer.on('tvoimne', function() {
	// const html = document.querySelector('p').innerHTML;
	// console.log('tvoimne', 123);
	// ipcRenderer.send('vozvrat', html);
// });

// ipcRenderer.on('asynchronous-reply', (_event, arg) => {
	// console.log(arg) // prints "pong" in the DevTools console
// });