#!/bin/bash
set -e

# Set the network to IC mainnet
NETWORK="ic"

# Clear existing model bytes
dfx canister --network $NETWORK call backend clear_face_detection_model_bytes
dfx canister --network $NETWORK call backend clear_face_recognition_model_bytes
dfx canister --network $NETWORK call backend clear_deepfake_detection_model_bytes

# Upload model files
ic-file-uploader --network $NETWORK backend append_face_detection_model_bytes version-RFB-320.onnx
ic-file-uploader --network $NETWORK backend append_face_recognition_model_bytes face-recognition.onnx
ic-file-uploader --network $NETWORK backend append_deepfake_detection_model_bytes ultralight_deepfake_detector.onnx

# Setup models
dfx canister --network $NETWORK call backend setup_models