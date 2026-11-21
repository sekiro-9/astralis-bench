import { Fragment } from "react";
import { Flex, Separator, Stat } from "@chakra-ui/react";

type HeroStat = {
  value: string;
  label: string;
};

export function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <Flex wrap="wrap" justify={{ base: "center", md: "start" }} columnGap={{ base: "7", lg: "6" }} rowGap="3">
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 && (
            <Separator
              orientation="vertical"
              height="auto"
              hideBelow={index === stats.length - 1 ? "md" : undefined}
            />
          )}
          {/* The label comes first in the DOM so the <dl> reads term-then-value;
              the column is reversed to show the figure on top, as designed. */}
          <Stat.Root size="sm" flex="none" flexDirection="column-reverse">
            <Stat.Label textStyle={{ base: "xs", xl: "sm" }} fontWeight="medium">
              {stat.label}
            </Stat.Label>
            <Stat.ValueText textStyle={{ xl: "4xl" }} fontWeight="bold">
              {stat.value}
            </Stat.ValueText>
          </Stat.Root>
        </Fragment>
      ))}
    </Flex>
  );
}
