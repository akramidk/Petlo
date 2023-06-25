import {
  UserIcon as UserSolid,
  HeartIcon as HeartSolid,
  MapIcon as MapSolid,
  CreditCardIcon as CardSolid,
  LanguageIcon as LanguageSolid,
  LifebuoyIcon as SupportSolid,
  EllipsisVerticalIcon as MoreVertical,
  MapPinIcon as MapPin,
  ArrowUturnDownIcon as ArrowUturnDown,
  EllipsisHorizontalIcon as MoreHorizontal,
} from "react-native-heroicons/solid";

import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "react-native-heroicons/outline";

// TODO add all the icons here
// TODO manage LTR/RTL here

interface IconProps {
  name: string;
  solid?: boolean;
  color?: string;
  size?: number;
  cn?: string;
  strokeWidth?: number;
}

const Icon = ({
  name,
  solid = true,
  color = "#0E333C",
  size = 16,
  cn,
  strokeWidth,
}: IconProps) => {
  const props = {
    color,
    size,
    className: cn,
    strokeWidth,
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
    arrowRightCircleIcon: {
      outline: <ArrowRightCircleIcon {...props} />,
    },
    arrowLeftCircleIcon: {
      outline: <ArrowLeftCircleIcon {...props} />,
    },
    arrowUturnDown: {
      solid: <ArrowUturnDown {...props} />,
    },
    moreHorizontal: {
      solid: <MoreHorizontal {...props} />,
    },
  };

  return solid ? icons[name]?.solid : icons[name]?.outline;
};

export default Icon;
