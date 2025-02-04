-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "dateSurveyed" TIMESTAMP(3) NOT NULL,
    "jobNumber" TEXT NOT NULL,
    "poNumber" TEXT,
    "woNumber" TEXT,
    "reportNumber" TEXT,
    "jobDescription" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "inspector" TEXT NOT NULL,
    "inspectionRoute" TEXT NOT NULL,
    "equipmentUse" TEXT NOT NULL,
    "dateRegistered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jobs_jobNumber_key" ON "jobs"("jobNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
