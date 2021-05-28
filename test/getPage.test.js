const getPage = require('../utils/getPage');

describe('test unitarios de getPage', () => {
  test('El metodo existe', () => {
    expect(getPage).toBeTruthy();
  });

  test('Se pasa un parametro valido', async () => {
    const document = await getPage('https://www.google.com/');
    expect(document).toBeTruthy();
  });

  test('Se pasa un parametro invalido', async () => {
    const document = await getPage('hllk');
    expect(document).toBeFalsy();
  });

  test('Se pasa un parametro vacio', async () => {
    const document = await getPage();
    expect(document).toBeFalsy();
  });
});
