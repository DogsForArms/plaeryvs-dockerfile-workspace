FROM wmark/steam-base

RUN /opt/steam/steamcmd.sh \
	+login anonymous \
	+force_install_dir /var/lib/steam/playervs-dedicated \                                                                                                                                                                                                                                                                                                                                                                                         / \
	+app_update 1023620 validate \
	+quit

EXPOSE 27015/udp 7777/udp

ENTRYPOINT /var/lib/steam/playervs-dedicated/PlayerVsServer.sh -log -server LOG=ServerLogs.txt
