// ================= DEMO 1 (Fixed shift = 3) =================
const fixedShift = 3;

function encryptTextDemo1() {
    const text = document.getElementById("textInput").value.toUpperCase();
    let result = "";

    for (let char of text) {
        if (char >= "A" && char <= "Z") {
            let code = char.charCodeAt(0) - 65;
            code = (code + fixedShift) % 26;
            result += String.fromCharCode(code + 65);
        } else {
            result += char;
        }
    }

    document.getElementById("result").innerText = result || "No Result";
}

function decryptTextDemo1() {
    const text = document.getElementById("textInput").value.toUpperCase();
    let result = "";

    for (let char of text) {
        if (char >= "A" && char <= "Z") {
            let code = char.charCodeAt(0) - 65;
            code = (code - fixedShift + 26) % 26;
            result += String.fromCharCode(code + 65);
        } else {
            result += char;
        }
    }

    document.getElementById("result").innerText = result || "No Result";
}

// ================= DEMO 2 (User key) =================
function getKey() {
    const key = parseInt(document.getElementById("keyInput").value);
    if (isNaN(key) || key < 0 || key > 25) {
        alert("Please enter a valid key between 0 and 25");
        return null;
    }
    return key;
}

function encryptTextDemo2() {
    const shift = getKey();
    if (shift === null) return;

    const text = document.getElementById("textInput2").value.toUpperCase();
    let result = "";

    for (let char of text) {
        if (char >= "A" && char <= "Z") {
            let code = char.charCodeAt(0) - 65;
            code = (code + shift) % 26;
            result += String.fromCharCode(code + 65);
        } else {
            result += char;
        }
    }

    document.getElementById("result2").innerText = result || "No Result";
}

function decryptTextDemo2() {
    const shift = getKey();
    if (shift === null) return;

    const text = document.getElementById("textInput2").value.toUpperCase();
    let result = "";

    for (let char of text) {
        if (char >= "A" && char <= "Z") {
            let code = char.charCodeAt(0) - 65;
            code = (code - shift + 26) % 26;
            result += String.fromCharCode(code + 65);
        } else {
            result += char;
        }
    }

    document.getElementById("result2").innerText = result || "No Result";
}

// ================= Brute Force Attack (Demo 2) =================
function bruteForceAttack1() {
    const text = document.getElementById("textInput2").value.toUpperCase();
    let output = "";

    for (let shift = 0; shift < 26; shift++) {
        let result = "";

        for (let char of text) {
            if (char >= "A" && char <= "Z") {
                let code = char.charCodeAt(0) - 65;
                code = (code - shift + 26) % 26;
                result += String.fromCharCode(code + 65);
            } else {
                result += char;
            }
        }

        output += `Key ${shift}: ${result}\n`;
    }

    document.getElementById("result2").innerText = output || "No Result";
}
// Page3===========================================================================================
function gcd(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return -1;
}

function encryptTextDemo3() {
    let text = document.getElementById("textInput3").value.toUpperCase();
    let a = parseInt(document.getElementById("keyAInput").value);
    let b = parseInt(document.getElementById("keyBInput4").value);

    if (gcd(a, 26) !== 1) {
        alert("Key a must be coprime with 26!");
        return;
    }

    let result = "";

    for (let ch of text) {
        if (ch >= 'A' && ch <= 'Z') {
            let x = ch.charCodeAt(0) - 65;
            let enc = (a * x + b) % 26;
            result += String.fromCharCode(enc + 65);
        } else {
            result += ch;
        }
    }

    document.getElementById("result3").innerHTML = "Encrypted: " + result;
}

function decryptTextDemo3() {
    let text = document.getElementById("textInput3").value.toUpperCase();
    let a = parseInt(document.getElementById("keyAInput").value);
    let b = parseInt(document.getElementById("keyBInput4").value);

    let a_inv = modInverse(a, 26);

    if (a_inv === -1) {
        alert("Invalid key a!");
        return;
    }

    let result = "";

    for (let ch of text) {
        if (ch >= 'A' && ch <= 'Z') {
            let x = ch.charCodeAt(0) - 65;
            let dec = (a_inv * (x - b + 26)) % 26;
            result += String.fromCharCode(dec + 65);
        } else {
            result += ch;
        }
    }

    document.getElementById("result3").innerHTML = "Decrypted: " + result;
}

function bruteForceAttack() {
    let text = document.getElementById("textInput3").value.toUpperCase();
    let output = "";

    for (let a = 1; a < 26; a++) {
        if (gcd(a, 26) === 1) {
            for (let b = 0; b < 26; b++) {

                let a_inv = modInverse(a, 26);
                let result = "";

                for (let ch of text) {
                    if (ch >= 'A' && ch <= 'Z') {
                        let x = ch.charCodeAt(0) - 65;
                        let dec = (a_inv * (x - b + 26)) % 26;
                        result += String.fromCharCode(dec + 65);
                    } else {
                        result += ch;
                    }
                }

                output += `a=${a}, b=${b} → ${result}<br>`;
            }
        }
    }

    document.getElementById("result3").innerHTML = output;
}
//  demo4===========================================================================================
function encrypt(text, key) {
      text = text.replace(/\s/g, ''); // remove spaces
      let cols = key;
      let rows = Math.ceil(text.length / cols);
      let grid = Array.from({ length: rows }, () => Array(cols).fill(''));
      let k = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (k < text.length) grid[r][c] = text[k++];
        }
      }
      let cipher = '';
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          cipher += grid[r][c];
        }
      }
      return cipher;
    }

    function decrypt(cipher, key) {
      let cols = key;
      let rows = Math.ceil(cipher.length / cols);
      let grid = Array.from({ length: rows }, () => Array(cols).fill(''));
      let k = 0;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (k < cipher.length) grid[r][c] = cipher[k++];
        }
      }
      let text = '';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          text += grid[r][c];
        }
      }
      return text;
    }

    document.getElementById('encryptBtn').addEventListener('click', () => {
      let text = document.getElementById('inputText').value;
      let key = parseInt(document.getElementById('key').value);
      document.getElementById('outputText').value = encrypt(text, key);
    });

    document.getElementById('decryptBtn').addEventListener('click', () => {
      let cipher = document.getElementById('inputText').value;
      let key = parseInt(document.getElementById('key').value);
      document.getElementById('outputText').value = decrypt(cipher, key);
    });

    // page 5 ==========================================================
     // Compute GCD
    function gcd(a, b) {
      while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
      }
      return a;
    }

    // Modular inverse using Extended Euclidean Algorithm
    function modInverse(e, phi) {
      let m0 = phi, t, q;
      let x0 = 0, x1 = 1;

      if (phi === 1) return 0;

      while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;

        phi = e % phi;
        e = t;
        t = x0;

        x0 = x1 - q * x0;
        x1 = t;
      }

      if (x1 < 0) x1 += m0;

      return x1;
    }

    // Generate keys
    function generateRSA(p, q) {
      const n = p * q;
      const phi = (p - 1) * (q - 1);

      // Choose e
      let e = 3;
      while (e < phi) {
        if (gcd(e, phi) === 1) break;
        e += 2;
      }

      const d = modInverse(e, phi);

      return { publicKey: [e, n], privateKey: [d, n] };
    }

    document.getElementById('generateBtn').addEventListener('click', () => {
      const p = parseInt(document.getElementById('primeP').value);
      const q = parseInt(document.getElementById('primeQ').value);

      if (!p || !q || p === q) {
        alert('Please enter two different prime numbers.');
        return;
      }

      const keys = generateRSA(p, q);
      document.getElementById('publicKey').value = `(${keys.publicKey[0]}, ${keys.publicKey[1]})`;
      document.getElementById('privateKey').value = `(${keys.privateKey[0]}, ${keys.privateKey[1]})`;
    });
    // Page6===================================================================
      function gcd(a, b) {
      while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
      }
      return a;
    }

    // Modular inverse
    function modInverse(e, phi) {
      let m0 = phi, t, q;
      let x0 = 0, x1 = 1;
      if (phi === 1) return 0;

      while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
      }
      if (x1 < 0) x1 += m0;
      return x1;
    }

    // Modular exponentiation
    function modPow(base, exponent, modulus) {
      if (modulus === 1) return 0;
      let result = 1;
      base = base % modulus;
      while (exponent > 0) {
        if (exponent % 2 === 1) result = (result * base) % modulus;
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
      }
      return result;
    }

    // Generate RSA keys
    function generateRSA(p, q) {
      const n = p * q;
      const phi = (p - 1) * (q - 1);
      let e = 3;
      while (e < phi) {
        if (gcd(e, phi) === 1) break;
        e += 2;
      }
      const d = modInverse(e, phi);
      return { publicKey: [e, n], privateKey: [d, n] };
    }

    // Encrypt message
    function encryptMessage(message, publicKey) {
      const [e, n] = publicKey;
      const encrypted = [];
      for (let i = 0; i < message.length; i++) {
        encrypted.push(modPow(message.charCodeAt(i), e, n));
      }
      return encrypted.join(',');
    }

    // Decrypt message
    function decryptMessage(cipherText, privateKey) {
      const [d, n] = privateKey;
      return cipherText.split(',').map(num => String.fromCharCode(modPow(parseInt(num), d, n))).join('');
    }

    let keys;

document.getElementById('generateBtn1').addEventListener('click', () => {
  const p = parseInt(document.getElementById('primeP1').value);
  const q = parseInt(document.getElementById('primeQ1').value);

  if (!p || !q || p === q) {
    alert('Enter two different primes.');
    return;
  }

  keys = generateRSA(p, q);

  document.getElementById('publicKey1').value =
    `(${keys.publicKey[0]}, ${keys.publicKey[1]})`;

  document.getElementById('privateKey1').value =
    `(${keys.privateKey[0]}, ${keys.privateKey[1]})`;
});

document.getElementById('encryptBtn1').addEventListener('click', () => {
  if (!keys) {
    alert('Generate keys first!');
    return;
  }

  const message = document.getElementById('message1').value;
  document.getElementById('outputText1').value =
    encryptMessage(message, keys.publicKey);
});

document.getElementById('decryptBtn1').addEventListener('click', () => {
  if (!keys) {
    alert('Generate keys first!');
    return;
  }

  const cipher = document.getElementById('outputText1').value;
  document.getElementById('outputText1').value =
    decryptMessage(cipher, keys.privateKey);
});

// go to page 
 document.getElementById("goPage").addEventListener("click", function() {
      window.location.href = "page2.html";
  });