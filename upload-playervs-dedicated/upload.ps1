.\add_steam_client.ps1

$username = Read-Host 'What is your steam username?'
$password = Read-Host 'What is your steam password?' -AsSecureString

$dir = (Get-Location).tostring() + "\app_build_player_vs_dedicated.vdf"

steamcmd +login $username $password +run_app_build $dir +quit