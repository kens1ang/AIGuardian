# ICP Deepfake Detection

This is an ICP smart contract running deepfake image detection that can be uploaded from a local file.

The smart contract consists of two canisters:

- the backend canister embeds the [the Tract ONNX inference engine](https://github.com/sonos/tract) with the ONNX model used to detect deepfake image.
- the frontend canister contains the Web assets such as HTML, JS, CSS that are served to the browser.

# Models

The smart contract uses a pre-trained mobile-net deepfake detection model, exported in `.onnx` format.

# Dependencies

Install `dfx`, Rust, etc: https://internetcomputer.org/docs/current/developer-docs/getting-started/hello-world

Install `wasi2ic`:
- Follow the steps in https://github.com/wasm-forge/wasi2ic
- Make sure that `wasi2ic` binary is in your `$PATH`.

Install NodeJS dependencies for the frontend:

```bash
npm install
```

Install `wasm-opt`:

```bash
cargo install wasm-opt
```

# Build

```bash
dfx start --background
dfx deploy
```

If the deployment is successful, the it will show the `frontend` URL.
Open that URL in browser to interact with the smart contract.

# Chunk uploading of models

Since the models are large, they cannot be embedded into the Wasm binary of the smart contract.
Instead they should be uploaded separately.

[DecideAI](https://decideai.xyz/) implemented a tool for incremental uploading of models: https://github.com/modclub-app/ic-file-uploader/tree/main.

You can install the tool with

```bash
cargo install ic-file-uploader
```

Afterwards, execute the `upload-models-to-canister.sh` script, which runs the following commands:
```bash
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
```

# Credits 

Thanks to [DecideAI](https://decideai.xyz/) for discussions and providing [ic-file-uploader](https://github.com/modclub-app/ic-file-uploader/tree/main).

