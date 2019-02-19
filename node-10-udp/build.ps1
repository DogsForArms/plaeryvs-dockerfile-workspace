$ImageName = (Get-Location).tostring().split("\")[-1]
docker build -t $ImageName .