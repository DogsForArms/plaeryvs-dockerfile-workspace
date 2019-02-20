FROM node:10

RUN apt-get update -y; \
	apt-get upgrade -y;

RUN apt install -y net-tools;
RUN apt install -y netcat;

COPY nodeapp /var/lib/nodeapp

WORKDIR /var/lib/nodeapp

EXPOSE 33333:33333/udp

ENTRYPOINT npm run start