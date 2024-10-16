import { Provider } from "@/util/Providers";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

interface ProviderIconProps {
  provider: number;
}

export default function ProviderIcon({ provider }: ProviderIconProps) {
  // return icon from enum
  switch (provider) {
    case Provider.GITHUB:
      return <GitHubIcon />;
    case Provider.X:
      return <XIcon />;
    case Provider.YOUTUBE:
      return <YouTubeIcon />;
    case Provider.INSTAGRAM:
      return <InstagramIcon />;
    default:
      return null;
  }
}
