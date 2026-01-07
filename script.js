// Add any interactive/animated effects beyond CSS here

// Example: Chakra sound effect or more fancy chakra pulsating, etc.
// For now, just a small form alert:

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Message sent, young ninja! The Hokage will answer your secret message soon!");
    this.reset();
});
