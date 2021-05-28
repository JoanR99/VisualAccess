const cheerio = require('cheerio');
const { H35 } = require('../utils/tests');

describe('Test unitarios del test "H35"', () => {
  test('test existe', () => {
    expect(H35).toBeTruthy();
  });

  test('se pasa un document html con un elemento applet con un atributo alt valido e igual al contenido textual', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<applet alt="hola">
		hola
		</applet>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H35($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento applet con un atributo alt valido y diferente al contenido textual', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<applet alt="hola">
		adios
		</applet>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H35($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento applet con un atributo alt  vacio', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<applet alt="">
		adios
		</applet>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H35($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin elementos applet', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		
	</head>
	<body>
		
	</body>
	</html>`);
    const use = {
      verificationSteps: null,
      elementCount: null,
      errorCount: null,
    };
    const r = await H35($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H35();
    expect(r).toBeFalsy();
  });
});
