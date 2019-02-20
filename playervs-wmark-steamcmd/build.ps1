$ImageName = (Get-Location).tostring().split("\")[-1]
docker build --no-cache -t $ImageName .