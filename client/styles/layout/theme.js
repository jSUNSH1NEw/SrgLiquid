import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
    ].join(","),
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1836,
    },
  },
  components: {
    MuiBox: {
      variants: [
        {
          props: { variant: "HorizontalBox" },
          style: {
            color: "white",
            height: "500px",
            background: "transparent",
            borderRadius: "200px",
            width: "auto",
            boxShadow: "inset 244px 0 0 0 #13141F",
            "&:hover": {
              boxShadow: "inset 244px 0 0 0 #13141F",
              color: "#B3CEFF",
              background:
                "linear-gradient(91.75deg, #0039FF 3.38%, #02007A 94.63%)",
            },
          },
        },
        {
          props: { variant: "VerticalBox" },
          style: {
            color: "white",
            height: "300px",
            background: "transparent",
            borderRadius: "200px",
            width: "auto",
            boxShadow: "inset 244px 0 0 0 #13141F",
            "&:hover": {
              boxShadow: "inset 244px 0 0 0 #13141F",
              color: "#B3CEFF",
              background:
                "linear-gradient(91.75deg, #0039FF 3.38%, #02007A 94.63%)",
            },
          },
        },
      ],
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "primaryButton" },
          style: {
            color: "white",
            height: "45px",
            background:
              "linear-gradient(91.75deg, #0039FF 3.38%, #02007A 94.63%)",
            borderRadius: "200px",
            width: "180px",
            fontWeight: "300",
            textTransform: "none",
            fontSize: { md: "1rem", lg: "1.2rem" },
            textTransform: "none",
            transition: "all 0.7s ease",

            "&:hover": {
              boxShadow: "inset 244px 0 0 0 #13141F",
              color: "#B3CEFF",
            },
            "&:active": {},
          },
        },
        {
          props: { variant: "secondaryButton" },
          style: {
            background: "transparent",
            borderRadius: "200px",
            width: "180px",
            fontWeight: "300",
            height: "45px",
            textTransform: "none",
            fontSize: { md: "1rem", lg: "1.2rem" },
          },
        },
        {
          props: { variant: "tertiaryButton" },
          style: {
            background:
              "linear-gradient(91.75deg, #0039FF 4.81%, #3586FF 94.63%)",
            borderRadius: "200px",
            width: "180px",
            fontWeight: "300",
            height: "45px",
            textTransform: "none",
            fontSize: { md: "1rem", lg: "1.2rem" },
            color: "white",
          },
        },
      ],
    },
  },
});

theme.typography.h1 = {
  fontFamily: "Coolvetica",
  background:
    "linear-gradient(91.75deg, #0039FF 3.38%, #0129D9 33.8%, #02007A 64.21%, #000000 94.63%)",
  webkitBackgroundClip: "text",
  webkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
};

theme.typography.h2 = {
  fontFamily: "Coolvetica",
  background:
    "linear-gradient(91.75deg, #0039FF 3.38%, #0129D9 33.8%, #02007A 64.21%, #000000 94.63%)",
  webkitBackgroundClip: "text",
  webkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
};

theme.typography.body1 = {
  fontFamily: "Poppins",
  fontWeight: "300",
};
