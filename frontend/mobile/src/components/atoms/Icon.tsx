import {
  UserIcon as UserSolid,
  HeartIcon as HeartSolid,
  MapIcon as MapSolid,
  CreditCardIcon as CardSolid,
  LanguageIcon as LanguageSolid,
  LifebuoyIcon as SupportSolid,
  EllipsisVerticalIcon as MoreVertical,
  MapPinIcon as MapPin,
} from "react-native-heroicons/solid";

// TODO add all the icons here

interface IconProps {
  name: string;
  solid?: boolean;
  color?: string;
  size?: number;
  cn?: string;
}

const Icon = ({
  name,
  solid = true,
  color = "#0E333C",
  size = 16,
  cn,
}: IconProps) => {
  const props = {
    color,
    size,
    className: cn,
  };

  const icons = {
    person: {
      solid: <UserSolid {...props} />,
    },
    heart: {
      solid: <HeartSolid {...props} />,
    },
    map: {
      solid: <MapSolid {...props} />,
    },
    card: {
      solid: <CardSolid {...props} />,
    },
    language: {
      solid: <LanguageSolid {...props} />,
    },
    support: {
      solid: <SupportSolid {...props} />,
    },
    moreVertical: {
      solid: <MoreVertical {...props} />,
    },
    mapPin: {
      solid: <MapPin {...props} />,
    },
  };

  return solid ? icons[name]?.solid : icons[name]?.outline;
};

export default Icon;
