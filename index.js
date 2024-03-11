const colorPicker = document.querySelector('.color-picker');
const getSchemeBtn = document.querySelector('.get-scheme');
const schemeSelect = document.querySelector('.custom-select');
const hexValContainer = document.querySelector('.hex-value-container');
const colorContainer = document.querySelector('.color-container');
const copyMessage = document.getElementById('copy-message')

const generateScheme = () => {
    const color = colorPicker.value.slice(1);
    const scheme = schemeSelect.value.toLowerCase();
    let apiUrl = 'https://www.thecolorapi.com/scheme';
    apiUrl += `?hex=${color}&mode=${scheme}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 5; i++) {
                const hexVal = data.colors[i].hex.value;
                hexValContainer.children[i].textContent = hexVal;
                colorContainer.children[i].style.backgroundColor = hexVal;
            }
        });
};


const copyToClipboard = (copyText) => {
    navigator.clipboard.writeText(copyText)
        .then(() => copyMessage.textContent = `Color copied to clipboard: ${copyText}`)
        .catch(err => copyMessage.textContent = `Unable to copy: ${err}`);
};

colorContainer.addEventListener('click', (event) => {
    const index = Array.from(colorContainer.children).indexOf(event.target);
    const hexValue = hexValContainer.children[index].textContent;

    copyToClipboard(hexValue);
    copyMessage.hidden = false;
});

getSchemeBtn.addEventListener("click", generateScheme);

generateScheme();
