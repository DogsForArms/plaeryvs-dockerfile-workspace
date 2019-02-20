FROM ubuntu:18.04

RUN adduser --disabled-password --gecos 'Steam Client' steam

RUN apt-get update -y; \
	apt-get upgrade -y; \
	apt-get install -y lib32gcc1 gcc libc6-dev ca-certificates;
	
RUN apt install -y net-tools netcat;

COPY --chown=steam LinuxServer /var/lib/steam/playervs-dedicated

USER steam

EXPOSE 7777/udp 27015/udp 7778/udp

ENTRYPOINT /var/lib/steam/playervs-dedicated/PlayerVsServer.sh -log