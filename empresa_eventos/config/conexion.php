<?php
class Conexion {
    private static $host = "localhost";
    private static $db_name = "imperium_eventos";
    private static $username = "root"; // Usuario por defecto en XAMPP
    private static $password = "";     // Password por defecto en XAMPP
    private static $conn = null;

    public static function conectar() {
        if (self::$conn === null) {
            try {
                self::$conn = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$db_name . ";charset=utf8", self::$username, self::$password);
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch(PDOException $e) {
                die("Error de Conexión a la BD: " . $e->getMessage());
            }
        }
        return self::$conn;
    }
}
?>