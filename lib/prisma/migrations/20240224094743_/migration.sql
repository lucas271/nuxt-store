-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('ADMIN', 'BASIC');

-- CreateEnum
CREATE TYPE "public"."CartStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL DEFAULT '#',
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."CartStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CartItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "product_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "category_name" TEXT,
    "brand_id" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "review_id" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Favorite" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "auth"."User"("name");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "auth"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_name_key" ON "auth"."User"("id", "name");

-- CreateIndex
CREATE INDEX "Cart_id_idx" ON "public"."Cart"("id");

-- CreateIndex
CREATE INDEX "CartItem_id_idx" ON "public"."CartItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_product_id_cart_id_key" ON "public"."CartItem"("product_id", "cart_id");

-- CreateIndex
CREATE INDEX "Product_id_name_idx" ON "public"."Product"("id", "name");

-- CreateIndex
CREATE INDEX "Review_id_idx" ON "public"."Review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_product_id_key" ON "public"."Review"("userId", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_review_id_key" ON "public"."Rating"("review_id");

-- CreateIndex
CREATE INDEX "Rating_id_idx" ON "public"."Rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_product_id_user_id_key" ON "public"."Rating"("product_id", "user_id");

-- CreateIndex
CREATE INDEX "Favorite_id_idx" ON "public"."Favorite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_product_id_user_id_key" ON "public"."Favorite"("product_id", "user_id");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "public"."Category"("name");

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "public"."Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_userName_fkey" FOREIGN KEY ("userId", "userName") REFERENCES "auth"."User"("id", "name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
