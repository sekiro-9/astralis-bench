import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { socialLinks } from "@/data/footer";

export function SocialLinks() {
  return (
    <HStack gap="3">
      {socialLinks.map((social) => (
        <IconButton key={social.label} asChild variant="outline" size="2xs" boxSize="7" rounded="full" aria-label={social.label}>
          <a href={social.href} target="_blank" rel="noreferrer">
            <Icon boxSize="3"><social.icon /></Icon>
          </a>
        </IconButton>
      ))}
    </HStack>
  );
}
