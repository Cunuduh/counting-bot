@echo off
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo           COUNTING BOT INSTALLATION           
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo continuing will install files and required dependencies
echo (you must have nodejs installed - https://nodejs.org/en/)
echo installation wont work without it
pause
call npm i discord.js@11
:: replace line 80 (blank) of ClientDataManager.js in node_modules\discord.js\src\client\ClientDataManager.js with this line
:: if (channel)
:: this is to fix a bug with discord.js
powershell -Command "$file_content = gc -Path 'node_modules\discord.js\src\client\ClientDataManager.js'; $file_content[79] = $file_content[79] -replace $file_content[79], '        if (channel)'; $file_content | sc -Path 'node_modules\discord.js\src\client\ClientDataManager.js'"
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo installation complete, you must still enter your token into
echo the config.json file
pause