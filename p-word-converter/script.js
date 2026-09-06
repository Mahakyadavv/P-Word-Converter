const input = document.getElementById('text-input');
const output = document.getElementById('text-output');
const copyButton = document.getElementById('copy-btn');
const clearButton = document.getElementById('clear-btn');

// Replace only the star character with a lowercase p.
// Keep everything else, including spaces and word casing, exactly as typed.
function convertText(text) {
    if (!text.trim()) {
        return '';
    }

    return text.replace(/\*/g, 'p');
}

function updateOutput() {
    const text = input.value;
    output.value = convertText(text);
}

async function copyOutput() {
    const textToCopy = output.value;

    if (!textToCopy) {
        return;
    }

    try {
        await navigator.clipboard.writeText(textToCopy);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 1200);
    } catch (error) {
        // Fallback for browsers that block clipboard access.
        output.focus();
        output.select();
        document.execCommand('copy');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 1200);
    }
}

function clearFields() {
    input.value = '';
    output.value = '';
    input.focus();
}

input.addEventListener('input', updateOutput);
copyButton.addEventListener('click', copyOutput);
clearButton.addEventListener('click', clearFields);

updateOutput();