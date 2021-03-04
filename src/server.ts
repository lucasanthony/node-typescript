import app from "./app";
import 'dotenv/config'

const PORT = process.env.PORT || 4444;

app.listen(PORT, (): void => {
  console.log(`Server is running on port: ${PORT}`);
});
