"use client";

import { useState, type FormEvent } from "react";
import { Box, Button, Flex, Heading, Icon, Input, InputGroup, Stack, Text } from "astralis-ui";
import { MailIcon } from "@/components/icons";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems={{ base: "stretch", lg: "center" }}
      justifyContent="between"
      gap={{ base: "8", lg: "10" }}
      bg="inverted"
      rounded="3xl"
      px={{ base: "6", lg: "16" }}
      py={{ base: "8", lg: "9" }}
      reveal="scale-in"
    >
      <Heading
        as="h2"
        size={{ base: "3xl", lg: "4xl" }}
        weight="extrabold"
        lineHeight="tight"
        casing="uppercase"
        color="inverted"
        maxW="15em"
      >
        Stay up to date about our latest offers
      </Heading>
      <Box as="form" onSubmit={handleSubmit} w={{ base: "full", lg: "22rem" }} shrink="0">
        {subscribed ? (
          <Text color="inverted" weight="medium" align="center">
            Thanks for subscribing. Look out for our next offer in your inbox.
          </Text>
        ) : (
          <Stack gap="3.5">
            <InputGroup prefix={<Icon as={MailIcon} size="sm" color="subtle" />}>
              <Input type="email" required placeholder="Enter your email address" aria-label="Email address" />
            </InputGroup>
            <Button type="submit" variant="subtle" colorScheme="gray" rounded="full" fullWidth>
              Subscribe to Newsletter
            </Button>
          </Stack>
        )}
      </Box>
    </Flex>
  );
}
