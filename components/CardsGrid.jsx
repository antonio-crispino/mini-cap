import { GridItem } from "@chakra-ui/react";

import Card from "./Card";

function CardGrid({ payload }) {
  return (
    <>
      {payload.map((fullObj) => (
        <GridItem w="100%" key={fullObj.id || fullObj.userInfo.id}>
          <Card fullObj={fullObj} />
        </GridItem>
      ))}
    </>
  );
}

export default CardGrid;
