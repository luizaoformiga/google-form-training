import app from "./App";
import "dotenv/config";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    "\u{1F525}\u{1F680} app listen on port",
    port,
    "\u{1F525}\u{1F680}"
  );
});
