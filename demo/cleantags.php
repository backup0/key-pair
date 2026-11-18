<?php

$url = '';
if (isset($_POST['url']))
{
    $url = $_POST['url'];
    if (strlen($url) > 0)
    {
        $url = cleanUrl($url);
    }
}    

$note = '';
if (isset($_POST['note']))
{
    $note = $_POST['note'];
    $note = stripcslashes(filter_var($note, FILTER_SANITIZE_SPECIAL_CHARS));
}

$title = '';
if (isset($_POST['title']))
{
    $title = $_POST['title'];
    $title = stripcslashes(filter_var($title, FILTER_SANITIZE_SPECIAL_CHARS));
    if (strlen($title) == 0)
    {
        $title = 'Untitled';
    }
}
else
{
    if (strlen($url) > 0)
    {
        $title = stripcslashes(filter_var($url, FILTER_SANITIZE_SPECIAL_CHARS));
    }
    else
    {
        $title = 'Untitled';
    }
}

$tags = '';
if (isset($_POST['tags']))
{
    $tags = $_POST['tags'];
}

$gidEmpty = true;
$gid = '';
if (isset($_POST['gid']))
{
    $gid = $_POST['gid'];
    if (strlen($gid) > 0)
    {
        $gidEmpty = false;
    }
}     

$cleanedTags = cleanTags($tags);
$sanTags = $cleanedTags[0];
$dispTags = $cleanedTags[1];

if (strlen($note) > 0)
{
    $note = '<span class="note">'.$note.'</span>';
}

if (strlen($dispTags) > 0)
{
    $dispTags = '<span class="tags">'.$dispTags.'</span>';
}
    
function cleanUrl($url) 
{
/*
    if (!filter_var($url, FILTER_VALIDATE_URL) === false) {
        echo("$url is a valid URL<br>");
    } else {
        echo("$url is not a valid URL<br>");
    }*/
    
    // or http://www.w3schools.com/php/filter_validate_url.asp
    
    // USE YOUR OWN ... gttp is valid, so tat's kidna retraded
    
    $explodedUrl = explode('//', $url);
    
    $rUrl = '';
    if (!empty($explodedUrl))
    {
        $protocol = strtolower($explodedUrl[0]);
        
        //h 1
        //t 2
        //t 3
        //p 4
        //s 5
        //: 6
        if (strlen($protocol) == 5)
        {
            if ($protocol === 'http:')
            {
                $rUrl = $url;
            }
            else
            {
                $rUrl = '';
            }
            
        }
        else if (strlen($protocol) == 6)
        {   
            if ($protocol === 'https:')
            {
                $rUrl = $url;
            }
            else
            {
                $rUrl = '';
            }
        }
        else
        {
            $rUrl = 'http://'.$url;
        }
    }
    //return filter_var($rUrl, FILTER_SANITIZE_STRING);
    // Ok, we don't have to escape since w'ere not showing this inside tags .. 
    return $rUrl;
}

function cleanTags($tags)
{
    if (strlen($tags) <= 0)
    {
        $rtags = array('', '');
        return $rtags;
    }
    
    $explodedString;
    // disallow these in tags ... Tags will be part of url, so .. Yeah. So, if a tag contains the
    // following, ignore ...
    $illegal = array('!','*', '\'', '(',')',';',':','@','&','=','+','$',',','/','?','#','[',']', '<', '>');
    
    $sanTags = '';
    $dispTags = '';
    
    if (($explodedString = explode(' ', $tags)) != false)
    {
        foreach ($explodedString as $val)
        {   
            $ok = true;
            foreach ($illegal as $c)
            {
                if (strpos($val, $c) !== false)
                {
                    $ok = false;
                    break;
                }
            }
            
            if ($ok)
            {
                $sanTags .= $val. ' ';
                $dispTags .= '<a href="search.php?usr=000000ccc0xh&tag='.urlencode($val).'">'.$val.'</a> ';
                //echo '<a href="/tag='.urlencode($val).'">'.$val.'</a> ';
            }
        }        
    }
    
    $rtags = array($sanTags, $dispTags);
    return $rtags;
}

function getXYZ($id_, $url_, $title_, $note_, $dispTags_, $sanTags_, $_type, $_strike, $_catid, $_cat)
{
    $etype;
    
    if ($_strike == 0)
    {
        $etype = 'entries';
    }
    else
    {
        $etype = 'entries-strike';
    }
    
    echo '<p class="'.$etype.'" id="i'.$id_.'">';
    echo '<span class="ntype" style="display:none">'.$_type.'</span>';    
    echo '<span class="title" style="display:block; font-weight:bold;">';
    
    $stitle;
    
    if (strlen($url_) > 0)
    {
        $stitle = '<span class="fa fa-external-link"></span> <a href="'.$url_.'" target="_blank">'.$title_.'</a>';
    }
    else
    {
        $stitle = '<span class="ptitle">'.$title_.'</span>';
    }      
    
    switch ($_type)
    {
        case 1: // sticky.
            $stitle = '<span class="fa fa-paperclip"></span> '.$stitle;
            break;
        case 2: // bookmarked
            $stitle = '<span class="fa fa-bookmark-o"></span> '.$stitle;
            break;
    }
    
    if ($_cat !== '')
    {
       $stitle = $stitle.' <span class="catMarker" onclick="getPageByCat('.$_catid.')">'.$_cat.'</span>';
    }
    /*
    if ($_type == 2)
    {
        $stitle = '<span class="fa fa-bookmark-o"></span> '.$stitle;
    }
    */
    echo $stitle;    
    echo '</span>';
          
    if (strlen($note_) > 0)
    {
        echo '<span class="nhote" style="display:block;">'.$note_.'</span>';
    }
    if (strlen($dispTags_) > 0)
    {
        echo $dispTags_;
    }
    
    echo '<span class="htags" style="display:none">'.$sanTags_.'</span>';
    echo '<span class="actionz">';
    if ($_type != 4)
    {        
        echo '<span class="fa fa-pencil" title="edit" onclick="edit(i'.$id_.')"></span> ';
        echo '<span class="fa fa-strikethrough" title="strike" onclick="strike(i'.$id_.')"></span> ';
        echo '<span class="fa fa-paperclip" title="sticky" onclick="sticky(i'.$id_.')"></span> ';
        echo '<span class="fa fa-folder" title = "category" onclick="selectNote(i'.$id_.')"></span> ';
        echo '<span class="fa fa-bookmark" title="bookmark" onclick="bookmark(i'.$id_.')"></span> ';
        echo '<span class="fa fa-archive" title="archive" onclick="archive(i'.$id_.')"></span> ';
        echo '<span class="fa fa-trash" title="trash" onclick="trash(i'.$id_.')"></span> ';
    }
    else
    {
        echo '<span class="fa fa-reply" title="restore" onclick="untrash(i'.$id_.')"></span> ';
        echo '<span class="fa fa-trash" title="delete" onclick="delete_pm(i'.$id_.')"></span> ';
    }
    echo '</span>';
    echo '</p>';
} 

?>