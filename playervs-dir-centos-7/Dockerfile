# based on the centos:7 tagged wilkesystems/steambase

FROM centos:7

MAINTAINER ethanshub <esherrthan@gmail.com>

RUN yum update -y; \
	yum upgrade -y;

RUN yum install -y glibc.i686 libstdc++.i686 net-tools;

# upgrade libstdc++.so for GLIBCXX_3.4.20
COPY libstdc++.so.6.0.21 /lib64/libstdc++.so.6.0.21
COPY libstdc++.so.6.0.21 /lib64/libstdc++.so.6

EXPOSE 27015/udp
EXPOSE 7777/udp

RUN adduser steam

COPY --chown=steam LinuxServer /var/lib/steam/playervs-dedicated

USER steam

ENTRYPOINT /var/lib/steam/playervs-dedicated/PlayerVsServer.sh -log -server