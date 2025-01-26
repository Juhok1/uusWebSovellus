    import sqlite3 from "sqlite3";

    //Luodaan uusi tietokanta

    const db = new sqlite3.Database("./autotietokanta.db", (err) =>{
        if (err) {
            console.error("Virhe tietokannan avaamisessa: ", err.message)
        }else {
            console.log("Tietokanta avattu!")
        }
    }); 
    const initializeDatabase = () => {
        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS autot (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    rekisterinumero TEXT NOT NULL, 
                    merkki TEXT NOT NULL, 
                    malli TEXT, 
                    moottori TEXT, 
                    ensirekisterointi TEXT, 
                    korimalli TEXT
                )`,
                (err) => {
                    if (err) {
                        console.error("Virhe taulun luonnissa: ", err.message);
                    } else {
                        console.log("Taulu 'autot' varmennettu!");
                    }
                }
            );
        });
    };
    
    // tietojen lisäys autot -tauluun
    const addVehicle = (vehicle, callback) => {
        const query = `INSERT INTO autot (rekisterinumero, merkki, malli, moottori, ensirekisterointi, korimalli) VALUES (?,?,?,?,?,?)`
        ;
        db.run(query, [
            vehicle.rekisterinumero,
            vehicle.merkki,
            vehicle.malli,
            vehicle.moottori,
            vehicle.ensirekisterointi,
            vehicle.korimalli
        ], function (err) {
            if (err) {
                console.error("Virhe tietojen lisäämisessä: ", err.message)
            }else{
                console.log(`Ajoneuvo lisätty, ID: ${this.lastID}`);
                callback(null, this.lastID);
            }
        });
    };

    // Ajoneuvojen hakeminen tietokannasta

    const getVehicles = (callback) => {
        const query = "SELECT * FROM autot";
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(" Virhe tietojen hakemisessa: ", err.message)
                callback(err)
            }else{
            callback (null, rows)
            }
        });
    };
    
    //Viedään funktiot muiden käytettäväksi

    export { initializeDatabase, addVehicle, getVehicles };