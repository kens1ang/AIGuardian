export const idlFactory = ({ IDL }) => {
  const Embedding = IDL.Vec(IDL.Float32);
  const Error = IDL.Record({ 'message' : IDL.Text });
  const Addition = IDL.Variant({ 'Ok' : Embedding, 'Err' : Error });
  const DeepfakeDetection = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : Error });
  const BoundingBox = IDL.Record({
    'x' : IDL.Float32,
    'y' : IDL.Float32,
    'height' : IDL.Float32,
    'width' : IDL.Float32,
  });
  const Detection = IDL.Variant({ 'Ok' : BoundingBox, 'Err' : Error });
  const Person = IDL.Record({ 'name' : IDL.Text, 'distance' : IDL.Float32 });
  const Recognition = IDL.Variant({ 'Ok' : Person, 'Err' : Error });
  return IDL.Service({
    'add' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [Addition], []),
    'append_deepfake_detection_model_bytes' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
    'append_face_detection_model_bytes' : IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
    'append_face_recognition_model_bytes' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
    'check_deepfake' : IDL.Func([IDL.Vec(IDL.Nat8)], [DeepfakeDetection], []),
    'clear_deepfake_detection_model_bytes' : IDL.Func([], [], []),
    'clear_face_detection_model_bytes' : IDL.Func([], [], []),
    'clear_face_recognition_model_bytes' : IDL.Func([], [], []),
    'detect' : IDL.Func([IDL.Vec(IDL.Nat8)], [Detection], ['query']),
    'recognize' : IDL.Func([IDL.Vec(IDL.Nat8)], [Recognition], []),
    'setup_models' : IDL.Func(
        [],
        [IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text })],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
