$ImageName = (Get-Location).tostring().split("\")[-1]
docker run -ti --rm -p 7777:7777/udp -p 27015:27015/udp --network host --name $ImageName $ImageName

#--net=host