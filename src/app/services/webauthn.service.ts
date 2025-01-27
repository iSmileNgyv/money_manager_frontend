import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {

  constructor() { }
  private generateRandomBuffer(length: number): Uint8Array {
    const randomBuffer = new Uint8Array(length);
    window.crypto.getRandomValues(randomBuffer);
    return randomBuffer;
  }

  private guidToUint8Array(guid: string): Uint8Array {
    const hex = guid.replace(/-/g, "");
    const buffer = new Uint8Array(16);
    for (let i = 0; i < hex.length; i += 2) {
      buffer[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return buffer;
  }

  async register() {
    const challenge = this.generateRandomBuffer(32);
    const userId = this.guidToUint8Array("unique-user-id");

    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: challenge,
      rp: { name: "MoneyManager" },
      user: {
        id: userId,
        name: "inagiyev@icloud.com",
        displayName: "User Example"
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
      timeout: 60000,
      attestation: "direct"
    };

    try {
      const credential = await navigator.credentials.create({ publicKey }) as PublicKeyCredential;
      const rawId = new Uint8Array(credential.rawId);

      const attestationResponse = credential.response as AuthenticatorAttestationResponse;

      const serverPayload = {
        credentialId: credential.id,
        rawId: Array.from(rawId),
        clientDataJSON: Array.from(new Uint8Array(attestationResponse.clientDataJSON)),
        attestationObject: Array.from(new Uint8Array(attestationResponse.attestationObject))
      };

      console.log("Registration successful! Store this data on the server:", serverPayload);
      localStorage.setItem('auth', JSON.stringify(serverPayload));
      return credential;
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  }

  async authenticate(storedCredential: any) {
    const challenge = this.generateRandomBuffer(32);

    const publicKey: PublicKeyCredentialRequestOptions = {
      challenge: challenge,
      allowCredentials: [{ id: new Uint8Array(storedCredential.rawId), type: "public-key" }],
      userVerification: "required",
      timeout: 60000
    };

    try {
      const credential = await navigator.credentials.get({ publicKey }) as PublicKeyCredential;
      const assertionResponse = credential.response as AuthenticatorAssertionResponse;

      const assertion = {
        credentialId: credential.id,
        rawId: Array.from(new Uint8Array(credential.rawId)),
        signature: Array.from(new Uint8Array(assertionResponse.signature)),
        clientDataJSON: Array.from(new Uint8Array(assertionResponse.clientDataJSON)),
        authenticatorData: Array.from(new Uint8Array(assertionResponse.authenticatorData)),
        challenge: Array.from(challenge)
      };

      console.log("Authentication successful! Send this assertion to the server for verification:", assertion);
      return credential;
    } catch (err) {
      console.error("Authentication failed:", err);
      throw err;
    }
  }



  private storeCredential(credential: PublicKeyCredential, challenge: Uint8Array) {
    const credentialData = {
      rawId: Array.from(new Uint8Array(credential.rawId)), // Converts the raw ID to an array for storage
      challenge: Array.from(challenge) // Converts the challenge to an array for storage
    };
    localStorage.setItem('webauthn_credential', JSON.stringify(credentialData)); // Store the data as a JSON string
  }

  private getStoredCredential(): any {
    const storedCredential = localStorage.getItem('webauthn_credential');
    return storedCredential ? JSON.parse(storedCredential) : null; // Parse the stored JSON back into an object
  }

  deviceType(): string {
    const userAgent: string = navigator.userAgent;
    let deviceType: string = 'Unknown';
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      deviceType = 'iOS Device';
    } else if (/Android/i.test(userAgent)) {
      deviceType = 'Android Device';
    } else if (/Mac/i.test(userAgent)) {
      deviceType = 'Mac';
    } else if (/Windows/i.test(userAgent)) {
      deviceType = 'Windows PC';
    }
    return deviceType;
  }
}
