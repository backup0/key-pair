<?php
//session_start();

/*

if(empty($_SESSION['uid']))
{
    //header('Location: index.php');
    //exit;
    //echo "User ID is empty ..";
    if (!isset($_SESSION['uid']))
    {
        
        //header('Location: index.php');
        exit;
    }
}
*/
/*
if (!isset($_SESSION['uid']))
{
    header('Location: index.php');
    exit;
}

if (!isset($_GET['usr']))
{
    header('Location: notes.php?usr='.$_SESSION['uid']);
    exit;
}
*/
/*
if (empty($_GET['usr']))
{
    header('Location: notes.php?usr='.$_SESSION['uid']);
    exit;
}
*/


/*

Types of entries ..
normal : standard 
fadeout .. : tells you that it's lo nnger relevant .. but kiv
archived : its' archived; put in specuial dir, fadeout
deleted ... : maybe we can use it later ..
-----------
bookmarked : special section / fade out
-----------

FLAGS:
Normal 0 already using this...
Strike 1 strike thotugh tell us that ti is irrelevavant

Normal + Sticky 2 we show this on top of every page(?)
Strike + Sticky 3 if its' striked ..

Normal + Bookmarked 4 beacsue we want to bookmark it ..
Strike + Bookmarked 5 

Normal + Archived 6
Strike + Archived 7 Yes. If it's originallt strked thorugh .. Strike though applies to the note itself; it's about the note - bm is just category.

Normal + Trash 8
Strike + Trash 9

*/


?>

<!DOCTYPE html>
<html>
    <head>
        <title>{key:pair}</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    </head>
<body>

<?php

showPage();
$globCat;

function showPage()
{
    
    $uid = '000000';
    $urlPart = 'notes.php?usr=000000';
    $noParam = false;
    $kaunt = 0;
    require('inputs.php');
    //require('paginator.php');
    //equire('cleantags.php');
    showEntries();
}

function showEntries()
{   
        /*
        $table = $_SESSION['table'];
        
        $dbh = new PDO('sqlite:database.db');
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
        */
        
        
        $table = 'tabl3x';
        $uid = '000000x';
        
        // kaunt first ...
        $cat = '';
        $kaunt = 0;
        
        $urlPart = 'notes.php?usr='.$uid;
        $noParam = false;
        require('paginator.php');
        require('cleantags.php');
        echo '<div id="narea"><div id="sticky">';
        
        echo '</div>';                       

        echo '<div id="nc">';
            
        echo '</div></div>';
}
    
?>

<script>
var pageName = "notes";
<?php
$cat = '';
if (isset($_GET['cat']))
{   
    $cat = $_GET['cat'];
}
echo 'var cat = "'.$cat.'";';
?>
</script>
<script src="noteaction.js"></script>

</body>
</html>