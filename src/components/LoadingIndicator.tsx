import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export function LoadingIndicator({ loading }: { loading: boolean }) {
  if (!loading) return null;
  
  return (
    <div className="h-screen w-screen fixed inset-0 bg-black/50 z-50">
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}
