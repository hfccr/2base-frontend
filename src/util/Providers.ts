export enum Provider {
  GITHUB = 0,
  X = 1,
  YOUTUBE = 2,
  INSTAGRAM = 3,
}

export const getProviderName = (provider: number) => {
  // return string from enum
  switch (provider) {
    case Provider.GITHUB:
      return "GitHub";
    case Provider.X:
      return "X";
    case Provider.YOUTUBE:
      return "YouTube";
    case Provider.INSTAGRAM:
      return "Instagram";
    default:
      return "Unknown";
  }
};

const base = "https://unavatar.io/";

const providerMapping = {
  [Provider.GITHUB]: "github",
  [Provider.X]: "x",
  [Provider.YOUTUBE]: "youtube",
  [Provider.INSTAGRAM]: "instagram",
};

type ProviderType = keyof typeof providerMapping;

export const getProfileIcon = (provider: ProviderType, profile: string) => {
  const mappedProvider = providerMapping[provider];
  if (mappedProvider === undefined) {
    return "";
  } else {
    return `${base}${mappedProvider}/${profile}`;
  }
};

export const getProfileLink = (provider: ProviderType, profile: string) => {
  if (provider === Provider.GITHUB) {
    return `https://github.com/${profile}`;
  } else if (provider === Provider.X) {
    return `https://x.com/${profile}`;
  } else if (provider === Provider.YOUTUBE) {
    return `https://youtube.com/${profile}`;
  } else if (provider === Provider.INSTAGRAM) {
    return `https://instagram.com/${profile}`;
  } else {
    return "";
  }
};
