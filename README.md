# plaeryvs-dockerfile-workspace
Hello thanks in advance for reviewing my issue regarding a ue4 dedicated steam server inside a docker container (linux host).  I really appreciate any guidance, or suggested tests/ approaches as I am almost out of ideas!

### Summary of the issue
I have a UE4 dedicated server for my game PlayerVs.  I have 2 dedicated servers, windows and linux.  When running the windows or linux servers on windows / ubuntu 18.04 vm's on azure I see my servers in steam.  However, when I put the linux server inside a docker container, I do not see it in steam.

### This project setup:
Note:  All docker folders have build.ps1 and run.ps1 and upload.ps1 scripts, so you can see exactly how I run these images.  Also saves me a little time when making new folders.  Each build/run/upload will tag the image/container name as the folder directory...

- playervs-dir-ubuntuvm-1804: installs dedicated server with COPY (ubuntu 18.04 base, same apt-installs I do on VM +netstat, COPY --chown=steam LinuxServer) This is the image I used when doing the netstat traces from inside the container (see Q4), although I think the netstat print would be the same from any other "playervs" image.
- playervs-wmark-steamcmd: installs dedicated server with steamcmd (wmark/steambase, steamcmd +app_update 1023620)
- playervs-dir-centos-7: installs dedicated server with COPY (centos7 base, COPY --chown=steam LinuxServer)
- node-10-udp: node test env where I create a udp server (nodeapp) within a container to ping from another node udp app (nodeappcaller) to prove that udp traffic is OK in general.
- upload-playervs-dedicated: helper scripts to inject steamclient dependencies in Staged dedicated server files, win10 and linux.  please ignore.

### How I test steam visibility
1. open up the Steam 
2. go to Servers 
3. I use the Internet tab, filtering on my game name
4. I use the LAN tab, and I should see my game if it is running locally.  *NOTE( on my win machine, I make sure the docker vm forwards the appropriate ports (7777, 27015)/udp.  I have set up a simple node-udp server (33333/udp) to confirm that my machine can send udp requests to a udp node container. But incase this is not accurate I also ALWAYS publish my game server into an azure container to see if the game is visible in the internet tab)*

#### Q1.  Am I binding ports correctly in docker?  
Yes.  I do `EXPOSE 27015/udp 7777/udp` in dockerfile and in do `docker run -p 7777:7777/udp 27015:27015/udp ...`.  When testing locally I make sure my docker-vm's ports are open through VirtualBox.  When testing containers on azure, I make sure these ports are open and server is public.
 
Additionally I have a side test environment to make sure udp traffic can be received by a docker container.  How it works, a node-js server inside a container listens to 0.0.0.0:33333/udp, it prints messages recevied. From my desktop I have another node app that sends a message to 127.0.0.1:33333/udp with a message.  This works on my machine.  This also works when I publish the image to azure, and from my computer send the udp message to <IP OF CONTAINER>:33333/udp.
```
> docker exec -u 0 -it node-10-udp
> netstat -lnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
udp        0      0 0.0.0.0:33333           0.0.0.0:*                           -
```

#### Q2.  Does my linux server work?
Yes.  When I make a Ubuntu 18.04 server on azure, and open the appropriate ports, I see the game in the steam server listings.

#### Q3.  Have I picked a bad / wrong base image for my container that prevents udp traffic ...or something?
...Not sure.  I have tried many different bases for the docker game server.  ubuntu, centos:7, centos:6, even installed a ubuntu-desktop on ubuntu.

#### Q4.  Is the ue4 server bound to the correct address when hosted inside the container. For example, if UE4 tries to host the server on IP address 127.0.0.1, then it would only be listening to itself, and never hear anything through the docker engine.
A: Yes I think it's correct.  Here is a netstat from inside a docker game server container:
```
> docker exec -u 0 -it playervs-dirbash
> netstat -lnp
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
udp        0      0 0.0.0.0:27015           0.0.0.0:*                           -
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node   PID/Program name     Path
```

Compared this to the Ubuntu 18.04 LTE server on azure (which can host my game server & have it be visible)
//sorry for the noise, search for the 0.0.0.0:27015 line bellow
```
> ssh <myuser>@<ip address of vm ubuntu server>
> netstat -lnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 172.17.0.2:8080         0.0.0.0:*               LISTEN      18/node
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node   PID/Program name     Path


===================================================UBUNTU VM
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -
tcp6       0      0 :::22                   :::*                    LISTEN      -
udp        0      0 127.0.0.53:53           0.0.0.0:*                           -
udp        0      0 10.0.1.4:68             0.0.0.0:*                           -
udp        0      0 0.0.0.0:27015           0.0.0.0:*                           2021/PlayerVsServer
udp6       0      0 fe80::20d:3aff:fe3f:546 :::*                                -
raw6       0      0 :::58                   :::*                    7           -
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node   PID/Program name     Path
unix  2      [ ACC ]     STREAM     LISTENING     16567    -                    /var/lib/lxd/unix.socket
unix  2      [ ACC ]     SEQPACKET  LISTENING     11208    -                    /run/udev/control
unix  2      [ ACC ]     STREAM     LISTENING     21795    -                    /run/user/1000/systemd/private
unix  2      [ ACC ]     STREAM     LISTENING     21799    -                    /run/user/1000/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     STREAM     LISTENING     21800    -                    /run/user/1000/gnupg/S.gpg-agent
unix  2      [ ACC ]     STREAM     LISTENING     21801    -                    /run/user/1000/gnupg/S.dirmngr
unix  2      [ ACC ]     STREAM     LISTENING     21802    -                    /run/user/1000/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     STREAM     LISTENING     21803    -                    /run/user/1000/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     STREAM     LISTENING     18164    -                    @irqbalance1020.sock
unix  2      [ ACC ]     STREAM     LISTENING     16560    -                    /run/snapd.socket
unix  2      [ ACC ]     STREAM     LISTENING     16562    -                    /run/snapd-snap.socket
unix  2      [ ACC ]     STREAM     LISTENING     16564    -                    /run/uuidd/request
unix  2      [ ACC ]     STREAM     LISTENING     11438    -                    /run/systemd/private
unix  2      [ ACC ]     STREAM     LISTENING     11205    -                    /run/lvm/lvmetad.socket
unix  2      [ ACC ]     STREAM     LISTENING     11210    -                    /run/systemd/journal/stdout
unix  2      [ ACC ]     STREAM     LISTENING     11791    -                    /run/systemd/fsck.progress
unix  2      [ ACC ]     STREAM     LISTENING     11794    -                    /run/lvm/lvmpolld.socket
unix  2      [ ACC ]     STREAM     LISTENING     16566    -                    @ISCSIADM_ABSTRACT_NAMESPACE
unix  2      [ ACC ]     STREAM     LISTENING     16558    -                    /run/acpid.socket
unix  2      [ ACC ]     STREAM     LISTENING     16542    -                    /var/run/dbus/system_bus_socket
```

