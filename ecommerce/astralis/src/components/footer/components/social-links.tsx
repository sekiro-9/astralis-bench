import { Button, HStack, Icon } from "astralis-ui";
import { socialLinks } from "@/data/footer";

export function SocialLinks() {
  return (
    <HStack gap="3">
      {socialLinks.map((social) => (
        <Button
          key={social.label}
          as="a"
          href={social.href}
          target="_blank"
          rel="noreferrer"
          variant="outline"
          colorScheme="gray"
          size="xs"
          rounded="full"
          leftIcon={<Icon as={social.icon} size="xs" />}
          aria-label={social.label}
        />
      ))}
    </HStack>
  );
}
