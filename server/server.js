const express = require("express");
const multer = require("multer");
const { createConnection } = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const app = express();
const secretKey = process.env.SECRET_KEY || "Andres-petshoddies-1033707596";

// Configuración de la base de datos
const db = createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "pets_hoddies_bd",
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.use(cors());
app.use(express.json()); // Añadido para parsear el cuerpo de la solicitud como JSON

// -------------RUTAS----------------

app.get("/productos", (req, res) => {
    const sql = "SELECT * FROM productos";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            res.status(500).send("Error al obtener productos");
        } else {
            res.json(result);
        }
    });
});

app.post("/addnewproduct", (req, res) => {
    const sql =
        "INSERT INTO productos (nombre, descripcion, precio, img, stock) VALUES (?, ?, ?, ?)";

    db.query(
        sql,
        ["Nuevo producto", "Nuevo producto", 10000, "/img/productos/nf.jpg", 1],
        (err) => {
            if (err) {
                console.error("Error al insertar producto en la base de datos:", err);
                res.status(500).json({ error: "Error al registrar producto" });
            } else {
                res.status(201).json({ message: "Producto registrado exitosamente" });
            }
        }
    );
});

app.post("/deleteproduct", (req, res) => {
    const id = req.body.id;
    const query = "DELETE FROM productos WHERE producto_id = ?";

    db.query(query, [id], (err) => {
        if (err) {
            console.error("Error al eliminar producto en la base de datos:", err);
            res.status(500).json({ error: "Error al eliminar producto" });
        } else {
            res.status(201).json({ message: "Producto eliminado exitosamente" });
        }
    });
});

app.post("/product/profile", (req, res) => {
    const id = req.body.id;
    const query = "SELECT * FROM productos WHERE producto_id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error al buscar información producto en la base de datos:", err);
            res.status(500).json({ error: "Error al buscar información producto" });
        } else {
            const infoProduct = {
                id: result[0].producto_id,
                name: result[0].nombre,
                description: result[0].descripcion,
                price: result[0].precio,
                stock: result[0].stock,
                img: result[0].img,
            };
            res.json(infoProduct);
        }
    });
});

app.post("/profile/product/update", (req, res) => {
    const { id, name, description, stock, price } = req.body;

    const updateUserQuery =
        "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE producto_id = ?";

    db.query(updateUserQuery, [name, description, price, stock, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar el perfil del producto:", err);
            return res.status(500).json({ error: "Error al actualizar el perfil del producto" });
        } else {
            if (result.affectedRows > 0) {
                const getProductQuery = "SELECT * FROM Productos WHERE producto_id = ?";
                db.query(getProductQuery, [id], (err, productResult) => {
                    if (err) {
                        console.error("Error al obtener el producto actualizado:", err);
                        return res
                            .status(500)
                            .json({ error: "Error al obtener el producto actualizado" });
                    } else {
                        const updatedProduct = productResult[0];
                        return res
                            .status(200)
                            .json({
                                message: "Perfil de producto actualizado correctamente",
                                product: updatedProduct,
                            });
                    }
                });
            } else {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
        }
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, req.body.path);
    },
    filename: function (req, file, cb) {
        cb(null, req.body.id + ".jpg");
    },
});

const upload = multer({ storage: storage });

app.post("/upload/image/product", upload.single("image"), (req, res) => {
    const { id } = req.body;
    const pathProductImg = "/img/productos/" + id + ".jpg";
    const updateQuery = "UPDATE productos SET img = ? WHERE producto_id = ?";

    db.query(updateQuery, [pathProductImg, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar la foto del producto:", err);
            return res.status(500).json({ error: "Error al actualizar la foto del producto" });
        } else {
            if (result.affectedRows > 0) {
                return res
                    .status(200)
                    .json({ message: "la foto de producto actualizado correctamente" });
            } else {
                return res.status(404).json({ error: "producto no encontrado la foto" });
            }
        }
    });
});

// SECCIÓN USUARIOS

app.get("/usuarios", (req, res) => {
    const sql = "SELECT * FROM usuarios";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            res.status(500).send("Error al obtener usuarios");
        } else {
            res.json(result);
        }
    });
});

app.post("/continue/facebook", (req, res) => {
    const { fullName, email, facebookId } = req.body;

    const firstName = fullName.split(" ")[0];

    const userQuery = "SELECT * FROM usuarios WHERE email = ?";
    db.query(userQuery, [email], async (err, result) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            res.status(500).send("Error al iniciar sesión con Facebook");
        } else {
            if (result.length > 0) {
                const tokenData = {
                    id: result[0].usuario_id,
                    fullName: result[0].nombre,
                    username: result[0].usuario,
                    email: result[0].email,
                    rol: result[0].rol_id,
                };
                const token = Jwt.sign(tokenData, secretKey, { expiresIn: "5h" });
                res.json({ token });
            } else {
                const insertUserQuery =
                    "INSERT INTO usuarios (nombre, email, usuario, contrasena, rol_id) VALUES (?, ?, ?, ?, ?)";
                db.query(
                    insertUserQuery,
                    [fullName, email, firstName, facebookId, 1],
                    (err, result) => {
                        if (err) {
                            console.error(
                                "Error al insertar usuario de Facebook en la base de datos:",
                                err
                            );
                            res.status(500).json({
                                error: "Error al registrar usuario de Facebook",
                            });
                        } else {
                            const userId = result.insertId;
                            const tokenData = {
                                id: userId,
                                fullName: fullName,
                                username: firstName,
                                email: email,
                                rol: 1,
                            };
                            const token = Jwt.sign(tokenData, secretKey, { expiresIn: "5h" });
                            res.json({ token });
                        }
                    }
                );
            }
        }
    });
});

app.post("/login", async (req, res) => {
    const { username, contrasenainput } = req.body;

    const userQuery = "SELECT * FROM usuarios WHERE usuario = ?";
    db.query(userQuery, [username], async (err, result) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            res.status(500).send("Error al iniciar sesión");
        } else {
            if (result.length > 0) {
                const match = await bcrypt.compare(contrasenainput, result[0].contrasena);

                if (match) {
                    const tokenData = {
                        id: result[0].usuario_id,
                        fullName: result[0].nombre,
                        username: result[0].usuario,
                        email: result[0].email,
                        rol: result[0].rol_id,
                    };

                    const token = Jwt.sign(tokenData, secretKey, { expiresIn: "5h" });
                    res.json({ token });
                } else {
                    res.status(401).json({ error: "Contraseña incorrecta" });
                }
            } else {
                res.status(404).json({ error: "Usuario no encontrado" });
            }
        }
    });
});

app.post("/register", async (req, res) => {
    const { nombre, username, email, contrasena, telefono, rol_id } = req.body;

    const existingUserQuery = "SELECT * FROM usuarios WHERE email = ?";
    db.query(existingUserQuery, [email], async (err, result) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            res.status(500).json({ error: "Error al registrar usuario" });
        } else {
            if (result.length === 0) {
                const hashedPassword = await bcrypt.hash(contrasena, 10);

                const insertUserQuery =
                    "INSERT INTO usuarios (nombre, usuario, email, contrasena, telefono, rol_id) VALUES (?, ?, ?, ?, ?, ?)";
                db.query(
                    insertUserQuery,
                    [nombre, username, email, hashedPassword, telefono, rol_id],
                    (err) => {
                        if (err) {
                            console.error("Error al insertar usuario en la base de datos:", err);
                            res.status(500).json({ error: "Error al registrar usuario" });
                        } else {
                            res.status(201).json({ message: "Usuario registrado exitosamente" });
                        }
                    }
                );
            } else {
                res.status(409).json({ error: "El correo electrónico ya está registrado" });
            }
        }
    });
});

app.post("/profile", (req, res) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader.split(" ")[1];

    Jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            let errorMessage = "Token inválido";
            if (err.name === "TokenExpiredError") {
                errorMessage = "Token expirado";
            } else if (err.name === "JsonWebTokenError") {
                errorMessage = "Token mal formado o inválido";
            }
            return res.status(401).json({ error: errorMessage });
        }

        let userId = decoded.id;

        if (req.body.id) {
            userId = req.body.id;
        }
        const sql = "SELECT * FROM usuarios WHERE usuario_id = ?";

        db.query(sql, [userId], (err, result) => {
            if (err) {
                console.error("Error al consultar la base de datos:", err);
                res.status(500).send("Error al obtener perfil de usuario");
            } else {
                if (result.length > 0) {
                    const userProfile = {
                        id: result[0].usuario_id,
                        fullName: result[0].nombre,
                        username: result[0].usuario,
                        email: result[0].email,
                        address: result[0].address,
                        telefono: result[0].telefono,
                        password: result[0].contrasena,
                        rol: result[0].rol_id,
                    };
                    res.json(userProfile);
                } else {
                    res.status(404).json({ error: "Usuario no encontrado" });
                }
            }
        });
    });
});

app.post("/profile/user/update", async (req, res) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader.split(" ")[1];

    Jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            let errorMessage = "Token inválido";
            if (err.name === "TokenExpiredError") {
                errorMessage = "Token expirado";
            } else if (err.name === "JsonWebTokenError") {
                errorMessage = "Token mal formado o inválido";
            }
            return res.status(401).json({ error: errorMessage });
        } else {
            const tokenId = decoded.id;

            const { id, fullname, email, username, phonenumber, address } = req.body;
            const updateUserQuery =
                "UPDATE usuarios SET nombre = ?, usuario = ?, email = ?, telefono = ?, address = ? WHERE usuario_id = ?";

            if (tokenId != id && decoded.rol != 2) {
                return res.status(403).json({ error: "No tienes permiso para editar este perfil" });
            }

            db.query(
                updateUserQuery,
                [fullname, username, email, phonenumber, address, id],
                (err, result) => {
                    if (err) {
                        console.error("Error al actualizar el perfil del usuario:", err);
                        return res
                            .status(500)
                            .json({ error: "Error al actualizar el perfil del usuario" });
                    } else {
                        if (result.affectedRows > 0) {
                            if (tokenId == id) {
                                const tokenData = {
                                    id: id,
                                    fullName: fullname,
                                    username: username,
                                    email: email,
                                    rol: decoded.rol,
                                };

                                const newToken = Jwt.sign(tokenData, secretKey, {
                                    expiresIn: "5h",
                                });
                                return res
                                    .status(200)
                                    .json({
                                        message: "Perfil de usuario actualizado correctamente",
                                        token: newToken,
                                    });
                            } else {
                                return res
                                    .status(200)
                                    .json({
                                        message: "Perfil de usuario actualizado correctamente",
                                    });
                            }
                        } else {
                            return res.status(404).json({ error: "Usuario no encontrado" });
                        }
                    }
                }
            );
        }
    });
});

app.post("/deleteuser", (req, res) => {
    const id = req.body.id;
    const query = "DELETE FROM usuarios WHERE usuario_id = ?";

    db.query(query, [id], (err) => {
        if (err) {
            console.error("Error al eliminar usuario en la base de datos:", err);
            res.status(500).json({ error: "Error al eliminar usuario" });
        } else {
            res.status(201).json({ message: "Usuario eliminado exitosamente" });
        }
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.clear();
    console.log(`Servidor Express en http://localhost:${PORT}`);
});
