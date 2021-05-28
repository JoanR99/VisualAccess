const cheerio = require('cheerio');
const { H93 } = require('../utils/tests');

describe('Test unitarios del test "H93"', () => {
  test('test existe', () => {
    expect(H93).toBeTruthy();
  });

  test('se pasa un document html con dos elementos con atributos id diferentes.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<p id="hola">hola</p>
		<p id="adios">adios</p>
	</body>
	</html>`);
    const use = {
      verificationSteps: [
        [1, 1],
        [1, 1],
      ],
      elementCount: 2,
      errorCount: 0,
    };
    const r = await H93($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con dos elementos con atributos id iguales.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<p id="hola">hola</p>
		<p id="hola">hola</p>
	</body>
	</html>`);
    const use = {
      verificationSteps: [
        [1, 1],
        [1, 0],
      ],
      elementCount: 2,
      errorCount: 1,
    };
    const r = await H93($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con dos elementos sin atributos id.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<p>hola</p>
		<p>hola</p>
	</body>
	</html>`);
    const use = {
      verificationSteps: null,
      elementCount: null,
      errorCount: null,
    };
    const r = await H93($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H93();
    expect(r).toBeFalsy();
  });
});
