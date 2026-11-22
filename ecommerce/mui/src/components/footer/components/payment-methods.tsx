import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { paymentMethods } from "@/data/footer";

export function PaymentMethods() {
  return (
    <Stack component="ul" direction="row" spacing={1.5} aria-label="Accepted payment methods" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {paymentMethods.map((method) => (
        <li key={method.name}>
          <Box
            component="img"
            src={method.logo}
            alt={method.name}
            loading="lazy"
            sx={{ display: "block", height: { xs: "1.625rem", lg: "1.875rem" }, width: "auto" }}
          />
        </li>
      ))}
    </Stack>
  );
}
