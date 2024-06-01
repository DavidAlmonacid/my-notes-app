CREATE MIGRATION m1cnnn6cc63dxsmhjbeh3ysitove2z66yrcknt2lia4cughjmdxvlq
    ONTO m1gmwincfj4iz4wuwshyaj6jtsxxke33w6ihpxwo6klemzfmee7oyq
{
  ALTER TYPE default::Note {
      CREATE REQUIRED PROPERTY collection_id: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
