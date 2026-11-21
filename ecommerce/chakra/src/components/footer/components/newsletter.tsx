"use client";

import { useState, type FormEvent } from "react";
import { Button, chakra, Flex, Heading, Icon, Input, InputGroup, Stack, Text } from "@chakra-ui/react";
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
      align={{ base: "stretch", lg: "center" }}
      justify="space-between"
      gap={{ base: "8", lg: "10" }}
      bg="black"
      rounded="3xl"
      px={{ base: "6", lg: "16" }}
      py={{ base: "8", lg: "9" }}
      animationStyle="reveal-scale-in"
    >
      <Heading
        as="h2"
        fontSize={{ base: "3xl", lg: "4xl" }}
        fontWeight="extrabold"
        lineHeight="1.25"
        letterSpacing="tight"
        textTransform="uppercase"
        color="white"
        maxW="15em"
      >
        Stay up to date about our latest offers
      </Heading>
      <chakra.form onSubmit={handleSubmit} w={{ base: "full", lg: "22rem" }} flexShrink="0">
        {subscribed ? (
          <Text color="white" fontWeight="medium" textAlign="center" role="status">
            Thanks for subscribing. Look out for our next offer in your inbox.
          </Text>
        ) : (
          <Stack gap="3.5">
            <InputGroup startElement={<Icon boxSize="5" color="fg.subtle"><MailIcon /></Icon>}>
              <Input
                type="email"
                required
                bg="white"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
            </InputGroup>
            <Button type="submit" variant="subtle" fontSize="md" rounded="full" w="full">
              Subscribe to Newsletter
            </Button>
          </Stack>
        )}
      </chakra.form>
    </Flex>
  );
}
