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

  const handleClick = () => {
    window.location.href = "https://github.com/jSUNSH1NEw/SrgLiquid";
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
          <Box width={350} height={7.5} bgcolor="white" mt={1} />
        </Stack>
        <Box sx={{ p: "50px 50px 50px 0px" }}>
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
              flexDirection: { xs: "column", xl: "row" },
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
                borderRadius: "25px 0px 25px 0px",
                padding: "50px",
                ml: "0px",
              }}
            >
              <h2>Price History</h2>
              <h3> (API V2) </h3>
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
                  <ListItem key={entry.timestamp} sx={{}}>
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
                padding: "50px",
                ml: "100px",
                mr: "100px",
              }}
            >
              <h2>Volume History</h2>
              <h3> (API V2) </h3>
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
                borderRadius: "0px 25px 0px 25px",
                padding: "50px",
              }}
            >
              <h2>Liquidity History</h2>
              <h3> (API V2) </h3>
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
            mt: "20px",
            width: "100%",
            displa: "flex",
            alignItem: "center",
          }}
        >
          <Container sx={{ display: "flex", mt: "50px" }}>
            <Box
              sx={{
                backgroundColor: "rgba(54, 54, 54, 0.23)",
                filter: "drop-shadow(2px 2px 10px rgba(211, 211, 211, 0.68))",
                backdropFilter: "blur(25px)",
                border: "1px solid transparent",
                borderRadius: "25px 0px 0px 25px",
                padding: "50px",
                alignItems: "center",
              }}
            >
              <h2>Liquidity History by hours</h2>
              <h3>(API CG)</h3>
              <List
                sx={{
                  overflow: "auto",
                  maxHeight: "500px",
                  padding: "150px",
                  width: "50vw",
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
                    Timestamp: {entry.timestamp}, <br></br> CurrentVolume:{" "}
                    {entry.currentVolume}, <br></br>Yesterday:{" "}
                    {entry.yesterdayVolume} , <br></br> dailyLiquidity :{" "}
                    {entry.dailyVolumeToken}
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
