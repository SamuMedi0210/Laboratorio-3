import { ShipperEntity } from "../entities/shipper.entity";

export interface ResponseAllShipper{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: ShipperEntity[];
}