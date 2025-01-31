(async () => {
  // Function to generate a SHA-256 hash localement
  async function sha256(str) {
    // Encoder le string en tableau d'octets
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    
    // Calculer le hash avec l'API Web Crypto
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    
    // Convertir le buffer en tableau d'octets
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Convertir les octets en string hexadécimal
    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return hashHex;
  }

  // Function to generate a secure anonymous
  async function anonymousGenerator(input) {
    // Convert the input string to a SHA-256 hash
    const hash = await sha256(input);

    // Take the first 15 characters of the hash
    const first15Chars = hash.substring(0, 15);

    // Convert the first occurrence of a letter to uppercase and add a dot
    let transformed = '';
    let letterFound = false;

    for (let i = 0; i < first15Chars.length; i++) {
      const char = first15Chars[i];
      if (!letterFound && /[a-z]/.test(char)) {
        transformed += char.toUpperCase() + '.';
        letterFound = true;
      } else {
        transformed += char;
      }
    }

    return transformed;
  }

  // Function to generate and display the anonymous
  async function generateAnonymous() {
    const userInput = document.querySelector('#userInput').value.trim();

    // Validate the user input
    if (!userInput) {
      alert('Please enter a value.');
      return;
    }

    const anonymous = await anonymousGenerator(userInput);
    const outputElement = document.querySelector('#output');
    outputElement.textContent = anonymous;
  }

  // Add an event listener for the anonymous generation button
  document.querySelector('#generateButton').addEventListener('click', generateAnonymous);
})();