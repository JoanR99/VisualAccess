const cheerio = require('cheerio');
const { H64 } = require('../utils/tests');

describe('Test unitarios del test "H64"', () => {
  test('test existe', () => {
    expect(H64).toBeTruthy();
  });

  test('se pasa un document html con un elemento iframe con un atributo title.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<iframe src="#" frameborder="0" title="hola" ></iframe>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H64($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento iframe con un atributo title vacio.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<iframe src="#" frameborder="0" title="" ></iframe>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H64($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento iframe sin un atributo title.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<iframe src="#" frameborder="0" ></iframe>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H64($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin un elemento iframe.', async () => {
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
    const r = await H64($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H64();
    expect(r).toBeFalsy();
  });
});
