function gira() {
  var arcos = document.querySelectorAll('#graficos .arco');

  elem = 0;

  while (elem < arcos.length) {
    var identificador = 'e13m3nt0' + elem;
    var grados = (parseInt(arcos[elem].innerHTML) / 100) * 180;

    document.styleSheets[0].insertRule(
      '#' +
        identificador +
        '::before {transition: transform 3s cubic-bezier(.3,.2,.45,1.5) 1s; transform: rotate(' +
        grados +
        'deg)}',
      document.styleSheets[0].cssRules.length
    );

    arcos[elem].setAttribute('id', identificador);

    elem++;
  }
}

onload = gira;
