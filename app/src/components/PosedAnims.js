import posed from 'react-pose'

export const PosedHeader = posed.h1({
  enter: { x: 0, opacity: 1 },
  exit: { x: -150, opacity: 0 }
});

export const RouteContainer = posed.div({
  enter: { opacity: 1, beforeChildren: true },
  exit: { opacity: 0 }
});

export const FooterContainer = posed.div({
  enter: { y: 0, delay: 500},
  exit: { y: 500}
});

export const LoaderBox = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

export const PosedDivLeft = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -500, opacity: 0 }
});
export const PosedDivRight = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 500, opacity: 0 }
});

export const ListContainer = posed.div({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 0 }
});