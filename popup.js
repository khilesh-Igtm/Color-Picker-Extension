const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    // using this we will get all the chrome tabs as query
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // using this we can execute any script which we want to add in the browser 
    chrome.scripting.executeScript({
        // we pass the current tab id for injecting the script in it
        target: { tabId: tab.id },
        // this is what we want to inject( a function i.e pickcolor)
        function: pickColor,
    },
        async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                const color = data.result.sRGBHex;
                colorGrid.style.backgroundColor = color;
                colorValue.innerText = color;
                try {
                    await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.log(err);

                }

            }
        }
    );
});

// Remember : await is only used with async function
async function pickColor() {
    try {
        // picker or magnifier glass 
        // we are using eyedropper api for picking color from the site
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();

    } catch (err) {
        console.log(err);

    }
}