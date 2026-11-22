import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { socialLinks } from "@/data/footer";

export function SocialLinks() {
  return (
    <Stack direction="row" spacing={1.5}>
      {socialLinks.map((social) => (
        <IconButton
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          sx={{ width: 28, height: 28, p: 0, border: 1, borderColor: "grey.200", color: "grey.800" }}
        >
          <social.icon width={16} height={16} />
        </IconButton>
      ))}
    </Stack>
  );
}
