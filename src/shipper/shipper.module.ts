import { Module } from '@nestjs/common';

import { ShipperService } from './shipper.service';
import { ShipperController } from './shipper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipperEntity } from './entities/shipper.entity';

@Module({
  controllers: [ShipperController],
  providers: [ShipperService],
  imports: [
    TypeOrmModule.forFeature([ ShipperEntity ])
  ]
})
export class ShipperModule {}
