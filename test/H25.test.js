const cheerio = require('cheerio');
const { H25 } = require('../utils/tests');

describe('Test unitarios del test "H25"', () => {
  test('test existe', () => {
    expect(H25).toBeTruthy();
  });

  test('se pasa un document html con titulo valido', async () => {
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
    const r = await H25($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con titulo invalido', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title></title>
	</head>
	<body>
		
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H25($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin titulo', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		
	</head>
	<body>
		
	</body>
	</html>`);
    const use = {
      verificationSteps: 0,
      elementCount: null,
      errorCount: 1,
    };
    const r = await H25($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H25();
    expect(r).toBeFalsy();
  });
});
