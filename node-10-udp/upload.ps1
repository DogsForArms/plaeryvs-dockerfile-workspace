$ImageName = (Get-Location).tostring().split("\")[-1]
$RemoteImageName  = "ethanshub.azurecr.io/" + $ImageName

docker tag $ImageName $RemoteImageName
docker push $RemoteImageName