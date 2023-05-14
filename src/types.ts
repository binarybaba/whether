export type TomorrowWeatherValues = {
  cloudBase: number;
  cloudCeiling: number;
  cloudCover: 100;
  dewPoint: number;
  freezingRainIntensity: number;
  humidity: number;
  precipitationProbability: 0;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: 0;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: 333;
  windGust: number;
  windSpeed: number;
};

export type TomorrowWeatherFineValues = {
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  evapotranspirationAvg: number;
  evapotranspirationMax: number;
  evapotranspirationMin: number;
  evapotranspirationSum: number;
  freezingRainIntensityAvg: number;
  freezingRainIntensityMax: number;
  freezingRainIntensityMin: number;
  humidityAvg: number;
  humidityMax: number;
  humidityMin: number;
  iceAccumulationAvg: number;
  iceAccumulationLweAvg: number;
  iceAccumulationLweMax: number;
  iceAccumulationLweMin: number;
  iceAccumulationLweSum: number;
  iceAccumulationMax: number;
  iceAccumulationMin: number;
  iceAccumulationSum: number;
  moonriseTime: string;
  moonsetTime: string;
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  pressureSurfaceLevelAvg: number;
  pressureSurfaceLevelMax: number;
  pressureSurfaceLevelMin: number;
  rainAccumulationAvg: number;
  rainAccumulationLweAvg: number;
  rainAccumulationLweMax: number;
  rainAccumulationLweMin: number;
  rainAccumulationMax: number;
  rainAccumulationMin: number;
  rainAccumulationSum: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sleetAccumulationAvg: number;
  sleetAccumulationLweAvg: number;
  sleetAccumulationLweMax: number;
  sleetAccumulationLweMin: number;
  sleetAccumulationLweSum: number;
  sleetAccumulationMax: number;
  sleetAccumulationMin: number;
  sleetIntensityAvg: number;
  sleetIntensityMax: number;
  sleetIntensityMin: number;
  snowAccumulationAvg: number;
  snowAccumulationLweAvg: number;
  snowAccumulationLweMax: number;
  snowAccumulationLweMin: number;
  snowAccumulationLweSum: number;
  snowAccumulationMax: number;
  snowAccumulationMin: number;
  snowAccumulationSum: number;
  snowIntensityAvg: number;
  snowIntensityMax: number;
  snowIntensityMin: number;
  sunriseTime: string;
  sunsetTime: string;
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  uvHealthConcernAvg: number;
  uvHealthConcernMax: number;
  uvHealthConcernMin: number;
  uvIndexAvg: number;
  uvIndexMax: number;
  uvIndexMin: number;
  visibilityAvg: number;
  visibilityMax: number;
  visibilityMin: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
};

export type TomorrowForecast = {
  timelines: {
    minutely: Array<TomorrowWeatherValues>;
    hourly: Array<TomorrowWeatherValues>;
    daily: Array<{
      time: string;
      values: TomorrowWeatherFineValues;
    }>;
  };
};

export type MapsCoGeocode = {
  bounding_box: Array<number>;
  class: string;
  display_name: string;
  importance: number;
  lat: number;
  lon: number;
  osm_id: string;
  osm_type: string;
  place_id: number;
  powered_by: string;
  type: string;
};

export type MapsCoReverseGeocode = MapsCoGeocode & {
  address: {
    country: string;
    country_code: string;
    city?: string;
    place?: string;
    municipality?: string;
    county?: string;
    state?: string;
    town?: string;
  };
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export type Location = {
  geocode: Partial<MapsCoReverseGeocode> & Coordinates;
  weather?: TomorrowForecast;
};
