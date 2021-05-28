const cheerio = require('cheerio');
const { H96 } = require('../utils/tests');

describe('Test unitarios del test "H96"', () => {
  test('test existe', () => {
    expect(H96).toBeTruthy();
  });

  test('se pasa un document html con un elemento video con un elemento track con el atributo kind igual a descriptions.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<video src="#">
			<track kind="descriptions"></track>
		</video>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H96($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento video con un elemento track con el atributo kind invalido.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<video src="#">
			<track kind="hola"></track>
		</video>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H96($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento video con un elemento track con el atributo kind vacio.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<video src="#">
			<track kind=""></track>
		</video>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H96($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento video sin un elemento track.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<video src="#">
		</video>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H96($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin un elemento video.', async () => {
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
    const r = await H96($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H96();
    expect(r).toBeFalsy();
  });
});
