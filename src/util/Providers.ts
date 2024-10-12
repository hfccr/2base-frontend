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
