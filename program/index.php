<!DOCTYPE html>
<html lang="ru">



<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>



<body>
    <canvas id="canvas" width="1300" height="1350"></canvas>

    <img id='clear' src='images/clear.png' hidden>

    <button 
            id='select_start'
            style='position: absolute; left: 10px; top: 1400px; visibility: hidden;'
            value=''
            onclick='handleClick(this)'>
        идти отсюда
    </button>
    <button 
            id='select_end'
            style='position: absolute; left: 110px; top: 1400px; visibility: hidden;'
            value=''
            onclick='handleClick(this)'>
        идти сюда
    </button>
    
    <button 
            id='handler_start'
            style='position: absolute; visibility: hidden;'
            value=''>
    </button>
    <button 
            id='handler_end'
            style='position: absolute; visibility: hidden'
            value=''>
    </button>



    <?php
        for ($i = 1; $i <= 7; $i++) {
            echo "<img id='floor_{$i}' src='images/{$i}.png' hidden>";
            $y = 10 + 50*$i;
            echo "<button 
                        id='floor_{$i}_button' 
                        style='position: absolute; left: 1300px; top: {$y}px;'
                        value='{$i}'
                        onclick='handleClick(this)'>
                    {$i} этаж
                </button>";
        }

        $db = new SQLite3("data.db");
        $result = $db->query("SELECT * FROM `rooms`");

        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $hide = "";
            if ($row['floor'] == 1) { $hide = "visible"; } 
            else { $hide = "hidden"; }

            echo "<button 
                        id='room_{$row['num']}_button' 
                        style='position: absolute; left: {$row['x']}px; top: {$row['y']}px; font-size: 8px; visibility: {$hide};'
                        value='{$row['info']}'
                        onclick='handleClick(this)'>
                    {$row['num']}
                </button>";
        }


        $db->close();
    ?>



    <p id="output1"></p> <!-- print(data) if button ever been clicked -->
    <p id="output2"></p>
    <script src="main.js"></script>
</body>



</html>