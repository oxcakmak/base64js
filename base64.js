class Base64 {

  static codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  static decode(input) {
    if (!input) {
      console.error("Input is null or undefined.");
      return "";
    }

    if (input.length % 4 !== 0) {
      console.error("Invalid Base64 string length.");
      return "";
    }

    let decoded = [];
    const codes = Base64.codes;
    const inChars = input.split("");
    let j = 0;
    const b = [];

    for (let i = 0; i < inChars.length; i += 4) {
      b[0] = codes.indexOf(inChars[i]);
      b[1] = codes.indexOf(inChars[i + 1]);
      b[2] = codes.indexOf(inChars[i + 2]);
      b[3] = codes.indexOf(inChars[i + 3]);

      decoded[j++] = (b[0] << 2) | (b[1] >> 4);

      if (b[2] < 64) {
        decoded[j++] = (b[1] << 4) | (b[2] >> 2);
        if (b[3] < 64) {
          decoded[j++] = (b[2] << 6) | b[3];
        }
      }
    }

    return String.fromCharCode(...decoded);
  }

  static encode(input) {
    if (!input) {
      console.error("Input is null or undefined.");
      return "";
    }

    const codes = Base64.codes;
    const inputArray = [...input];
    let out = "";

    for (let i = 0; i < inputArray.length; i += 3) {
      const b1 = inputArray[i].charCodeAt();
      const b2 = i + 1 < inputArray.length ? inputArray[i + 1].charCodeAt() : 0;
      const b3 = i + 2 < inputArray.length ? inputArray[i + 2].charCodeAt() : 0;

      out += codes[(b1 >> 2) & 0x3f];
      out += codes[((b1 << 4) | (b2 >> 4)) & 0x3f];
      out += i + 1 < inputArray.length ? codes[((b2 << 2) | (b3 >> 6)) & 0x3f] : "=";
      out += i + 2 < inputArray.length ? codes[b3 & 0x3f] : "=";
    }

    return out;
  }
}
