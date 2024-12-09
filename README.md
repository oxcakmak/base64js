## Usage
Add base64.js file to your project
```html
<script src="/path/to/base64.js"></script>
```
After importing you can encrypt and decrypt by calling
```javascript
const b64c = Base64;
try {
  const text = "Hello, World!";
  const encoded = b64c.encode(text);
  console.log("Encoded:", encoded); // Encoded: SGVsbG8sIFdvcmxkIQ==
  
  const decoded = b64c.decode(encoded);
  console.log("Decoded:", decoded); // Decoded: Hello, World!
  
  console.log("Is Valid Base64:", b64c.isValidBase64(encoded)); // true
} catch (error) {
  console.error("Error:", error.message);
}
```
