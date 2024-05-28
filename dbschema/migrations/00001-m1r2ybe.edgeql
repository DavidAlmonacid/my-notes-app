CREATE MIGRATION m1r2ybe72gnc7f5zyfnqin4wiyi3s4zesxi4lxmr6axemtvgzrfp4q
    ONTO initial
{
  CREATE TYPE default::Collection {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Note {
      CREATE REQUIRED LINK collection: default::Collection;
      CREATE REQUIRED PROPERTY content: std::str;
  };
};
