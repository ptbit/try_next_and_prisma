-- CreateTable
CREATE TABLE "Tool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "loanStatus" TEXT NOT NULL,
    "arrivalDate" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "functionalStatus" TEXT NOT NULL,
    "usagePermissions" TEXT NOT NULL,
    "certification" TEXT NOT NULL,
    "wikiID" TEXT NOT NULL
);
