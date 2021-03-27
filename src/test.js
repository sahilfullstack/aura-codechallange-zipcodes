const { handler } = require("./index");
describe('basic tests', () => {
  
  beforeEach(() => {
    mockEvent = {
      queryParams: {}
    }
  });

  test('handler function exists', () => {
    expect(typeof handler).toBe('function');
  });


  test('find city by zip', async () => {
    mockEvent.queryParams.zip = '04985';
    const result = await handler(mockEvent);
    expect(result).toStrictEqual([
      {
        "zip": "04985",
        "type": "STANDARD",
        "primary_city": "West Forks",
        "acceptable_cities": "E Moxie Twp, East Moxie Twp, Indian Stream, Indian Stream Twp, Moxie Gore, Moxie Gore Twp, The Forks Plt",
        "unacceptable_cities": null,
        "state": "ME",
        "county": "Somerset County",
        "timezone": "America/New_York",
        "area_codes": "207",
        "latitude": "45.42",
        "longitude": "-69.97",
        "country": "US",
        "estimated_population": "0"
      }
    ]);
  });

  test('find multiple cities by "partial zip"', async () => {
    mockEvent.queryParams.zip = '050';
    const result = await handler(mockEvent);
    expect(result.length).toBeGreaterThan(1);
  });

  test('find city by name', async () => {
    mockEvent.queryParams.name = 'Sunderland';
    const result = await handler(mockEvent);
    expect(result).toStrictEqual([ {
      "zip": "01375",
      "type": "STANDARD",
      "primary_city": "Sunderland",
      "acceptable_cities": null,
      "unacceptable_cities": null,
      "state": "MA",
      "county": "Franklin County",
      "timezone": "America/New_York",
      "area_codes": "413",
      "latitude": "42.46",
      "longitude": "-72.58",
      "country": "US",
      "estimated_population": "2777"
    }]);
  });


  test('find closest city by lat/long', async () => {
    mockEvent.queryParams.lat = '44.63';
    mockEvent.queryParams.long = '-69.8';
    const result = await handler(mockEvent);
    expect(result).toStrictEqual([
      {
        "zip": "04978",
        "type": "STANDARD",
        "primary_city": "Smithfield",
        "acceptable_cities": null,
        "unacceptable_cities": null,
        "state": "ME",
        "county": "Somerset County",
        "timezone": "America/New_York",
        "area_codes": "207",
        "latitude": "44.63",
        "longitude": "-69.8",
        "country": "US",
        "estimated_population": "849"
      }
    ]);
  });

});