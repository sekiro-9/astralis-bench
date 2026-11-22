"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/data/landing";
import { reveal } from "@/theme/motion";
import { TestimonialCard } from "./testimonial-card";

const SLIDE_GAP = 20;

const arrowStyle = { width: 36, height: 36, p: 0, border: 1, borderColor: "divider", bgcolor: "common.white", color: "text.primary" };

// MUI has no carousel, so this is a CSS scroll-snap track: the browser does the
// sliding and swiping, the arrows move it by one card and wrap at either end.
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);

  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    const slide = track?.firstElementChild;
    if (!track || !(slide instanceof HTMLElement)) return;
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    if (direction === 1 && atEnd) track.scrollTo({ left: 0 });
    else if (direction === -1 && atStart) track.scrollTo({ left: track.scrollWidth });
    else track.scrollBy({ left: direction * (slide.offsetWidth + SLIDE_GAP) });
  };

  return (
    <Box component="section" aria-roledescription="carousel" aria-label="Customer reviews" sx={{ py: { xs: 5, lg: 8 } }}>
      <PageContainer>
        <Stack spacing={{ xs: 3, lg: 5 }}>
          <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={2}>
            <SectionHeading align="left">Our happy customers</SectionHeading>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="Previous slide" onClick={() => move(-1)} sx={arrowStyle}>
                <ArrowLeftIcon width={20} height={20} />
              </IconButton>
              <IconButton aria-label="Next slide" onClick={() => move(1)} sx={arrowStyle}>
                <ArrowRightIcon width={20} height={20} />
              </IconButton>
            </Stack>
          </Stack>
          <Box sx={reveal("slide-left")}>
            <Box
              component="ul"
              ref={trackRef}
              sx={{
                display: "flex",
                gap: `${SLIDE_GAP}px`,
                listStyle: "none",
                m: 0,
                p: 0,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                "@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "smooth" },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <Box
                  component="li"
                  key={testimonial.id}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                  sx={{
                    flex: "0 0 auto",
                    width: {
                      xs: "100%",
                      md: `calc((100% - ${SLIDE_GAP}px) / 2)`,
                      lg: `calc((100% - ${2 * SLIDE_GAP}px) / 3)`,
                    },
                    scrollSnapAlign: "start",
                  }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
