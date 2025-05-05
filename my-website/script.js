let hexInput = document.getElementById('hexInput');
let inputColor = document.getElementById('inputColor');
let slider = document.getElementById('slider');
let sliderText = document.getElementById('sliderText');
let alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const body = document.querySelector('body');

const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
  if (toggleButton.classList.contains('toggled')) {
    toggleButton.classList.remove('toggled');
    darkenText.classList.add('unselected');
    lightenText.classList.remove('unselected');
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    toggleButton.style.backgroundColor = 'white';
  } else {
    toggleButton.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    toggleButton.style.backgroundColor = 'black';
  }

  slider.value = 0;
  sliderText.textContent = slider.value + '%';
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Swifted Color: ${hexInput.value}`;
  reset();
});

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace('#', '');
  inputColor.style.backgroundColor = '#' + strippedHex;
  reset();
});

const isValidHex = (hex) => {
  if (!hex) return false;
  let strippedHex = hex[0] === '#' ? hex.slice(1) : hex;
  const validCharacters = 'abcdefABCDEF0123456789';

  for (let i = 0; i < strippedHex.length; i++) {
    if (!validCharacters.includes(strippedHex[i])) return false;
  }

  return strippedHex.length === 3 || strippedHex.length === 6;
};

const hexToRGB = (hex) => {
  if (!isValidHex(hex)) return null;
  let strippedHex = hex.replace('#', '');

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] + strippedHex[0] +
      strippedHex[1] + strippedHex[1] +
      strippedHex[2] + strippedHex[2];
  }

  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

const convertRGBToHex = (r, g, b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  return '#' + firstPair + secondPair + thirdPair;
};

const alterColor = (hex, percentage) => {
  const rgb = hexToRGB(hex);
  if (!rgb) return hex;

  const amount = Math.floor((percentage / 100) * 255);

  const newR = Math.max(0, Math.min(rgb.r + amount, 255));
  const newG = Math.max(0, Math.min(rgb.g + amount, 255));
  const newB = Math.max(0, Math.min(rgb.b + amount, 255));

  return convertRGBToHex(newR, newG, newB);
};

slider.addEventListener('input', () => {
  if (!isValidHex(hexInput.value)) return;

  sliderText.textContent = slider.value + '%';
  const valueAddition = toggleButton.classList.contains('toggled')
    ? -slider.value
    : +slider.value;

  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Swifted Color: ${alteredHex}`;
});

const reset = () => {
  slider.value = 0;
  sliderText.textContent = slider.value + '%';
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Swifted: ${hexInput.value}`;
};
