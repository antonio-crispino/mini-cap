import { GridItem } from "@chakra-ui/react";

import Card from "./Card";

function CardGrid({ payload }) {
  return (
    <>
      {payload.map((fullObj) => (
        <GridItem w="100%">
          <Card fullObj={fullObj} />
        </GridItem>
      ))}
    </>
  );
}

export default CardGrid;
