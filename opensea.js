async function get() {
	return window.electronAPI.daiMne(async (t, walletId) => {
		const response = await fetch(`https://api.opensea.io/api/v1/assets?format=json&owner=${walletId}`);
		const json = await response.json();
		window.electronAPI.vozvrat(JSON.stringify(json, null, 2));
	});
}

get();