-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM (
  'ACTIVE',
  'INACTIVE',
  'SUSPENDED'
);

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM (
  'USER',
  'ADMIN'
);

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM (
  'OWNER',
  'STAFF',
  'CUSTOMER'
);

-- CreateEnum
CREATE TYPE "ThemePreference" AS ENUM (
  'SYSTEM',
  'LIGHT',
  'DARK'
);

-- CreateEnum
CREATE TYPE "UAppSource" AS ENUM (
  'USER',
  'UNIQE',
  'GOOGLE_PLAY',
  'APP_STORE'
);

-- CreateEnum
CREATE TYPE "UAppPlatform" AS ENUM (
  'WEB',
  'ANDROID',
  'IOS',
  'WINDOWS',
  'MACOS',
  'LINUX',
  'MULTI'
);

-- CreateEnum
CREATE TYPE "UAppType" AS ENUM (
  'WEB_APP',
  'INSTALLABLE',
  'HYBRID'
);

-- CreateEnum
CREATE TYPE "UAppStatus" AS ENUM (
  'AVAILABLE',
  'DEVELOPMENT',
  'COMING_SOON',
  'EXPERIMENTAL'
);

-- CreateEnum
CREATE TYPE "UAppAccent" AS ENUM (
  'BLUE',
  'PURPLE',
  'GREEN',
  'ORANGE',
  'BLACK',
  'PINK',
  'RED'
);

-- CreateEnum
CREATE TYPE "UAppReleaseStatus" AS ENUM (
  'STABLE',
  'BETA',
  'DEVELOPMENT',
  'COMING_SOON'
);

-- CreateEnum
CREATE TYPE "UAppReviewStatus" AS ENUM (
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED'
);

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "avatarUrl" TEXT,
  "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
  "role" "UserRole" NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "bio" TEXT,
  "avatarUrl" TEXT,
  "language" TEXT NOT NULL DEFAULT 'en',
  "theme" "ThemePreference" NOT NULL DEFAULT 'SYSTEM',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "theme" "ThemePreference" NOT NULL DEFAULT 'SYSTEM',
  "language" TEXT NOT NULL DEFAULT 'en',
  "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "targetId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "icon" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "read" BOOLEAN NOT NULL DEFAULT false,
  "href" TEXT,
  "icon" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "readAt" TIMESTAMP(3),

  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "tokenId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UApp" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "source" "UAppSource" NOT NULL,
  "sourceLabel" TEXT NOT NULL,
  "platform" "UAppPlatform" NOT NULL,
  "platformLabel" TEXT NOT NULL,
  "type" "UAppType" NOT NULL,
  "typeLabel" TEXT NOT NULL,
  "status" "UAppStatus" NOT NULL,
  "statusLabel" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "cover" TEXT,
  "accent" "UAppAccent" NOT NULL,
  "href" TEXT NOT NULL,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "version" TEXT,
  "official" BOOLEAN NOT NULL DEFAULT false,
  "releaseLabel" TEXT,
  "productCode" TEXT,
  "releaseStatus" "UAppReleaseStatus",
  "reviewStatus" "UAppReviewStatus" NOT NULL DEFAULT 'DRAFT',
  "rejectionReason" TEXT,
  "creatorId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "UApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key"
ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key"
ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key"
ON "UserPreferences"("userId");

-- CreateIndex
CREATE INDEX "Favorite_userId_idx"
ON "Favorite"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx"
ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx"
ON "Notification"("userId", "read");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenId_key"
ON "RefreshToken"("tokenId");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx"
ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_revokedAt_idx"
ON "RefreshToken"("userId", "revokedAt");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx"
ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE INDEX "UApp_source_idx"
ON "UApp"("source");

-- CreateIndex
CREATE INDEX "UApp_status_idx"
ON "UApp"("status");

-- CreateIndex
CREATE INDEX "UApp_category_idx"
ON "UApp"("category");

-- CreateIndex
CREATE INDEX "UApp_creatorId_idx"
ON "UApp"("creatorId");

-- CreateIndex
CREATE INDEX "UApp_reviewStatus_idx"
ON "UApp"("reviewStatus");

-- CreateIndex
CREATE INDEX "UApp_featured_idx"
ON "UApp"("featured");

-- AddForeignKey
ALTER TABLE "UserProfile"
ADD CONSTRAINT "UserProfile_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences"
ADD CONSTRAINT "UserPreferences_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite"
ADD CONSTRAINT "Favorite_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken"
ADD CONSTRAINT "RefreshToken_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UApp"
ADD CONSTRAINT "UApp_creatorId_fkey"
FOREIGN KEY ("creatorId")
REFERENCES "User"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;