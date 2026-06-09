import dotenv from "dotenv"

dotenv.config();

const env={
    PORT:process.env.PORT || 4000
}

export default env;