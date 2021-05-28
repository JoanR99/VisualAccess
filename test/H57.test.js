const cheerio = require('cheerio');
const { H57 } = require('../utils/tests');

describe('Test unitarios del test "H57"', () => {
  test('test existe', () => {
    expect(H57).toBeTruthy();
  });

  test('se pasa un document html con un elemento html con un atributo lang valido.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H57($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento html con un atributo lang vacio.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="">
	<head>
		<title>Document</title>
	</head>
	<body>
		
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H57($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento html sin un atributo lang.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html>
	<head>
		<title>Document</title>
	</head>
	<body>
		
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H57($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H57();
    expect(r).toBeFalsy();
  });
});
