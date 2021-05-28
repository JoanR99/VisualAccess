const cheerio = require('cheerio');
const { H32 } = require('../utils/tests');

describe('Test unitarios del test "H32"', () => {
  test('test existe', () => {
    expect(H32).toBeTruthy();
  });

  test('se pasa un document html con un elemento form que tiene cambio de contexto', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<form>
			<button type="submit">Submit</button>
		</form>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 1]],
      elementCount: 1,
      errorCount: 0,
    };
    const r = await H32($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con un elemento form que no tiene cambio de contexto', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Document</title>
	</head>
	<body>
		<form>
		</form>
	</body>
	</html>`);
    const use = {
      verificationSteps: [[1, 0]],
      elementCount: 1,
      errorCount: 1,
    };
    const r = await H32($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html con dos elementos form, con y sin cambio de contexto', async () => {
    const $ = await cheerio.load(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<form>
			<button type="submit">submit</button>
		</form>
		<form></form>
	</head>
	<body>
		
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
    const r = await H32($);
    expect(r).toMatchObject(use);
  });

  test('se pasa un document html sin elementos form', async () => {
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
    const r = await H32($);
    expect(r).toMatchObject(use);
  });

  test('no se pasa document html', async () => {
    const r = await H32();
    expect(r).toBeFalsy();
  });
});
