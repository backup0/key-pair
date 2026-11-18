<script>

var limit;
var navLimit;
var currentPage;
var block;
var done;

function slideLeft()
{
    if (block == 0) return;
    
    var g = document.getElementById("navibar");
    var al = g.getElementsByTagName("a");
    var len = al.length;
    var ps;
    
    // start location, start page?
    var start = (--block) * navLimit;
    
    var t;
    t = document.getElementById("rightSlider");
    t.style.opacity = "1.0";
    
    if (block == 0)
    {
        t = document.getElementById("leftSlider");
        t.style.opacity = "0.3";
    }
    
    var i = 0;
    while (i < len)
    {
        ps = (start++) + 1;
        <?php
            if ($noParam)
            {
                echo 'al[i].href = "'.$urlPart.'?page=" + (ps - 1);';
            }
            else
            {
                echo 'al[i].href = "'.$urlPart.'&page=" + (ps - 1);';
            }
        ?>
        al[i].innerHTML = ps;
        i++;
    }
    done = false;
}

function slideRight()
{
    if (done)
    {
        return;
    }
    
    //
    var v;
    v = document.getElementById("leftSlider");
    v.style.opacity = "1.0";
    //
    
    var g = document.getElementById("navibar");
    var al = g.getElementsByTagName("a");
    var len = al.length;
    
    var start = (++block) * navLimit;
    var ps;
    // limit is page count.
    var i = 0;
    while (i < len)
    {                 
        if (ps >= limit)
        {
            al[i].innerHTML = "";
            done = true;
        }
        else
        {
            ps = (start++) + 1;
            
            <?php
            if ($noParam)
            {
                echo 'al[i].href = "'.$urlPart.'?page=" + (ps - 1);';
            }
            else
            {
                echo 'al[i].href = "'.$urlPart.'&page=" + (ps - 1);';
            }
            ?>
            
            if (ps >= limit)
            {
                done = true;
                var t = document.getElementById("rightSlider");
                t.style.opacity = "0.3";
            }
            al[i].innerHTML = ps;        
        }
        i++;
    }
}

</script>

<?php

// In separate page
// this is the page number per block ..
$navLimit = 10;//10;

$limit = 100; //5;
// kaunt is from some other pages..
$reqPage = $kaunt / $limit; // required page
$roundPage = intval($kaunt / $limit);

// how many pages do we need?
if ($reqPage > $roundPage)
{
    $pc = $roundPage + 1;
}
else
{
    $pc = $roundPage;
}            
// $pc is page count ...

if ($reqPage == 0)
{
    $pc = 1;
}

if (!isset($_GET['page']))
{
    $page = 0;
}
else
{     
    
    $page = $_GET['page'];
    if ($page >= $pc) // if page number is more than page count ..
    {
        if ($pc > 0)
        {
            $page = $pc - 1;
        }
        else
        {
            $page = 0;
        }
    }
}            

$b = 0; // block to display ..
$blockCount = 0; //

while (true)
{
    if (intval($page) >= $b && intval($page) < ($b + $navLimit))
    {
        break;
    }
    
    $b = ($b + $navLimit);
    $blockCount++;
}

// to here ...              
echo "\n\n";
echo '<div id="folderm">';
echo '<div id="folderList"></div>';
echo '<br>';
echo '<div><span class="fa fa-folder"></span> <input type="text" id="foldername" placeholder="Add new category"><input type="hidden" id="folderid" value=""></div>';
echo '<br>';
echo '<div id="folderAct"> <span class="button" onclick="editFolder()">Ok</span> &nbsp;<span class="button" onclick="clearFolderEdit()">Clear</span> &nbsp;<span class="button" onclick="closeFolderManager()">Close</span></div>';
echo '</div>';

echo "\n\n";
echo '<div id="folders">';
echo '<div class="folderItem" style="cursor: pointer" onclick="setFolder(\'\')">DEFAULT</div>';
echo '<br>';
echo '<div id="foldersList">';
echo '</div>';
echo '<br>';
echo '<div><span class="button" onclick="addFolder()">Ok</span> &nbsp;<span class="button" onclick="closeSetFolderManager()">Close</span></div>';
echo '</div>';
echo "\n\n";

//?


//?
     
echo '<div id="mainav">';


if (strpos($urlPart, 'notes') !== false)
{
    echo ' <span title="All" class="fa red fa-file-text" onclick="goTo(\'notes.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Bookmared" class="fa fa-bookmark" onclick="goTo(\'bookmarked.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Archived" class="fa fa-archive" onclick="goTo(\'archive.php?usr='.$uid.'\')"></span>';
    echo ' <span class="fa fa-folder" onclick="showFolderManager()"></span>';
    echo ' <span title="Trash" class="fa fa-trash" onclick="goTo(\'trash.php?usr='.$uid.'\')"></span>';
}
else if (strpos($urlPart, 'archive') !== false)
{
    echo ' <span title="All" class="fa fa-file-text" onclick="goTo(\'notes.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Bookmared" class="fa fa-bookmark" onclick="goTo(\'bookmarked.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Archived" class="fa red fa-archive" onclick="goTo(\'archive.php?usr='.$uid.'\')"></span>';
    echo ' <span class="fa fa-folder" onclick="showFolderManager()"></span>';
    echo ' <span title="Trash" class="fa fa-trash" onclick="goTo(\'trash.php?usr='.$uid.'\')"></span>';
}
else if (strpos($urlPart, 'bookmarked') !== false)
{
    echo ' <span title="All" class="fa fa-file-text" onclick="goTo(\'notes.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Bookmared" class="fa red fa-bookmark" onclick="goTo(\'bookmarked.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Archived" class="fa fa-archive" onclick="goTo(\'archive.php?usr='.$uid.'\')"></span>';
    echo ' <span class="fa fa-folder" onclick="showFolderManager()"></span>';
    echo ' <span title="Trash" class="fa fa-trash" onclick="goTo(\'trash.php?usr='.$uid.'\')"></span>';
}
else if (strpos($urlPart, 'trash') !== false)
{
    echo ' <span title="All" class="fa fa-file-text" onclick="goTo(\'notes.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Bookmared" class="fa fa-bookmark" onclick="goTo(\'bookmarked.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Archived" class="fa fa-archive" onclick="goTo(\'archive.php?usr='.$uid.'\')"></span>';
    echo ' <span class="fa fa-folder" onclick="showFolderManager()"></span>';
    echo ' <span title="Trash" class="fa red fa-trash" onclick="goTo(\'trash.php?usr='.$uid.'\')"></span>';
}
else
{
    echo ' <span title="All" class="fa fa-file-text" onclick="goTo(\'notes.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Bookmared" class="fa fa-bookmark" onclick="goTo(\'bookmarked.php?usr='.$uid.'\')"></span>';
    echo ' <span title="Archived" class="fa fa-archive" onclick="goTo(\'archive.php?usr='.$uid.'\')"></span>';
    echo ' <span class="fa fa-folder" onclick="showFolderManager()"></span>';
    echo ' <span title="Trash" class="fa fa-trash" onclick="goTo(\'trash.php?usr='.$uid.'\')"></span>';
}
//echo ' <span title="User" class="fa fa-user" onclick="goTo(\'user.php\')"></span>';

echo '</div>';

echo '<div id="paginator">';
echo '<span class="fa fa-plus" onclick="showNoteInput()"></span>';
echo '<span style="margin: 0px 0px 10px 10px"></span>'; 
//echo ' <span class="fa fa-arrow-circle-up"></span>';
//echo ' <span class="fa fa-search"></span>';

echo ' <span id="leftSlider" class="fa fa-arrow-left" style="cursor:pointer;" onclick="slideLeft()"></span>';
echo ' &nbsp;<span id="navibar">';
$x = 0;
while ($x < $navLimit)
{                 
    if ($b < $pc )
    {        
        if ($noParam)
        {
            echo '<a class="naviitem" href="'.$urlPart.'?page='.$b.'">';
        }
        else
        {
            echo '<a class="naviitem" href="'.$urlPart.'&page='.$b.'">';
        }
        echo $b + 1;
        echo '</a> ';
        
        if ($b == ($pc - 1))
        {
            $done = 'done=true;';
        }
        else
        {
            $done = 'done=false;';
        }
    }
    else
    {
        if ($noParam)
        {
            echo '<a class="naviitem" href="'.$urlPart.'?page='.$b.'">';
        }
        else
        {
            echo '<a class="naviitem" href="'.$urlPart.'&page='.$b.'">';
        }
        echo '';
        echo '</a> ';
        $done = 'done=true;';                
    }
    $b++;
    $x++;
}

echo ' &nbsp;</span>';
echo ' <span id="rightSlider" class="fa fa-arrow-right" style="cursor:pointer;" onclick="slideRight()"></span>';
echo ' <span style="margin-left:10px;margin-right:10px;"></span> &nbsp; ';
echo 'Page '.($page + 1).'/'.$pc;
if (isset($vcat))
{
    if (strlen($vcat) > 0)
    {
        echo ' &nbsp; in <b>'.$vcat.'</b>';
    }
}
echo ' &nbsp; &nbsp; <span class="fa fa-user"></span> &nbsp; <a href="#">Demo@User</a>';
echo '<div class="bu_reminder"><span style="color:#D42322" class="fa fa-exclamation-triangle"></span> &nbsp; Save a copy of your notes as a precaution.';
echo ' <a target="_blank" href="notes_plain.php">Get plain notes.</a></div>';
echo '</div>';

echo "\n\n";
echo '<script>';
echo 'limit='.$pc.';';
echo 'navLimit='.$navLimit.';';
echo 'currentPage='.$page.';';
echo 'block='.$blockCount.';';
echo 'usr="'.$uid.'";';
echo $done;
if ($blockCount === 0)
{
    echo 'document.getElementById("leftSlider").style.opacity = "0.3";';
}

if ($done === 'done=true;')
{
    echo 'document.getElementById("rightSlider").style.opacity = "0.3";';
}
echo '</script>';
echo "\n\n";
$offset = ($page * $limit);
?>