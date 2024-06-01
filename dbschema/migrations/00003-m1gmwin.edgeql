CREATE MIGRATION m1gmwincfj4iz4wuwshyaj6jtsxxke33w6ihpxwo6klemzfmee7oyq
    ONTO m1dnuhgbph7a7eaerrkfteefk6hjw35upjenx4l3g3op5wx5lupq7q
{
  ALTER TYPE default::Note {
      ALTER PROPERTY content {
          SET default := '';
      };
  };
};
