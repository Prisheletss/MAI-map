<?php
// Подключаемся к базе данных SQLite3
$db = new SQLite3("data.db");

// Выполняем запрос
$result = $db->query("SELECT * FROM `rooms`");

// Обрабатываем результат
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    echo $row['floor'] . "<br>";
}

// Закрываем соединение (не обязательно, но рекомендуется)
$db->close();
?>
