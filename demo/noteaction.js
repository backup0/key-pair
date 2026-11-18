
var selectedNote = "";
var folderDialogOpen = false;

function clearForm()
{    
    document.getElementById("title").value = "";
    document.getElementById("url").value = "";
    document.getElementById("nid").value = "";
    document.getElementById("note").value = "";
    document.getElementById("tags").value = "";
    document.getElementById("inputType").value = "insert";
    document.getElementById("title").focus();
}

function store()
{    
    document.getElementById("prog_not").textContent = "Saving note ...";
    if (document.getElementById("inputType").value == "edit")
    {    
        setEdit(document.getElementById("nid").value);
    }
    else
    {
        storeData();
    }    
}
  
function storeData()
{    
    var xhttp = new XMLHttpRequest(); 

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        //document.getElementById("blocka").innerHTML = ;
        var ct = stripTheRest(xhttp.responseText);
        if (ct.length > 0)
        {
            var nc =  document.getElementById("nc");
            if (pageName == "notes")
            {                
                newP = document.createElement("p");
                newP.innerHTML = ct;                
                nc.insertBefore(newP, nc.childNodes[0]); 
            }    
            closeNoteInput();
            document.getElementById("prog_not").textContent = "";
        }
      }
    };
    
    // http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
    var title = encodeURIComponent(document.getElementById("title").value).replace(/%20/gi, "+");
    var url = encodeURIComponent(document.getElementById("url").value);
    var note = encodeURIComponent(document.getElementById("note").value).replace(/%20/gi, "+");
    var tags = encodeURIComponent(document.getElementById("tags").value).replace(/%20/gi, "+");
    //var reqURL = "http://localhost/dataproc.php"; 
    var reqURL = "dataproc.php"; 
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("title=" + title + "&url=" + url + "&gid=" + cat + "&note=" + note + "&tags=" + tags);
    document.getElementById("prog_not").textContent = "Storing note ...";
}

function edit(eid)
{    
    var title = eid.getElementsByClassName("title");
    var note = eid.getElementsByClassName("note");
    var tags = eid.getElementsByClassName("htags");
    
    document.getElementById("inputType").value = "edit";
    document.getElementById("nid").value = eid.id;    
    
    document.getElementById("title").value = "";
    document.getElementById("url").value = "";
    //document.getElementById("nid").value = "";
    document.getElementById("note").value = "";
    document.getElementById("tags").value = "";
    document.getElementById("title").focus();
    
    if (title.length == 0)
    {
        //$("#title").val("Untitled");
        document.getElementById("title").value = "Untitled";
    }
    else
    {       
        var url = title[0].getElementsByTagName("a");
        var plainTitle;
        if (url.length > 0)
        {
            //$("#url").val(url[0].href);
            document.getElementById("url").value = url[0].href;
            //$("#title").val(url[0].innerHTML);
            document.getElementById("title").value = url[0].textContent;
        }
        else
        {   
             plainTitle = title[0].getElementsByClassName("ptitle");
             if (plainTitle.length > 0)
             {
                //$("#title").val(plainTitle[0].textContent);
                document.getElementById("title").value = plainTitle[0].textContent;
             }
        }
    }
    
    if (note.length == 0)
    {
        //$("#note").val("");
        document.getElementById("note").value = "";
    }
    else
    {
        //$("#note").val(note[0].textContent);
        document.getElementById("note").value = note[0].textContent;
    }
    
    if (tags.length == 0)
    {
        //$("#tags").val("");
        document.getElementById("tags").value = "";
    }
    else
    {
        //$("#tags").val(tags[0].innerHTML);
        document.getElementById("tags").value = tags[0].textContent;
    }
    //$("#title").focus();
    //document.getElementById("title").focus();    
    showNoteInput();
} 

function setEdit(pid)
{    
    var xhttp = new XMLHttpRequest(); //create a request
    //xhttp.open("GET", "ajax.php", true);
    //xhttp.send();    
    
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        //document.getElementById("blocka").innerHTML = ;
        var ct = stripTheRest(xhttp.responseText);
        if (ct.length > 0)
        {     
            var c = document.getElementById(pid);
            c.outerHTML = ct;
        }
        else
        {
            
        }
        clearForm();
        closeNoteInput();
        document.getElementById("prog_not").textContent = "";
      }
    };
    
    // http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
    /*
    var title = encodeURIComponent(document.getElementById("title").value).replace(/%20/gi, "+");
    var url = encodeURIComponent(document.getElementById("url").value);
    var note = encodeURIComponent(document.getElementById("note").value).replace(/%20/gi, "+");
    var tags = encodeURIComponent(document.getElementById("tags").value).replace(/%20/gi, "+");
    */
    var title = encodeURIComponent(document.getElementById("title").value).replace(/%20/gi, "+");
    var url = encodeURIComponent(document.getElementById("url").value);
    var note = encodeURIComponent(document.getElementById("note").value).replace(/%20/gi, "+");
    var tags = encodeURIComponent(document.getElementById("tags").value).replace(/%20/gi, "+");
    var noteid = document.getElementById("nid").value;
    var reqURL = "dataproc.php"; 
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("title=" + title + "&url=" + url + "&cat=" + "" + "&note=" + note + "&tags=" + tags + "&nid=" + noteid);
}

function delete_pm(pid)
{
    var nid = pid.id;
    var parent = pid.parentNode;            
    parent.removeChild(pid);
    /*
    var reqURL = "delete_note.php";
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var parent = pid.parentNode;            
            parent.removeChild(pid);
        }
    }    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nid=" + nid);
    */
}

function strike(pid)
{
    var nid = pid.id;
    if (pid.className == "entries")
    {
        pid.className = "entries-strike";
    }
    else
    {
        pid.className = "entries";
    }
    /*
    //var reqURL = "http://localhost/cflag.php?ops=strike" + "&nid=" + nid;
    var reqURL = "cflag.php";
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            if (pid.className == "entries")
            {
                pid.className = "entries-strike";
            }
            else
            {
                pid.className = "entries";
            }
        }
    }
    */
    //xhttp.open("POST", reqURL, true);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhttp.send("ops=strike" + "&nid=" + nid);
    
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
}

function sticky(pid)
{
    var nid = pid.id;
    
    var sticky = document.getElementById("sticky");
            var stickyFirstChild = sticky.firstChild;
            
            var ts = pid.getElementsByClassName("ntype");
            var type = ts[0].innerHTML;
            
            var title = pid.getElementsByClassName("title");            
            
            if (type == 2) // bookmarked, strip the icon first
            {
                var bm = title[0].getElementsByClassName("fa fa-bookmark-o");
                var bmicon = bm[0];
                title[0].removeChild(bmicon);
            }
            
            if (type == 0 || type == 2 || type == 3) // from normal or bookmarked ..
            {
                title[0].innerHTML = "<span class=\"fa fa-paperclip\"></span> " + title[0].innerHTML;
                sticky.appendChild(pid);
                ts[0].innerHTML = 1;                
            }
            else if (type == 1)
            {
                var t = title[0].getElementsByClassName("fa fa-paperclip");
                var pc = t[0];
                title[0].removeChild(pc);
                ts[0].innerHTML = 0;  
                
                if (pageName == "notes")
                {
                    var nc = document.getElementById("nc");
                    var ncFc = nc.firstChild;    
                    if (ncFc == null)
                    {
                        nc.appendChild(pid);
                    }           
                    else
                    {
                        nc.insertBefore(pid, ncFc);
                    }
                } 
                else
                {
                    var parent = pid.parentNode;            
                    parent.removeChild(pid);
                }
            }
    
    /*
    var reqURL = "cflag.php";
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var sticky = document.getElementById("sticky");
            var stickyFirstChild = sticky.firstChild;
            
            var ts = pid.getElementsByClassName("ntype");
            var type = ts[0].innerHTML;
            
            var title = pid.getElementsByClassName("title");            
            
            if (type == 2) // bookmarked, strip the icon first
            {
                var bm = title[0].getElementsByClassName("fa fa-bookmark-o");
                var bmicon = bm[0];
                title[0].removeChild(bmicon);
            }
            
            if (type == 0 || type == 2 || type == 3) // from normal or bookmarked ..
            {
                title[0].innerHTML = "<span class=\"fa fa-paperclip\"></span> " + title[0].innerHTML;
                sticky.appendChild(pid);
                ts[0].innerHTML = 1;                
            }
            else if (type == 1)
            {
                var t = title[0].getElementsByClassName("fa fa-paperclip");
                var pc = t[0];
                title[0].removeChild(pc);
                ts[0].innerHTML = 0;  
                
                if (pageName == "notes")
                {
                    var nc = document.getElementById("nc");
                    var ncFc = nc.firstChild;    
                    if (ncFc == null)
                    {
                        nc.appendChild(pid);
                    }           
                    else
                    {
                        nc.insertBefore(pid, ncFc);
                    }
                } 
                else
                {
                    var parent = pid.parentNode;            
                    parent.removeChild(pid);
                }
            }
        }
    }
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ops=sticky" + "&nid=" + nid);
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();    
    */
}

function bookmark(pid)
{
    var ts = pid.getElementsByClassName("ntype");
    var type;
            
    var nid = pid.id;
    type = ts[0].innerHTML;
    var title = pid.getElementsByClassName("title");
    
    switch (type)
    {
        case "0":
            title[0].innerHTML = "<span class=\"fa fa-bookmark-o\"></span> " + title[0].innerHTML;
            ts[0].innerHTML = "2";
            break;
        case "1":                        
            if(pageName == "notes" || pageName == "bookmarked")   
            {
                var c = title[0].getElementsByClassName("fa fa-paperclip");
                title[0].removeChild(c[0]); 
                title[0].innerHTML = "<span class=\"fa fa-bookmark-o\"></span> " + title[0].innerHTML;
                ts[0].innerHTML = "2";
                
                var nc = document.getElementById("nc");
                var ncFc = nc.firstChild;    
                if (ncFc == null)
                {
                    nc.appendChild(pid);
                }           
                else
                {
                    nc.insertBefore(pid, ncFc);
                }
            }
            else // bookmark page .. e can just add it here..
            {
                var parent = pid.parentNode;            
                parent.removeChild(pid);
            }
            break;
        case "2": // bookmarked
            if (pageName == "notes")
            {
                var a = title[0].getElementsByClassName("fa fa-bookmark-o");
                title[0].removeChild(a[0]);
                ts[0].innerHTML = "0"; 
            }
            else
            {
                var parent = pid.parentNode;            
                parent.removeChild(pid);
            }
            break;
         case "3":
            var parent = pid.parentNode;            
            parent.removeChild(pid);
            break;
    }      
    
    /*
    //var reqURL = "http://localhost/cflag.php?" + "ops=bookmark" + "&nid=" + nid;
    var reqURL = "cflag.php";
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {        
            var ts = pid.getElementsByClassName("ntype");
            var type;
            
            if (ts.length > 0)
            {
                type = ts[0].innerHTML;
                var title = pid.getElementsByClassName("title");
                
                switch (type)
                {
                    case "0":
                        title[0].innerHTML = "<span class=\"fa fa-bookmark-o\"></span> " + title[0].innerHTML;
                        ts[0].innerHTML = "2";
                        break;
                    case "1":                        
                        if(pageName == "notes" || pageName == "bookmarked")   
                        {
                            var c = title[0].getElementsByClassName("fa fa-paperclip");
                            title[0].removeChild(c[0]); 
                            title[0].innerHTML = "<span class=\"fa fa-bookmark-o\"></span> " + title[0].innerHTML;
                            ts[0].innerHTML = "2";
                            
                            var nc = document.getElementById("nc");
                            var ncFc = nc.firstChild;    
                            if (ncFc == null)
                            {
                                nc.appendChild(pid);
                            }           
                            else
                            {
                                nc.insertBefore(pid, ncFc);
                            }
                        }
                        else // bookmark page .. e can just add it here..
                        {
                            var parent = pid.parentNode;            
                            parent.removeChild(pid);
                        }
                        break;
                    case "2": // bookmarked
                        if (pageName == "notes")
                        {
                            var a = title[0].getElementsByClassName("fa fa-bookmark-o");
                            title[0].removeChild(a[0]);
                            ts[0].innerHTML = "0"; 
                        }
                        else
                        {
                            var parent = pid.parentNode;            
                            parent.removeChild(pid);
                        }
                        break;
                     case "3":
                        var parent = pid.parentNode;            
                        parent.removeChild(pid);
                        break;
                }              
            }
        }
    }    
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ops=bookmark" + "&nid=" + nid);
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
    */
}

function archive(pid)
{
    var nid = pid.id;
    var ts = pid.getElementsByClassName("ntype");
    var type = ts[0].innerHTML;
    
    var parent = pid.parentNode;            
    parent.removeChild(pid);           
    
    if (pageName == "arch" && type == 1) // if we're @ archive, add it...
    {
        var t = title[0].getElementsByClassName("fa fa-paperclip");
        var pc = t[0];
        title[0].removeChild(pc);
        
        var nc = document.getElementById("nc");
        var ncFc = nc.firstChild;    
        if (ncFc == null)
        {
            nc.appendChild(pid);
        }           
        else
        {
            nc.insertBefore(pid, ncFc);
        }
    }
    
    /*
    //var reqURL = "http://localhost/cflag.php?" + "ops=archive&nid=" + nid;
    var reqURL = "cflag.php";
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {   
            var ts = pid.getElementsByClassName("ntype");
            var type = ts[0].innerHTML;
            
            var parent = pid.parentNode;            
            parent.removeChild(pid);           
            
            if (pageName == "arch" && type == 1) // if we're @ archive, add it...
            {
                var t = title[0].getElementsByClassName("fa fa-paperclip");
                var pc = t[0];
                title[0].removeChild(pc);
                
                var nc = document.getElementById("nc");
                var ncFc = nc.firstChild;    
                if (ncFc == null)
                {
                    nc.appendChild(pid);
                }           
                else
                {
                    nc.insertBefore(pid, ncFc);
                }
            }
        }
    }
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ops=archive&nid=" + nid);
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
    */
}

function trash(pid)
{
    var nid = pid.id;
    var parent = pid.parentNode;            
    parent.removeChild(pid);
    /*
    //var reqURL = "http://localhost/cflag.php?" + "ops=trash&nid=" + nid;
    var reqURL = "cflag.php";
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var parent = pid.parentNode;            
            parent.removeChild(pid);
        }
    }
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ops=trash&nid=" + nid);
    //xhttp.open("GET", reqURL, true);
    //xhttp.send
    */
}

function untrash(pid)
{
    var nid = pid.id;
   
    //var reqURL = "http://localhost/cflag.php?" + "ops=trash&nid=" + nid;
    var reqURL = "cflag.php";
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var parent = pid.parentNode;            
            parent.removeChild(pid);
        }
    }
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ops=trash&nid=" + nid);
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
}

function showFolderManager()
{
    if (folderDialogOpen) return;
    folderDialogOpen = true;
    
    var fm = document.getElementById("folderm");
    fm.style.display = "block";
    
    var lm = document.getElementById("folderList");
    
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var ct = stripTheRest(xhttp.responseText);
            lm.innerHTML = ct;
        }
    }
    
    var reqURL = "getfolder.php";
    xhttp.open("GET", reqURL, true);
    xhttp.send();
}

function closeFolderManager()
{
    folderDialogOpen = false;
    
    var fm = document.getElementById("folderm");
    fm.style.display = "none";
    document.getElementById("folderid").value = "";
    document.getElementById("foldername").value = "";
}

function renameFolder(id)
{
    document.getElementById("folderid").value = id;
    var fEntry = document.getElementById("f" + id);
    var spans = fEntry.childNodes
    if (spans.length > 0)
    {
        document.getElementById("foldername").value = spans[0].textContent;
    }
}

function addFolder()
{      
    var reqUrl;
    var fm = document.getElementById("foldersList");
    var fidc = "";
    var nameInput = document.getElementById("foldername");
    var newDiv;
    
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var ct = stripTheRest(xhttp.responseText);
            
            newDiv = document.createElement("div");
            newDiv.innerHTML = ct;
            newDiv = newDiv.childNodes[0];
            fm.appendChild(newDiv);  
            nameInput.value = "";
        }
    }
    
    reqURL = "addgroup2.php";
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("gname=" + encodeURIComponent(nameInput.value));
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
}

function editFolder()
{
    var reqUrl;
    var fid = document.getElementById("folderid").value;
    var fm = document.getElementById("folderList");
    var fidc = "";
    var nameInput = document.getElementById("foldername");
    var newDiv;
    
    if (nameInput.value.length == 0)
    {
        return;
    }
    
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var ct = stripTheRest(xhttp.responseText);
            
            if (fidc.length == 0) // append
            {
                if (ct.length > 0)
                {
                    newDiv = document.createElement("div");
                    newDiv.innerHTML = ct;
                    newDiv = newDiv.childNodes[0];
                    fm.appendChild(newDiv);
                }
            }
            else
            {
                location.href = location.href;  
            }                
            document.getElementById("folderid").value = "";
            nameInput.value = "";
        }
    }
    
    var qp;
    reqURL = "addgroup.php";
    
    if (fid.length == 0) // new
    {
        qp = "gname=" + encodeURIComponent(nameInput.value);
    }
    else // edit...
    {
        fidc = "f" + fid;
        qp = "gname=" + nameInput.value + "&fid=" + fid;
        //
    }
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(qp);
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
}

function deleteFolder(fid)
{
    var reqUrl;
    
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var folderEntry  = document.getElementById("f" + fid);
            folderEntry.parentNode.removeChild(folderEntry);
            
            if (cat == fid)
            {
                location.href = "notes.php?usr=" + usr;
            }
            else
            {
                location.href = location.href;  
            }             
        }
    }
    
    reqURL = "delgroup.php";
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("fid=" + fid);
    
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
}

function stripTheRest(text)
{
    var i = text.indexOf("<!-- Hosting24 Analytics Code -->");
    if (i > 0)
    {
        text = text.substring(0, i);
        console.log("Text length -> " + text.length);
        if (text == "\r\n")
        {
            return "";
        }
        else
        {
            return text;
        }
    }
    else if (i == 0)
    {
        return "";
    }
    else
    {
        return text;
    }
}

function setFolder(fid)
{    
    var reqUrl;
    
    if (selectedNote.length == 0)
    {
        return;
    }
    
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var ct = stripTheRest(xhttp.responseText);
            
            var selNote = document.getElementById(selectedNote);
            var stickyNode = 
                selNote.getElementsByClassName("title")[0].getElementsByClassName("fa fa-paperclip");
            
            var sticky = false;
            if (stickyNode.length > 0)
            {
                sticky = true;
            }
            
            // ok .. now let's see if we have existing folder.
            var exF = selNote.getElementsByClassName("catMarker");
            var tCont; 
            
            if (cat.length == 0 || sticky) // we're @ ALL page.
            {
                if (exF.length > 0) // yes .. we delete delete the cat. marker.
                {
                    exF[0].parentNode.removeChild(exF[0]);                    
                }
                
                if (ct.length > 0)
                {
                    tCont = selNote.getElementsByClassName("title")[0].innerHTML;
                    selNote.getElementsByClassName("title")[0].innerHTML = tCont + 
                        "<span class=\"catMarker\" onclick=\"getPageByCat('" + fid + "')\">"+ ct +"</span>";
                }
            }
            else
            {
                if (fid != cat)
                {
                    selNote.parentNode.removeChild(selNote);
                }                
            }            
            selectedNote = "";
            closeSetFolderManager();            
        }
    }    
    
    reqURL = "cgroup.php";
    var qp;
    
    if (fid.length == 0)
    {
        qp = "nid=" + selectedNote;
    }
    else
    {
        qp = "nid=" + selectedNote + "&gid=" + fid;
    }
    
    xhttp.open("POST", reqURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(qp);
    //xhttp.open("GET", reqURL, true);
    //xhttp.send();
}

function clearFolderEdit()
{
    document.getElementById("foldername").value = "";
}

function showSetFolderManager()
{    
    if (folderDialogOpen) return;
    folderDialogOpen = true;
    
    var fm = document.getElementById("folders");
    fm.style.display = "block";
    
    var lm = document.getElementById("foldersList");
    
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            var ct = stripTheRest(xhttp.responseText);
            lm.innerHTML = ct;
        }
    }
    
    var reqURL = "getfoldersel.php";
    xhttp.open("GET", reqURL, true);
    xhttp.send();
}

function closeSetFolderManager()
{
    folderDialogOpen = false;
    
    var fm = document.getElementById("folders");
    fm.style.display = "none";
}

function selectNote(nid)
{   
    selectedNote = nid.id;
    showSetFolderManager();    
}

function getPageByCat(cat)
{
    location.href = "notes.php?usr=" + usr + "&cat=" + cat;
}

function showNoteInput()
{
    var ib = document.getElementById("noteInputBox");
    ib.style.display = "block";
    document.getElementById("title").focus();
} 

function closeNoteInput()
{
    var ib = document.getElementById("noteInputBox");
    ib.style.display = "none";
    clearForm();
}

function goTo(loc)
{
    location.href = loc;
}