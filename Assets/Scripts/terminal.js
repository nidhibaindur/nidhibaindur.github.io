// terminal.js
document.addEventListener("DOMContentLoaded", () => {
    const commandInput = document.getElementById("commandInput");
    const outputDiv = document.getElementById("output");

    const commands = {
        about: "Hi, I'm Nidhi! I'm a Software Engineer by trade and a computational mathematician by study.  I love solving complex problems using code and mathematics.",
        portfolio: "Check out my portfolio: [portfolio link here]. Projects I’ve worked on include machine learning models, web apps, and algorithm visualizations.",
        contact: "You can reach me at: nidhibaindur@outlook.com",
        funfact: "My favoutrite actor is Shah Rukh Khan :)",
        help: "Available commands are: about, portfolio, contact, funfact",
        clear: "" // Will handle separately
    };

    function getDateTimePrefix() {
        const now = new Date();
        const dateStr = now.toDateString().split(' ').slice(1).join(' ');
        const timeStr = now.toTimeString().split(' ')[0];
        return `Last login: ${dateStr} ${timeStr} on ttys2711`;
      }

      function appendPrompt() {
        outputDiv.innerHTML += `<div>nidhibaindur@Mac ~ %</div>`;
      }

    function runCommand(command) {
        const cleanCommand = command.trim().toLowerCase();
        let response = "Command not found. Type 'help' for a list of commands.";

        if (commands[cleanCommand]) {
            response = commands[cleanCommand];
        }

        if (cleanCommand === "clear") {
          outputDiv.innerHTML = `<div>${getDateTimePrefix()}</div>`;
          appendPrompt();
          return;
        }

        outputDiv.innerHTML += `<div><span class="prompt">&gt;</span> ${command}</div>`;
        outputDiv.innerHTML += `<div>${response}</div>`;
        appendPrompt();
        outputDiv.scrollTop = outputDiv.scrollHeight;
      }

      // Initialize terminal with date and prompt
      outputDiv.innerHTML = `<div>${getDateTimePrefix()}</div>`;
      appendPrompt();

      commandInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const command = commandInput.value;
          commandInput.value = "";
          runCommand(command);
        }
      });
    });