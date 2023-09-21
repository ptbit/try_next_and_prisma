-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "arrivalAt" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "wikiID" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "legalStatusId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Tool_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tool_legalStatusId_fkey" FOREIGN KEY ("legalStatusId") REFERENCES "LegalStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tool_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tool" ("arrivalAt", "id", "legalStatusId", "locationId", "model", "note", "origin", "serialNumber", "statusId", "title", "wikiID") SELECT "arrivalAt", "id", "legalStatusId", "locationId", "model", "note", "origin", "serialNumber", "statusId", "title", "wikiID" FROM "Tool";
DROP TABLE "Tool";
ALTER TABLE "new_Tool" RENAME TO "Tool";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
