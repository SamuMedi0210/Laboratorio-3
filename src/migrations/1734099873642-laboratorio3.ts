import { MigrationInterface, QueryRunner } from "typeorm";

export class Laboratorio31734099873642 implements MigrationInterface {
    name = 'Laboratorio31734099873642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_methods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "payment_method" character varying NOT NULL, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_status_enum" AS ENUM('CREATED', 'MODIFIED', 'PENDING_APPROVAL', 'APPROVED', 'IN_PROCESS', 'PROCESSED', 'REJECTED', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "status" "public"."purchase_status_enum" NOT NULL DEFAULT 'CREATED', "customer_id" uuid, "payment_method_id" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "contact" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" integer, "country" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "last_name" character varying NOT NULL, "first_name" character varying NOT NULL, "birth_date" date NOT NULL, "city" character varying NOT NULL, "phote" character varying NOT NULL, "note" character varying, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipper" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "shipper_name" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_b83858f68f5c3acfab73b61caa5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "order_date" character varying NOT NULL, "customer_id" uuid, "employee_id" uuid, "shipper_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "quantity" integer NOT NULL, "order_id" uuid, "product_id" uuid, CONSTRAINT "PK_39c7d4260520bd85b6fd76f6443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_2248a331258d17d204ccfe9497c" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_2d44d35774ef22e1a580ca062b2" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_f1c2079aca31a2cae19e1f68a9c" FOREIGN KEY ("shipper_id") REFERENCES "shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetail" ADD CONSTRAINT "FK_0e0d330ac878ca03bef8df98878" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetail" ADD CONSTRAINT "FK_609b4ac75dd54f312eb1a219180" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderDetail" DROP CONSTRAINT "FK_609b4ac75dd54f312eb1a219180"`);
        await queryRunner.query(`ALTER TABLE "orderDetail" DROP CONSTRAINT "FK_0e0d330ac878ca03bef8df98878"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f1c2079aca31a2cae19e1f68a9c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_2d44d35774ef22e1a580ca062b2"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_2248a331258d17d204ccfe9497c"`);
        await queryRunner.query(`DROP TABLE "orderDetail"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "shipper"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment_methods"`);
    }

}
