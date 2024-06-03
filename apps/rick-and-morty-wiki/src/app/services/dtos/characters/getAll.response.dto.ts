import { ICharacter } from "../models/characters";
import { IInfo } from "../models/info";

export interface IgetAllResponseDTO {
    info: IInfo;
    results: ICharacter[];
}