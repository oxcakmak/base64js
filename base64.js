class Base64 {
  static codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  /**
   * Decodes a Base64 encoded string.
   * @param {string} input - The Base64 string to decode.
   * @returns {string} - The decoded string.
   * @throws Will throw an error if the input is invalid.
   */
  static decode(input) {
    if (typeof input !== "string" || !input) {
      throw new Error("Input must be a non-empty string.");
    }

    if (input.length % 4 !== 0 || /[^A-Za-z0-9+/=]/.test(input)) {
      throw new Error("Invalid Base64 string.");
    }

    const decoded = [];
    const codes = Base64.codes;
    const inChars = input.split("");
    const b = [];

    for (let i = 0; i < inChars.length; i += 4) {
      b[0] = codes.indexOf(inChars[i]);
      b[1] = codes.indexOf(inChars[i + 1]);
      b[2] = codes.indexOf(inChars[i + 2]);
      b[3] = codes.indexOf(inChars[i + 3]);

      decoded.push((b[0] << 2) | (b[1] >> 4));

      if (b[2] < 64) {
        decoded.push((b[1] << 4) | (b[2] >> 2));
        if (b[3] < 64) {
          decoded.push((b[2] << 6) | b[3]);
        }
      }
    }

    return String.fromCharCode(...decoded);
  }

  /**
   * Encodes a string to Base64 format.
   * @param {string} input - The string to encode.
   * @returns {string} - The Base64 encoded string.
   * @throws Will throw an error if the input is invalid.
   */
  static encode(input) {
    if (typeof input !== "string" || !input) {
      throw new Error("Input must be a non-empty string.");
    }

    const codes = Base64.codes;
    const inputArray = [...input];
    const output = [];

    for (let i = 0; i < inputArray.length; i += 3) {
      const b1 = inputArray[i].charCodeAt();
      const b2 = i + 1 < inputArray.length ? inputArray[i + 1].charCodeAt() : 0;
      const b3 = i + 2 < inputArray.length ? inputArray[i + 2].charCodeAt() : 0;

      output.push(codes[(b1 >> 2) & 0x3f]);
      output.push(codes[((b1 << 4) | (b2 >> 4)) & 0x3f]);
      output.push(i + 1 < inputArray.length ? codes[((b2 << 2) | (b3 >> 6)) & 0x3f] : "=");
      output.push(i + 2 < inputArray.length ? codes[b3 & 0x3f] : "=");
    }

    return output.join("");
  }

  /**
   * Validates if a string is a valid Base64 encoded string.
   * @param {string} input - The string to validate.
   * @returns {boolean} - True if valid Base64, false otherwise.
   */
  static isValidBase64(input) {
    if (typeof input !== "string" || !input) {
      return false;
    }
    return /^[A-Za-z0-9+/=]+$/.test(input) && input.length % 4 === 0;
  }
}
