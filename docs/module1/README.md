---
title: Set up your Docker environment
---

# Module 1: Set up

### Concepts

Docker is a platform for deveopers and sysadmins to develop, deploy and run applications with containers.
![](/acw-containerization/docker-containers.png)

### Images and containers

A container is lauched by running an image. An image is an executable package that includes everything needed to run an application--the code, a runtime, libraries, environment variables, and configuration files.

A container is a runtime instance of an image

### Containers and virtual machines

A container runs natively on Linux and shares the kernel of the host machine with other containers

A virtual machine runs an OS with virtual access to host resources through a hypervisor.
![](/acw-containerization/Container@2x.png) | ![](/acw-containerization/VM@2x.png)
|---|---|

### Prepare environment

### Connect to Ubuntu VM

```bash
$ ssh workshop@workshop-vm-[x].eastasia.cloudapp.azure.com -i ./ssh-key/id_rsa
```

### Get Docker engine - Ubuntu

1. Update the apt package index

```bash
$ sudo apt-get update
```

2. Install packages to allow apt to use a repository over HTTPS

```bash
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

3. Add Docker’s official GPG key

```bash
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

4. Setup the stable repository

```bash
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

5. Install the latest version of Docker Engine

```bash
$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Test Docker

1. Run docker --version

```bash
$ docker --version

Docker version 19.03.1, build 74b1e89
```

2. Run docker info

```bash
$ sudo docker info

Client:
 Debug Mode: false

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 19.03.1
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: false
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 ...
```

### Test Docker installation

1. Test installation works by running the following

```bash
$ sudo docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete
Digest: sha256:451ce787d12369c5df2a32c85e5a03d52cbcef6eb3586dd03075f3034f10adcd
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

2. List docker image that was downloaded

```bash
$ sudo docker image ls

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              fce289e99eb9        8 months ago        1.84kB
```

3. List all containers

```bash
$ sudo docker ps -a

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
8ee2c33c10ab        hello-world         "/hello"            2 minutes ago       Exited (0) 2 minutes ago                       keen_wilson
```
