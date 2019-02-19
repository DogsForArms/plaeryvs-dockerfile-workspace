$ImageName = (Get-Location).tostring().split("\")[-1]

..\upload-playervs-dedicated\add_steam_client.ps1

Remove-Item .\LinuxServer -Recurse -ErrorAction Ignore
Copy-Item -recurse -Path A:\UE4\projects\PlayerVs\Saved\StagedBuilds\LinuxServer -Destination .

docker build -t $ImageName .

Remove-Item .\LinuxServer -Recurse -ErrorAction Ignore