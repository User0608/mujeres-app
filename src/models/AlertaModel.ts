import { Multimedia } from './Multimedia';
export interface AlertaModel {
    alerta_id: 1,
    latitude: string,
    longitude: string,
    usuario_id: number,
    estado: string,
    created: string,
    updated: string,
    delete: string | null
    multimedias: Array<Multimedia>
}