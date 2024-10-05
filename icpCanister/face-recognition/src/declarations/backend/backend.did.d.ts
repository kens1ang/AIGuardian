import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Addition = { 'Ok' : Embedding } |
  { 'Err' : Error };
export interface BoundingBox {
  'x' : number,
  'y' : number,
  'height' : number,
  'width' : number,
}
export type DeepfakeDetection = { 'Ok' : boolean } |
  { 'Err' : Error };
export type Detection = { 'Ok' : BoundingBox } |
  { 'Err' : Error };
export type Embedding = Array<number>;
export interface Error { 'message' : string }
export interface Person { 'name' : string, 'distance' : number }
export type Recognition = { 'Ok' : Person } |
  { 'Err' : Error };
export interface _SERVICE {
  'add' : ActorMethod<[string, Uint8Array | number[]], Addition>,
  'append_deepfake_detection_model_bytes' : ActorMethod<
    [Uint8Array | number[]],
    undefined
  >,
  'append_face_detection_model_bytes' : ActorMethod<
    [Uint8Array | number[]],
    undefined
  >,
  'append_face_recognition_model_bytes' : ActorMethod<
    [Uint8Array | number[]],
    undefined
  >,
  'check_deepfake' : ActorMethod<[Uint8Array | number[]], DeepfakeDetection>,
  'clear_deepfake_detection_model_bytes' : ActorMethod<[], undefined>,
  'clear_face_detection_model_bytes' : ActorMethod<[], undefined>,
  'clear_face_recognition_model_bytes' : ActorMethod<[], undefined>,
  'detect' : ActorMethod<[Uint8Array | number[]], Detection>,
  'recognize' : ActorMethod<[Uint8Array | number[]], Recognition>,
  'setup_models' : ActorMethod<[], { 'Ok' : null } | { 'Err' : string }>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
