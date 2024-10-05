import { backend } from "../../declarations/backend";

window.onload = () => {
    document.getElementById('file').onchange = load_local_image;
    document.getElementById('checkDeepfake').onclick = checkDeepfake;
}

let uploadedFile = null;

async function load_local_image(event) {
    message("");
    let image = document.getElementById('image');
    try {
        uploadedFile = event.target.files[0];
        if (!uploadedFile) {
            return false;
        }
        const url = await toDataURL(uploadedFile);
        image.src = url;
    } catch (err) {
        message("Failed to select photo: " + err.toString());
    }
    return false;
}

function toDataURL(blob) {
    return new Promise((resolve, _) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onloadend = function () {
            resolve(fileReader.result);
        }
    });
}

async function checkDeepfake() {
    if (!uploadedFile) {
        message("Please upload an image first.");
        return;
    }
    
    message("Checking for deepfake...");
    try {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const result = await backend.check_deepfake(uint8Array);
        if (result.Ok !== undefined) {
            message(`Deepfake detection result: ${result.Ok ? "Deepfake detected" : "Not a deepfake"}`);
        } else {
            throw result.Err.message;
        }
    } catch (err) {
        console.error(`An error occurred: ${err}`);
        message("Error: " + err.toString());
    }
}

function message(m) {
    document.getElementById('message').innerText = m;
}