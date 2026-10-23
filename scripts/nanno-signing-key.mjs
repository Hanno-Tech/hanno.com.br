// Creates the Ed25519 key that signs Nanno entitlements and stores the private half in Netlify
// (NANNO_SIGNING_KEY). Prints only the public key, which goes into the desktop app
// (apps/desktop/src/entitlement-key.js). Run once: node scripts/nanno-signing-key.mjs
// Running it again replaces the key, and every app built with the old public key stops
// accepting new entitlements, so only do that on purpose.
import { generateKeyPairSync } from "node:crypto";
import { execFileSync } from "node:child_process";

const { publicKey, privateKey } = generateKeyPairSync("ed25519");
const secret = privateKey.export({ format: "der", type: "pkcs8" }).toString("base64");
execFileSync("netlify", ["env:set", "NANNO_SIGNING_KEY", secret, "--secret", "--context", "production"], {
  stdio: ["ignore", "ignore", "inherit"],
});
console.log("✓ NANNO_SIGNING_KEY salvo no Netlify (secreto).\n\nChave pública para o app:\n");
console.log(publicKey.export({ format: "pem", type: "spki" }));
