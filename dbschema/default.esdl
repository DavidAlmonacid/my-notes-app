module default {
  type Collection {
    required name: str;
    required created_at: datetime {
      default := (datetime_current());
      readonly := true;
    };
    required updated_at: datetime {
      default := (datetime_current());
    };
  }

  type Note {
    required title: str;
    required content: str {
      default := "";
    };
    required created_at: datetime {
      default := (datetime_current());
      readonly := true;
    };
    required updated_at: datetime {
      default := (datetime_current());
    };
    required collection: Collection;
  }
}
