CREATE MIGRATION m1x3dfwm5mqo2ctu77wxcw6vz5i5kydj3vsyxwcqaasjnayqh6xura
    ONTO initial
{
  CREATE TYPE default::Collection {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::Note {
      CREATE REQUIRED LINK collection: default::Collection;
      CREATE REQUIRED PROPERTY collection_id: std::str;
      CREATE REQUIRED PROPERTY content: std::str {
          SET default := '';
      };
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
