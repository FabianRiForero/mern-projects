import app from "./app.js";

const main = async () => {
    app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));
}

main();