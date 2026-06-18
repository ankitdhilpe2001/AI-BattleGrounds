import app from "./src/app.js"

const PORT = process.env.PORT;

// health check api


app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT} OR http://localhost:${PORT}`);
})