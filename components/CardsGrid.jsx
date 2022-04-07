/* eslint-disable react/jsx-no-useless-fragment */
import { GridItem } from "@chakra-ui/react";

import Card from "./Card";

function CardGrid({ payload }) {
  console.log(payload, "payload");
  return (
    <>
      {payload?.map((fullObj) => (
        <GridItem
          w="100%"
          align="center"
          key={fullObj?.id || fullObj?.userInfo?.id}
        >
          <Card fullObj={fullObj} />
        </GridItem>
      ))}
    </>
  );
}

export default CardGrid;
