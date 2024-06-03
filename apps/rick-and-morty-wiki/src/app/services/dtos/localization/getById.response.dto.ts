import { ILocation } from "../models/localizations";

export interface IgetByIdResponseDTO extends ILocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}