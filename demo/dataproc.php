<?php    
//session_start(); 
require('cleantags.php');   
$lid = "ied".rand();
$cat = '';
getXYZ($lid, $url, $title, $note, $dispTags, $sanTags, 0, 0, $gid, $cat); //getXYZ($id_, $url_, $title_, $note_, $dispTags_, $sanTags_)
//echo 'Fuck you .. dumbshitr!';
?>