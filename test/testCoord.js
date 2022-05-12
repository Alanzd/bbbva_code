
QUnit.module('getCoordinates', function() {
  QUnit.test('good City', async function(assert) {
    const coordinates = await getCoordinates("Granada")
    assert.equal(coordinates.lat, 37.1734995);
    assert.equal(coordinates.lon, -3.5995337);
  })

  QUnit.test('bad City', async function(assert) {
    const coordinates = await getCoordinates("AbsurdCity")
    assert.equal(coordinates, false);
  })
});