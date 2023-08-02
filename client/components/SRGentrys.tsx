import useMarketData from "../hooks/useMarketData";
import { Box, Stack, Grid, List, Container, Typography } from "@mui/material";
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
      <Container sx={{ p: "50px", textAlign: "right" }}>
        <Grid
          sx={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            pt: "10px",
            pr: "100px",
          }}
        >
          <Typography variant="h3">SURGE/APE History</Typography>
          <Box width={180} height={7} bgcolor="white" mt={1} />
        </Grid>

        <Box
          sx={{ postition: "relative", right: "200px", cursor: "pointer" }}
          onClick={() => {
            handleClick();
          }}
        >
          <Image src={GitIcon} width={40} height={40} alt="GitHub Icon" />
        </Box>
      </Container>
      <Grid container spacing={1} sx={{ padding: "20px 10px 20px 50px" }}>
        <Grid sx={{ display: "flex" }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItem: "center",
              m: "0 auto",
            }}
          >
            <Box
              sx={{
                width: { sm: "100%", md: "32%", lg: "32%" },
                mr: "140px",
              }}
            >
              <h2>Price History</h2>
              <h3> (API V2) </h3>
              <ul>
                {priceHistory.map((entry: HistoricalMarketEntry) => (
                  <List key={entry.timestamp} sx={{ p: "20" }}>
                    Timestamp: {entry.timestamp} <br></br> Price: {entry.price}
                  </List>
                ))}
              </ul>
            </Box>
            <Box
              sx={{
                filter: "dropShadow(2px 2px 40px rgba(211, 211, 211, 0.68))",
                backdropFilter: "blur(25px)",
                mr: "140px",
              }}
            >
              <h2>Volume History</h2>
              <h3> (API V2) </h3>
              <ul>
                {volumeHistory.map((entry: HistoricalMarketEntry) => (
                  <List key={entry.timestamp} sx={{ p: "20" }}>
                    Timestamp: {entry.timestamp}
                    <br></br> Volume: {entry.volume}
                    <br></br> liquidity: {entry.liquidity}
                  </List>
                ))}
              </ul>
            </Box>

            <Box>
              <h2>Liquidity History</h2>
              <h3> (API V2) </h3>
              <ul>
                {liquidityHistory.map((entry: HistoricalMarketEntry) => (
                  <List key={entry.timestamp} sx={{ p: "20" }}>
                    Timestamp: {entry.timestamp}
                    <br></br>Liquidity: {entry.liquidity}
                  </List>
                ))}
              </ul>
            </Box>
          </Stack>
        </Grid>

        <Container sx={{ display: "flex", mt: "50px" }}>
          <Box sx={{ width: "auto", border: "2px" }}>
            <h2>Liquidity History by hours</h2>
            <h3>(API CG)</h3>
            <Grid container spacing={10} sx={{ mt: "20px" }}>
              {liquidityHistoryByHours.map((entry: HistoricalMarketEntry) => (
                <List
                  key={entry.timestamp}
                  sx={{
                    mt: "30px",
                    padding: "10px",
                    border: " solid 2px white",
                  }}
                >
                  Timestamp: {entry.timestamp}, <br></br> CurrentVolume:{" "}
                  {entry.currentVolume}, <br></br>Yesterday:{" "}
                  {entry.yesterdayVolume} , dailyLiquidity :{" "}
                  {entry.dailyVolumeToken}
                </List>
              ))}
            </Grid>
          </Box>
        </Container>
      </Grid>
    </>
  );
};
