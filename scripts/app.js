const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask() {
    // 1. Get the values from the DOM
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val(); 
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    // 2. Input Validations
    if (!title || !date) {
        alert("Error: Title and Date are required fields.");
        return; // Stops the function if validation fails
    }

    // 3. Create an object using the class
    const taskToSave = new Task(title, desc, color, date, status, budget);
    console.log("Task Saved:", taskToSave);

    // send to server
    $.ajax(
        {
            type: "POST",
            url: API,
            data: JSON.stringify(taskToSave),
            contentType: "application/json",
            success: function(created){
                console.log("Saved to server:", created);
                
                // FIX: Call displayTask here using the data the server sends back!
                displayTask(created);
            },
            error: function(err){
                console.log(err);
                alert("Error saving task.");
            }    
        }
    )

    // 5. Clear the form after saving
    $("#taskForm")[0].reset();
}

function update(){
    $.ajax({
        type: "put",
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/5",
        data: JSON.stringify({
            title: "this is the new title",
            budget: 1200,
        }),
        contentType: "application/json",
        success: function(response){
            console.log(response);
        },
        error: function(err){
            console,log(err);
        }
    })
}

function displayTask(task) {
    // Create HTML syntax for the new task
    let syntax = `
        <div class="task-item" style="border-left-color: ${task.color};">
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="task-status ${task.status.replace(/\s+/g, '-').toLowerCase()}">${task.status}</span>
            </div>
            <p><strong>Description:</strong> ${task.desc || "No description provided"}</p>
            <div class="task-details">
                <p><strong>Date:</strong> ${task.date}</p>
                <p><strong>Budget:</strong> $${task.budget || "0.00"}</p>
            </div>
        </div>
    `;
    
    // Append the new task to the list container
    $("#list").append(syntax);
}


// Moved outside of saveTask for proper scope
function loadTask() {
    $.ajax({
        type: "GET", 
        url: API, 
        dataType: "json", 
        success: function(data) {
            console.log("Data loaded from server:", data);
            
            // 1. Clear the HTML container first so we don't duplicate tasks
            $("#list").empty(); 
            
            // 2. The Loop: Iterate through the array of data from the server
            for (let i = 0; i < data.length; i++) {
                let currentTask = data[i];     // Grab the task at the current index
                if($currentTask.name === "lyn"){
                displayTask(currentTask);}      // Send it to the screen
            }
        }, 
        error: function(err) {
            console.error("Error loading tasks:", err);
            alert("Could not load tasks from the server.");
        } 
    });
}

function testConnection() {
    $.ajax({
        type: "GET",
        url: API,
        success: function(data) {
            console.log("Connection successful", data);
        },
        error: function(err) {
            console.error("Connection failed", err);
        }
    });
}

function init() {
    console.log("App initialized.");
    $("#btnSave").click(saveTask);
    
    // Optional: Load existing tasks when the app starts
    // loadTask(); 
}

// Force the html and css gets resolved, and when finished, execute the logic
window.onload = init;