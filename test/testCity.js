
QUnit.module('getCity', function() {
  QUnit.test('good coordinates', async function(assert) {
    const city = await getCity(37.1734995, -3.5995337)
    assert.equal(city, "Granada");
  })

  QUnit.test('bad coordinates', async function(assert) {
    const city = await getCity(00000, -000000)
    assert.equal(city, false);
  })
});