import useMarketData from "../hooks/useMarketData";
import {
  Box,
  Stack,
  Grid,
  List,
  Container,
  Typography,
  ListItem,
} from "@mui/material";
import Image from "next/image";
import GitIcon from "../public/github.png";

export const SRGentrys = () => {
  const {
    priceHistory,
    volumeHistory,
    liquidityHistory,
    liquidityHistoryByHours,
  } = useMarketData();

  const handleGitRedirect = () => {
    window.open("https://github.com/jSUNSH1NEw/SrgLiquid", "_blank");
  };

  return (
    <>
      <Grid
        sx={{
          textAlign: "left",
          display: "flex",
          flexDirection: "row",
          mt: "50px",
          pl: "50px",
          mb: "50px",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={2} sx={{ flexDirection: "column" }}>
          <Typography
            variant="h3"
            sx={{
              alignItems: "left",
              justifyContent: "flex-start",
              fontStyle: "bold",
              fontWeight: "800",
            }}
          >
            SURGE / APE History
          </Typography>
          <Box width={350} height={7.5} bgcolor="white" />
        </Stack>
        <Box
          sx={{ p: "50px 50px 50px 0px", cursor: "pointer" }}
          onClick={() => {
            handleGitRedirect(); //TODO replace by Link component
          }}
        >
          <Image src={GitIcon} width={40} height={40} alt="GitHub Icon" />
        </Box>
      </Grid>

      <Grid
        container
        sx={{ padding: "20px 10px 20px 50px", flexDirection: "column" }}
      >
        <Grid
          sx={{
            justifyContent: "space-between",
            width: "auto",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row", xl: "row" },
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(54, 54, 54, 0.23)",
                filter: "drop-shadow(2px 2px 10px rgba(211, 211, 211, 0.68))",
                backdropFilter: "blur(25px)",
                width: "25vw",
                flexDirection: "column",
                border: "1px solid transparent",
                borderRadius: "25px 0px 0px 0px",
                padding: "30px 0px 0px 20px",
                "&:hover": {
                  backgroundColor: "rgba(13, 203, 148, 0.50)",
                  transition: "0.5s",
                  transitionDelay: "0.2s",
                },
              }}
            >
              <h2>Price History</h2>
              <Box width={50} height={3.5} bgcolor="white" mb={4} />

              <List
                sx={{
                  overflow: "auto",
                  maxHeight: "500px",
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "0.5em",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    opacity: "0",
                  },
                }}
              >
                {priceHistory.map((entry: HistoricalMarketEntry) => (
                  <ListItem key={entry.timestamp}>
                    Timestamp: {entry.timestamp} <br></br> Price: {entry.price}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box
              sx={{
                backgroundColor: "rgba(54, 54, 54, 0.23)",
                filter: "drop-shadow(2px 2px 10px rgba(211, 211, 211, 0.68))",
                backdropFilter: "blur(25px)",
                width: "25vw",
                flexDirection: "column",
                border: "1px solid transparent",
                borderRadius: "25px 25px 0px 0px",
                padding: "30px 0px 0px 20px",
                ml: "100px",
                mr: "100px",
                "&:hover": {
                  backgroundColor: "rgba(240, 169, 32, 0.62)",
                  transition: "0.5s",
                  transitionDelay: "0.2s",
                },
              }}
            >
              <h2>Volume History</h2>
              <Box width={50} height={3.5} bgcolor="white" mb={4} />
              <List
                sx={{
                  overflow: "auto",
                  maxHeight: "500px",

                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "0.5em",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    opacity: "0",
                  },
                }}
              >
                {volumeHistory.map((entry: HistoricalMarketEntry) => (
                  <ListItem key={entry.timestamp} sx={{ p: "20" }}>
                    Timestamp: {entry.timestamp}
                    <br></br> Volume: {entry.volume}
                    <br></br> liquidity: {entry.liquidity}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(54, 54, 54, 0.23)",
                filter: "drop-shadow(2px 2px 10px rgba(211, 211, 211, 0.68))",
                backdropFilter: "blur(25px)",
                width: "25vw",
                flexDirection: "column",
                border: "1px solid transparent",
                borderRadius: "0px 25px 0px 0px",
                padding: "30px 0px 0px 20px",
                "&:hover": {
                  backgroundColor: "rgba(93, 99, 255, 0.50)",
                  transition: "0.5s",
                  transitionDelay: "0.2s",
                },
              }}
            >
              <h2>Liquidity History</h2>
              <Box width={50} height={3.5} bgcolor="white" mb={4} />
              <List
                sx={{
                  overflow: "auto",
                  maxHeight: "500px",

                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "0.5em",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    opacity: "0",
                  },
                }}
              >
                {liquidityHistory.map((entry: HistoricalMarketEntry) => (
                  <ListItem key={entry.timestamp} sx={{ p: "20" }}>
                    Timestamp: {entry.timestamp}
                    <br></br>Liquidity: {entry.liquidity}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Grid>

        <Grid
          sx={{
            width: "auto",
            display: "flex",
            alignItem: "center",
            justifyContent: "flex-start",
          }}
        >
          <Container sx={{ display: "flex", mt: "100px" }}>
            <Box
              sx={{
                backgroundColor: "rgba(54, 54, 54, 0.23)",
                filter: "drop-shadow(2px 2px 10px rgba(211, 211, 211, 0.68))",
                backdropFilter: "blur(25px)",
                border: "1px solid transparent",
                borderRadius: "25px 0px 0px 25px",
                padding: "30px 0px 0px 20px",
                width: "65vw",
                alignItems: "center",
              }}
            >
              <h2>
                Liquidity by hours : 0x43C3EBaFdF32909aC60E80ee34aE46637E743d65
              </h2>
              <Box width={150} height={3.5} bgcolor="white" mb={4} />
              <List
                sx={{
                  overflow: "auto",
                  maxHeight: "500px",
                  p: "20px 20px 0px 20px",
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "0.5em",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    opacity: "0",
                  },
                }}
              >
                {liquidityHistoryByHours.map((entry: HistoricalMarketEntry) => (
                  <ListItem
                    key={entry.timestamp}
                    sx={{
                      mt: "30px",
                      padding: "10px",
                      border: " solid 2px white",
                    }}
                  >
                    Timestamp: {entry.timestamp}, <br></br>Volume :{" "}
                    {entry.currentVolume}, <br></br>Yesterday at same hour :{" "}
                    {entry.yesterdayVolume}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
