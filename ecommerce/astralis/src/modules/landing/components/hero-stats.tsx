import { Fragment } from "react";
import { Flex, Separator, Stat } from "astralis-ui";

type HeroStat = {
  value: string;
  label: string;
};

export function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <Flex
      wrap="wrap"
      justifyContent={{ base: "center", md: "start" }}
      columnGap={{ base: "7", lg: "6" }}
      rowGap="3"
    >
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 && (
            <Separator
              orientation="vertical"
              h="auto"
              display={index === stats.length - 1 ? { base: "hidden", md: "block" } : "block"}
            />
          )}
          <Stat size={{ base: "sm", xl: "lg" }}>
            <Stat.Value>{stat.value}</Stat.Value>
            <Stat.Label>{stat.label}</Stat.Label>
          </Stat>
        </Fragment>
      ))}
    </Flex>
  );
}
