// terminal.js
document.addEventListener("DOMContentLoaded", () => {
    const commandInput = document.getElementById("commandInput");
    const outputDiv = document.getElementById("output");

    const commands = {
        about: "Hi, I'm Nidhi! I'm a Software Engineer by trade and a computational mathematician by study.  I love solving complex problems using code and mathematics.",
        portfolio: "Check out my portfolio: [portfolio link here]. Projects I’ve worked on include machine learning models, web apps, and algorithm visualizations.",
        contact: "You can reach me at: nidhibaindur@outlook.com",
        socialmedia: "My linkedin is Nidhi Baindur",
        funfact: "My favoutrite actor is Shah Rukh Khan :)",
        clear: "" // Will handle separately
    };

    function runCommand(command) {
        const cleanCommand = command.trim().toLowerCase();
        let response = "Command not found. Type 'help' for a list of commands.";

        if (commands[cleanCommand]) {
            response = commands[cleanCommand];
        }

        if (cleanCommand === "clear") {
            outputDiv.innerHTML = "";
            return;
        }

        // Display user input and response
        outputDiv.innerHTML += `<div><span class="prompt">></span> ${command}</div>`;
        outputDiv.innerHTML += `<div>${response}</div>`;
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    commandInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const command = commandInput.value;
            commandInput.value = "";
            runCommand(command);
        }
    });
});
