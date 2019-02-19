$ImageName = (Get-Location).tostring().split("\")[-1]
docker run -ti --rm -p 33333:33333/udp --name $ImageName $ImageName