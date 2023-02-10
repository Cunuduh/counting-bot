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
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo installation complete, you must still enter your token into
echo the config.json file
:: replace "guild.channels.set(channel.id, channel);"" in ClientDataManager.js in the node_modules folder with the text "if (channel) guild.channels.set(channel.id, channel);"
:: this is a fix for a bug in discord.js
setlocal EnableDelayedExpansion
findstr /s /m /i /c:"guild.channels.set(channel.id, channel);" node_modules\discord.js\src\client\ClientDataManager.js >nul
:: if the string is found, replace it with the new string
if errorlevel 1 (
    echo "guild.channels.set(channel.id, channel);" not found in ClientDataManager.js, skipping replacement
) else (
    echo "guild.channels.set(channel.id, channel);" found in ClientDataManager.js, replacing...
    for /f "delims=" %%a in ('findstr /s /m /i /c:"guild.channels.set(channel.id, channel);" node_modules\discord.js\src\client\ClientDataManager.js') do (
        set "line=%%a"
        set "line=!line:guild.channels.set(channel.id, channel);=if (channel) guild.channels.set(channel.id, channel);!"
        echo !line! > node_modules\discord.js\src\client\ClientDataManager.js
    )
)

pause