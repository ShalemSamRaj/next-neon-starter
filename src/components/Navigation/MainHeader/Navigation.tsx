import * as React from "react";

import MainNavigation from "../MainNavigation/MainNavigation";

export function MainHeader({
  layoutPaddingString,
}: {
  layoutPaddingString: string;
}) {
  return (
    <div className="main-header-container bg-background sticky top-[0px] left-0 z-[1002] shadow-xl">
      <MainNavigation layoutHorixontalPadString={layoutPaddingString} />
    </div>
  );
}
