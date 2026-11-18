<?php
echo "\n";
echo '<div id="noteInputBox">'; 
echo '<form>';
echo '<input id="nid" type="hidden">';
echo '<input id="title" type="text" style="width:400px" placeholder="Title"><br><br>';
echo '<input id="url" type="text" style="width:400px" placeholder="URL"><br><br>';
echo '<textarea id="note" rows="6" style="width:400px" placeholder="Note"></textarea><br><br>';
echo '<textarea id="tags" rows="2" style="width:400px" placeholder="Tags"></textarea><br><br>';
echo '<input id="inputType" type="hidden" name="it" value="insert">';
echo '</form>';
echo '<span class="button" onclick="store()">OK</span> &nbsp;';
echo '<span class="button" onclick="clearForm()">Clear</span> &nbsp;';
echo '<span class="button" onclick="closeNoteInput()">Close</span>';
echo ' &nbsp; &nbsp; <span id="prog_not"></span> ';
echo '</div>';
echo "\n";
?>