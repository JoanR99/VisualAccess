const cheerio = require('cheerio');
const { H46 } = require('../utils/tests');

describe('Test unitarios del test "H46"', () => {
  test('test existe', () => {
    expect(H46).toBeTruthy();
  });

  test('se pasa un document html con un elemento embed con un elemento noembed hijo que lo describe.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<embed src="#" type="">
			<noembed>hola</noembed>
		</embed>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H46($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento embed con un elemento noembed hermano que lo describe.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<embed src="#" type="" />
		<noembed>hola</noembed>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H46($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento embed sin un elemento noembed que lo describe.', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<embed src="#" type="" />
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H46($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin un elemento embed', async () => {
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
    const r = await H46($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H46();
    expect(r).toBeFalsy();
  });
});
