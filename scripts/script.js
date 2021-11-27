function loadDoc() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "files/todo.json", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tasks = JSON.parse(this.response);
            let table = document.getElementById("taskTable");
            let row = table.insertRow(0);
            let cell, cellNo;
            let propNames = ["ID", "Task Description", "Created At", "Tags", "Complete?"];
            for (let i = 0; i < propNames.length; i++) {
                cell = row.insertCell(i).outerHTML = "<th>" + propNames[i] + "</th>"; 
            }
            let rowNo = 1;
            for (let i = 0; i < tasks.length; i++) {
                row = table.insertRow(rowNo);
                cellNo = 0;
                for (let prop in tasks[i]) {
                    cell = row.insertCell(cellNo);
                    if (prop == "Tags") {
                        cell.className = "tagList";
                        let tagValue = tasks[i][prop];
                        let tagContents = "<ul>";
                        for (let k = 0; k < tagValue.length; k++) {
                            tagContents += "<li>" + tagValue[k] + "</li>"
                        }
                        tagContents += "</ul>"
                        cell.innerHTML = tagContents;
                    }
                    else if (prop == "is_complete") {
                        cell.className = "isComplete";
                        if (tasks[i][prop]) {
                            cell.innerHTML = "<i class='fa fa-check'></i>";
                        }
                        else {
                            cell.innerHTML = "<i class='fas fa-times'></i>";
                        }
                    }
                    else {
                        cell.innerHTML = tasks[i][prop];
                    }
                    cellNo++;
                }
                rowNo++;
            }
            document.getElementById("displayBtn").style.display = "none";
        }
    };
    xhr.send();
}