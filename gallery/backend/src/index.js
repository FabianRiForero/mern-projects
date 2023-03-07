import app from "./app.js";
import db from "./database/db.js";

const main = async () => {
    // await db.sync({ force: true });
    app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`))
}

main();