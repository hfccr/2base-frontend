export const proofObj = {
  identifier:
    "0x57006663efd9757f4242d12d5fa0cb371c8cec187728564c927f526f9e7537e9",
  claimData: {
    provider: "http",
    parameters:
      '{"additionalClientOptions":{},"body":"","geoLocation":"","headers":{"user-agent":"Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.69 Mobile Safari/537.36"},"method":"GET","paramValues":{"username":"brijeshagal"},"responseMatches":[{"invert":false,"type":"contains","value":"<span class=\\"color-fg-muted\\">({{username}})</span>"}],"responseRedactions":[{"jsonPath":"","regex":"<span\\\\ class=\\"color\\\\-fg\\\\-muted\\">\\\\((.*)\\\\)</span>","xPath":""}],"url":"https://github.com/settings/profile"}',
    owner: "0x3265a3b4bd9e8f919f4feb8dc330bdbcc3591bff",
    timestampS: 1728735041,
    context:
      '{"contextAddress":"0x0","contextMessage":"","extractedParameters":{"username":"brijeshagal"},"providerHash":"0x74734677e529e5d823b3a2845799a908ab59d2afa9ac168c6fd5d57d1b0e319f"}',
    identifier:
      "0x57006663efd9757f4242d12d5fa0cb371c8cec187728564c927f526f9e7537e9",
    epoch: 1,
  },
  signatures: [
    "0x9c716d8108481724134d92e52a18f31a1f15810d0dc3a58175544a5fcbf136576ca3679db6359681c476ceac1e180a9a3bb3b2482846a95f57ff6450fbd1133c1c",
  ],
  witnesses: [
    {
      id: "0x244897572368eadf65bfbc5aec98d8e5443a9072",
      url: "wss://witness.reclaimprotocol.org/ws",
    },
  ],
  publicData: {},
};

/**
 * {
  "provider": "http",
  "parameters": "{\"additionalClientOptions\":{},\"body\":\"\",\"geoLocation\":\"\",\"headers\":{\"user-agent\":\"Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.69 Mobile Safari/537.36\"},\"method\":\"GET\",\"paramValues\":{\"username\":\"brijeshagal\"},\"responseMatches\":[{\"invert\":false,\"type\":\"contains\",\"value\":\"<span class=\\\"color-fg-muted\\\">({{username}})</span>\"}],\"responseRedactions\":[{\"jsonPath\":\"\",\"regex\":\"<span\\\\ class=\\\"color\\\\-fg\\\\-muted\\\">\\\\((.*)\\\\)</span>\",\"xPath\":\"\"}],\"url\":\"https://github.com/settings/profile\"}",
  "owner": "0x3265a3b4bd9e8f919f4feb8dc330bdbcc3591bff",
  "timestampS": 1729193300,
  "context": "{\"contextAddress\":\"0x0\",\"contextMessage\":\"sample context\",\"extractedParameters\":{\"username\":\"brijeshagal\"},\"providerHash\":\"0x74734677e529e5d823b3a2845799a908ab59d2afa9ac168c6fd5d57d1b0e319f\"}",
  "identifier": "0xdf2c5abee297d548ca309f5a302d1dc7163e605bfa51eec2d14c110abd04b4a9",
  "epoch": 1
}
 */

export const proofReq = {
  claimInfo: {
    context:
      '{"contextAddress":"0x0","contextMessage":"","extractedParameters":{"username":"brijeshagal"},"providerHash":"0x74734677e529e5d823b3a2845799a908ab59d2afa9ac168c6fd5d57d1b0e319f"}',
    parameters:
      '{"additionalClientOptions":{},"body":"","geoLocation":"","headers":{"user-agent":"Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.69 Mobile Safari/537.36"},"method":"GET","paramValues":{"username":"brijeshagal"},"responseMatches":[{"invert":false,"type":"contains","value":"<span class=\\"color-fg-muted\\">({{username}})</span>"}],"responseRedactions":[{"jsonPath":"","regex":"<span\\\\ class=\\"color\\\\-fg\\\\-muted\\">\\\\((.*)\\\\)</span>","xPath":""}],"url":"https://github.com/settings/profile"}',
    provider: "http",
  },
  signedClaim: {
    claim: {
      epoch: 1,
      identifier:
        "0x57006663efd9757f4242d12d5fa0cb371c8cec187728564c927f526f9e7537e9",
      owner: "0x3265a3b4bd9e8f919f4feb8dc330bdbcc3591bff",
      timestampS: 1729192551,
    },
    signatures: [
      "0xa6402af318f748e03afd522f2ea20b22ce056d304f9f4fa629d45d2ceee7a5ae13fd8570420b8a6f61c556f3d51a9faff0ec3fddda734f7d44fe29daf12ca7681b",
    ],
  },
};

export const proofObjForContract = JSON.stringify({
  claimInfo: {
    context:
      '{"contextAddress":"0x0","contextMessage":"","extractedParameters":{"username":"brijeshagal"},"providerHash":"0x74734677e529e5d823b3a2845799a908ab59d2afa9ac168c6fd5d57d1b0e319f"}',
    parameters:
      '{"additionalClientOptions":{},"body":"","geoLocation":"","headers":{"user-agent":"Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.69 Mobile Safari/537.36"},"method":"GET","paramValues":{"username":"brijeshagal"},"responseMatches":[{"invert":false,"type":"contains","value":"<span class=\\"color-fg-muted\\">({{username}})</span>"}],"responseRedactions":[{"jsonPath":"","regex":"<span\\\\ class=\\"color\\\\-fg\\\\-muted\\">\\\\((.*)\\\\)</span>","xPath":""}],"url":"https://github.com/settings/profile"}',
    provider: "http",
  },
  signedClaim: {
    claim: {
      epoch: 1,
      identifier:
        "0x57006663efd9757f4242d12d5fa0cb371c8cec187728564c927f526f9e7537e9",
      owner: "0x3265a3b4bd9e8f919f4feb8dc330bdbcc3591bff",
      timestampS: 1728736255,
    },
    signatures: [
      "0x4aea7ecaf971431934e6431098309342c53e6376c9fdb6298aed42a7fde2f7303a39d336f0d5782ca1a47482884abf09082e7f2a589ed270c9ba4192b5b314461b",
    ],
  },
});
