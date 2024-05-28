module default {
  type Collection {
    required name: str;
  }

  type Note {
    required content: str;
    required collection: Collection;
  }
}
