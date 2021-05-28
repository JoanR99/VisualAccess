const btn = document.getElementById('play');
const result = document.getElementById('result').innerText;
const level = document.getElementById('level').innerText;
btn.addEventListener('click', () => {
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = `El resultado es ${result} de accesibilidad, lo que puede considerarse una ${level}`;
    msg.lang = 'es';
    window.speechSynthesis.speak(msg);
  } else {
    alert("Sorry, your browser doesn't support the speech synthesis API !");
  }
});

window.addEventListener('load', () => {
  document.getElementById('play').focus();
});
