import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./backend.did.js";
// Replace with your canister ID
const canisterId = "d56ds-tqaaa-aaaah-qds3q-cai";
// Create an agent
const agent = new HttpAgent({ host: "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io" });
export const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});