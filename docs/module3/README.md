---
title: Create and run a Docker application
---

# Module 3: Create and run a Docker application

### Static site

Firstly, we will start step by step to deploy one static web site with nginx.

```bash
 $ mkdir simple-site

 $ cat > simple-site/index.html <<'EOF'
  <html>
  <head>
    <title>Docker workshop</title>
  </head>
  <body>
    <h1>Hello Docker workshop - my static site.</h1>
  </body>
EOF
```

Next step, we download nginX image and run container directly by `docker run`, the `--rm` flag automatically removes the container when it exits.

```bash
$ sudo docker run --name static-site -v /home/workshop/simple-site:/usr/share/nginx/html:ro --rm nginx
```

The `-v` flag is used to mount volume from host to container. Awesome, our website is up and running, but how can we see it?

```bash
$ sudo docker exec -it static-site bash
....
$ curl http://localhost
```

Currently, Docker is not exposing any port to host. We re-run `docker run` with `-p` to publish port.

```bash
$ sudo docker run --name static-site -v /home/workshop/simple-site:/usr/share/nginx/html:ro -p 32769:80 -d nginx
```

In the above command, **`-p`** flag is used to publish port from container to host, syntax **`[host port]`:`[container port]`**

In the browser `http://workshop-vm-[x].eastasia.cloudapp.azure.com:32769/`

### Our first image

It is time to build and own Docker images. In this section, we will create one Docker image for **Contact service**, based on `.Net Core 3.0 previce 8`. Besides, it also guides you how to deploy Postgres by container and connect them together.

Fristly, please clone the repository locally.

```bash
$ git clone https://github.com/tungphuong/crm.git
$ cd crm/
```

### Dockerfile

In "Contact" service directory has a Dockerfile. It starts by `FROM` keyword

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:3.0.100-preview8-bionic AS builder
```

Configuring the working directory in container

```dockerfile
WORKDIR /src
```

The next steps is to write commands of:

- Coping file, folder installing the dependencies...

```dockerfile
COPY ["src/BuildingBlocks/CRM.Shared/*.csproj", "src/BuildingBlocks/CRM.Shared/"]
COPY ["src/BuildingBlocks/CRM.Migration/*.csproj", "src/BuildingBlocks/CRM.Migration/"]
...
```

- Restoring packages

```dockerfile
RUN dotnet restore src/Contact/CRM.Contact.Api/ /property:Configuration=Release ${feed} -nowarn:msb3202,nu1503
```

- Building project

```dockerfile
RUN dotnet publish src/Contact/CRM.Contact.Api/ -c Release -o /app --no-restore
```

The next thing is to set environment variables

```dockerfile
ENV ASPNETCORE_URLS http://*:80
ENV ASPNETCORE_ENVIRONMENT docker
```

Last one is to specify the port number and the command for running the service

```dockerfile
EXPOSE 80
ENTRYPOINT [ "dotnet",  "CRM.Contact.Api.dll"]
```

Our Dockerfile is ready and looks like

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:3.0.100-preview8-bionic AS builder

ARG feed='--source "https://api.nuget.org/v3/index.json"'

WORKDIR /src
COPY ["src/BuildingBlocks/CRM.Shared/*.csproj", "src/BuildingBlocks/CRM.Shared/"]
COPY ["src/BuildingBlocks/CRM.Migration/*.csproj", "src/BuildingBlocks/CRM.Migration/"]
COPY ["src/Contact/CRM.Contact.Contract/*.csproj", "src/Contact/CRM.Contact.Contract/"]
COPY ["src/Contact/CRM.Contact.Api/*.csproj", "src/Contact/CRM.Contact.Api/"]

RUN dotnet restore src/Contact/CRM.Contact.Api/ /property:Configuration=Release ${feed} -nowarn:msb3202,nu1503
RUN dotnet restore src/BuildingBlocks/CRM.Migration/ /property:Configuration=Release ${feed} -nowarn:msb3202,nu1503

COPY ["src/BuildingBlocks/CRM.Shared/.", "src/BuildingBlocks/CRM.Shared/"]
COPY ["src/BuildingBlocks/CRM.Migration/.", "src/BuildingBlocks/CRM.Migration/"]
COPY ["src/Contact/CRM.Contact.Contract/.", "src/Contact/CRM.Contact.Contract/"]
COPY ["src/Contact/CRM.Contact.Api/.", "src/Contact/CRM.Contact.Api/"]
RUN dotnet publish src/Contact/CRM.Contact.Api/ -c Release -o /app --no-restore

FROM builder AS migration
WORKDIR /src/src/BuildingBlocks/CRM.Migration/

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0.0-preview8-bionic
WORKDIR /app

ENV ASPNETCORE_URLS http://*:80
ENV ASPNETCORE_ENVIRONMENT docker

COPY --from=builder /app .

EXPOSE 80
ENTRYPOINT [ "dotnet",  "CRM.Contact.Api.dll"]
```

### Build image from Dockerfile

```bash
$ sudo docker build -t crmnow/contact-api -f src/Contact/CRM.Contact.Api/Dockerfile .

Sending build context to Docker daemon  2.223MB
Step 1/23 : FROM mcr.microsoft.com/dotnet/core/sdk:3.0.100-preview8-bionic AS builder
 ---> 152368392bc4
Step 2/23 : ARG feed='--source "https://api.nuget.org/v3/index.json"'
 ---> Using cache
 ---> 0751506e9318
Step 3/23 : WORKDIR /src
 ---> Using cache
 ---> 9414cf4a0d7f
Step 4/23 : COPY ["src/BuildingBlocks/CRM.Shared/*.csproj", "src/BuildingBlocks/CRM.Shared/"]
 ---> e8c842891507
Step 5/23 : COPY ["src/BuildingBlocks/CRM.Migration/*.csproj", "src/BuildingBlocks/CRM.Migration/"]
 ---> abf5ef0a4fc6
Step 6/23 : COPY ["src/Contact/CRM.Contact.Contract/*.csproj", "src/Contact/CRM.Contact.Contract/"]
 ---> 2266cf6ea797
Step 7/23 : COPY ["src/Contact/CRM.Contact.Api/*.csproj", "src/Contact/CRM.Contact.Api/"]
 ---> 17077cbc16de
Step 8/23 : RUN dotnet restore src/Contact/CRM.Contact.Api/ /property:Configuration=Release ${feed} -nowarn:msb3202,nu1503
 ---> Running in 9c30eb05086a
 ....
 Step 23/23 : ENTRYPOINT [ "dotnet",  "CRM.Contact.Api.dll"]
 ---> Running in e0b1f832d22d
Removing intermediate container e0b1f832d22d
 ---> 1ae9e139107b
Successfully built 1ae9e139107b
Successfully tagged crmnow/contact-api:latest
```

Create "Contact" container from the above image.

```bash
$ sudo docker run -p 5200:80 crmnow/contact-api:latest
[08:49:01 INF {"SourceContext": "Microsoft.Hosting.Lifetime", "Environment": "docker", "ApplicationName": "Contact-Service"}] Now listening on: http://[::]:80
[08:49:01 INF {"SourceContext": "Microsoft.Hosting.Lifetime", "Environment": "docker", "ApplicationName": "Contact-Service"}] Application started. Press Ctrl+C to shut down.
[08:49:01 INF {"SourceContext": "Microsoft.Hosting.Lifetime", "Environment": "docker", "ApplicationName": "Contact-Service"}] Hosting environment: docker
[08:49:01 INF {"SourceContext": "Microsoft.Hosting.Lifetime", "Environment": "docker", "ApplicationName": "Contact-Service"}] Content root path: /app
```

In the browser http://workshop-vm-[x].eastasia.cloudapp.azure.com:5200/swagger/index.html
![](/acw-containerization/contact-swagger.png)

Congratulations! You have successfully created your first docker image.


### Docker push

The first thing that we need to do defore we deploy our app to Azure or any cloud is to publish docker image on a registry. There are many Docker registry such as Docker Hub, ACR,... For now, let's assume that you had one contrainer registry on ACR. To publish, follow below steps

```bash
docker login [your ACR].azurecr.io
Username: 
Password: 
WARNING! Your password will be stored unencrypted in /home/workshop/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

Tag the image
```
docker tag crmnow/contact-api  acrworkshophub.azurecr.io/crmnow/contact-api:v1
```

Push it
```
docker push acrworkshophub.azurecr.io/crmnow/contact-api:v1
```

Logout
```
docker logout acrworkshophub.azurecr.io
```