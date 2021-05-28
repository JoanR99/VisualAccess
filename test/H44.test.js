const cheerio = require('cheerio');
const { H44 } = require('../utils/tests');

describe('Test unitarios del test "H44"', () => {
  test('test existe', () => {
    expect(H44).toBeTruthy();
  });

  test('se pasa un document html con un elemento input con un atributo id asociado al atributo for de un elemento label.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<form>
			<input type="text" name="hola" id="hola" />
			<label for="hola">hola</label>
		</form>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H44($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento input sin un atributo id.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<form>
			<input type="text" name="hola" />
			<label for="hola">hola</label>
		</form>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H44($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento input con un atributo id que no esta asociado a ningun atributo for de un elemento label.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<form>
			<input type="text" name="hola" id="hola" />
			<label for="adios">hola</label>
		</form>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H44($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin un elemento input', async () => {
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
    const r = await H44($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H44();
    expect(r).toBeFalsy();
  });
});
