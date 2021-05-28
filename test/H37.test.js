const cheerio = require('cheerio');
const { H37 } = require('../utils/tests');

describe('Test unitarios del test "H37"', () => {
  test('test existe', () => {
    expect(H37).toBeTruthy();
  });

  test('se pasa un document html con un elemento image con un atributo alt valido.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<img src="#" alt="hola" />
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H37($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento image con un atributo alt vacio.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
	<img src="#" alt="" />
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H37($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin un elemento image', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		
	</body>
	</html>`);
    const use = {
      verificationSteps: null,
      elementCount: null,
      errorCount: null,
    };
    const r = await H37($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H37();
    expect(r).toBeFalsy();
  });
});
