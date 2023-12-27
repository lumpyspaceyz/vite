/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ehy8fdc2kugoc2v",
    "created": "2023-12-26 06:25:44.538Z",
    "updated": "2023-12-26 06:25:44.538Z",
    "name": "cards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wkzbcnjh",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ehy8fdc2kugoc2v");

  return dao.deleteCollection(collection);
})
