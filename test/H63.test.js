const cheerio = require('cheerio');
const { H63 } = require('../utils/tests');

describe('Test unitarios del test "H63"', () => {
  test('test existe', () => {
    expect(H63).toBeTruthy();
  });

  test('se pasa un document html con un elemento th con un atributo scope valido.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<table>
    <tr>
    <th scope="row">hola</th>
    </tr>
		</table>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H63($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento th con un atributo scope invalido.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<table>
		<th scope="hola">hola</th>
		</table>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H63($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento  th con sin un atributo scope.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<table>
		<th>hola</th>
		</table>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H63($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin un elemento  th.', async () => {
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
    const r = await H63($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H63();
    expect(r).toBeFalsy();
  });
});
