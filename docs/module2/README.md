---
title: Hello world
---

# Module 2: Play with Ubuntu

In this section, we are going to run a Ubuntu container and play with the `docker run` command.

```bash
$ docker pull ubuntu:18.04
```

The `pull` command fetches the ubuntu image from Docker Hub and store into the system.

```bash
$ sudo docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              18.04               a2a15febcdf3        2 weeks ago         64.2MB
hello-world         latest              fce289e99eb9        8 months ago        1.84kB
```

### Docker Run

Let's run an Ubuntu container based on this image, using `docker run`

```bash
$ sudo docker run ubuntu:18.04
```

Nothing happened! But it is not a `BUG`. When running `run` command, Docker client will create the contwainer from image then runs a command in that container. In above case, we did not provide a command, so container ran an empty command and existed.

Now, try again with the `command`

```bash
$ sudo docker run ubuntu:18.04 echo 'hello, I am ubuntu'
hello, I am Ubuntu
```

Finnaly, it ran `echo` command in the Ubuntu container and exited.

### Docker PS

Next, to show all containers that are running, using `docker ps`

```bash
$ sudo docker ps

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

We got the empty list since no containers are running. Let's try again with new parameter `-a`

```bash
$ sudo docker ps -a

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS               NAMES
5edf418a12f2        ubuntu:18.04        "echo 'hello, I am U…"   7 minutes ago       Exited (0) 6 minutes ago                       clever_hertz
```

Do notice that the <mark>STATUS</mark> column shows that container exited a few minute ago.

### How to access container

```bash
$ sudo docker run -it ubuntu:18.04 bash

root@82ba45277562:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@82ba45277562:/#
```

Running this command with the `-it` flags attaches us to an interactive tty in the container. Now we try to run commands to install `nano` in the container

```bash
root@82ba45277562:/# nano text1.txt
bash: nano: command not found
root@82ba45277562:/# apt-get update
...

root@82ba45277562:/# apt-get install nano
Reading package lists... Done
...

root@82ba45277562:/# nano -V
 GNU nano, version 2.9.3
 (C) 1999-2011, 2013-2018 Free Software Foundation, Inc.
 (C) 2014-2018 the contributors to nano
 Email: nano@nano-editor.org	Web: https://nano-editor.org/
 Compiled options: --disable-libmagic --disable-wrapping-as-root --enable-utf8
```

### Clean up containers

Find the docker container which wants to remove

```bash
$ sudo docker ps -a
```

In order to clean up / remove container, we use the `docker rm` command

```bash
$ sudo docker rm 11048001c4af 82ba45277562
11048001c4af
82ba45277562
```

To delete all exited containers, using the following

```bash
$ sudo docker rm $(sudo docker ps -a -q -f status=exited)
ea21c89eda2b
c1160c25919b
ec3a52538290
cef1e24c1851
```

The `-q` parameter, only return the IDs and `-f` is filter.

In the latest of Docker version, the `docker container prune` command can be used to achieve the same effect.

```bash
$ sudo docker container prune

Are you sure you want to continue? [y/N] y
Deleted Containers:
f1cf74322599388df6bf6ea4752ed91258026b5d8eba812d3e5325dfa88ce0b6
bccd0fa7ebb04f7a69c3120dc6daf7bb18230b02d9e634e0b32bc6c0167c54a1
d53835eca30a7304c0862660c4322096f4a4bfc12d82b5eca8fa9863b7446138

Total reclaimed space: 0B
```

### Clean up images

```bash
$ sudo docker rmi ubuntu:latest
Untagged: ubuntu:latest

Or

$ sudo docker image prune
WARNING! This will remove all dangling images.
Are you sure you want to continue? [y/N]
```
