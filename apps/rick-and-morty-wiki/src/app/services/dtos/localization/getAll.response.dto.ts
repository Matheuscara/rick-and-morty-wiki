import { IInfo } from "../models/info";
import { ILocation } from "../models/localizations";

export interface IgetAllResponseDTO {
    info: IInfo;
    results: ILocation[];
}