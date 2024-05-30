CREATE MIGRATION m1dnuhgbph7a7eaerrkfteefk6hjw35upjenx4l3g3op5wx5lupq7q
    ONTO m1r2ybe72gnc7f5zyfnqin4wiyi3s4zesxi4lxmr6axemtvgzrfp4q
{
  ALTER TYPE default::Collection {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Note {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY title: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
