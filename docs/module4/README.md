---
title: Multi containers environment
---

# Module 4: Multi containers environment

### Contact service

Contact service is writtern by `.Net Core 3.0 preview` and use `Postgres` to store data. Source code is ready at [https://github.com/tungphuong/crm.git](https://github.com/tungphuong/crm.git).

To dockerize this service, we need 3 containers:

- **Postgres**
- **Contact service**
- **Database migration**

Let's pull the image

```bash
$ sudo docker pull postgres:11-alpine
```

And run it

```bash
$ sudo docker run --rm -p 5432:5432 -d -e POSTGRES_USER=lab -e POSTGRES_PASSWORD=P@ssw0rd --name postgres.data postgres:11-alpine
```

Run "Contact" service

```bash
$ sudo docker run --rm -p 5000:80 -e ConnectionStrings__default="Server=postgres.data;Port=5432;Database=crm-contact;User Id=lab;Password=P@ssw0rd;" crmnow/contact-api:latest

System.Net.Internals.SocketExceptionFactory+ExtendedSocketException (00000005, 0xFFFDFFFF): Name or service not known
   at System.Net.Dns.InternalGetHostByName(String hostName)
   at System.Net.Dns.ResolveCallback(Object context)
--- End of stack trace from previous location where exception was thrown ---
   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw(Exception source)
   at System.Net.Dns.HostResolutionEndHelper(IAsyncResult asyncResult)
   at System.Net.Dns.EndGetHostAddresses(IAsyncResult asyncResult)
   at System.Net.Dns.<>c.<GetHostAddressesAsync>b__25_1(IAsyncResult asyncResult)
   at System.Threading.Tasks.TaskFactory`1.FromAsyncCoreLogic(IAsyncResult iar, Func`2 endFunction, Action`1 endAction, Task`1 promise, Boolean requiresSynchronization)
--- End of stack trace from previous location where exception was thrown ---
```

The service cannot connect to database. So, how to connect them together. The answer relates to "Docker Network".

### Docker network

Create our own netwrok

```bash
$ sudo docker network create workshop-network
1de671cb3e7b3c05679c4f4a59bb75c5856f491008d44f24b57638523c40f9f6
```

Next, we will run Postgres in the new network

```bash
$ sudo docker run --rm -p 5432:5432 -d -e POSTGRES_USER=lab -e POSTGRES_PASSWORD=P@ssw0rd --name postgres.data --net workshop-network  postgres:11-alpine
```

And try to connect our service to database server in the `workshop-network` network

```bash
$ sudo docker run --rm -p 5000:80 --net workshop-network -e ConnectionStrings__default="Server=postgres.data;Port=5432;Database=crm-contact;User Id=lab;Password=P@ssw0rd;" crmnow/contact-api:latest

Npgsql.PostgresException (0x80004005): 3D000: database "crm-contact" does not exist
   at Npgsql.NpgsqlConnector.<>c__DisplayClass161_0.<<ReadMessage>g__ReadMessageLong|0>d.MoveNext()
```

Greate, connected successfully but we still need to setup database via migration.

### Docker compose

Docker compose is a tool for defining and running multi-container Docker application

Install `compose-compose` CLI

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose
```

Test the installation

```bash
$ docker-compose --version
$ docker-compose version 1.24.1, build 4667896b
```

Next steps, expoler one simple Docker compose file with YAML format.

```yaml
version: '3.7'

services:
  postgres.data:
    image: postgres:11-alpine
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - crm

  contact-api:
    image: ${REGISTRY:-crmnow}/contact-api:${TAG:-latest}
    build:
      context: .
      dockerfile: src/Contact/CRM.Contact.Api/Dockerfile
      args:
        - feed=${NUGET_FEED:- --source "https://api.nuget.org/v3/index.json"}
    networks:
      - crm
    depends_on:
      - postgres.data

  contact-api-migration:
    image: ${REGISTRY:-crmnow}/contact-api:${TAG:-latest}
    build:
      context: .
      dockerfile: src/Contact/CRM.Contact.Api/Dockerfile
      target: migration
      args:
        - feed=${NUGET_FEED:- --source "https://api.nuget.org/v3/index.json"}
    environment:
      - ConnectionStrings__contact=Server=postgres.data;Port=5432;Database=crm-contact;User Id=lab;Password=P@ssw0rd;
    entrypoint:
      - dotnet
      - run
      - contact
    networks:
      - crm
    depends_on:
      - postgres.data

volumes:
  postgres-data:
  nexus-data:
  seq-data:

networks:
  crm:
    name: crm-network
```

Now the file is ready, let's see `docker-compose` in action
Firstly, clean up environment

```bash
$ sudo docker rm -f postgres.data contact-api

$ sudo docker network rm workshop-network
```

Secondly, run database migration

```bash
$ cd crm

$ docker-compose -f docker-compose.yml -f docker-compose.override.yml up postgres.data contact-api-migration

contact-api-migration_1  | [10:19:09 INF] Run migration - Contact Db
contact-api-migration_1  | Master ConnectionString => Host=postgres.data;Port=5432;Database=postgres;Username=lab;Password=********
contact-api-migration_1  | Created database crm-contact
contact-api-migration_1  | [10:19:11 INF] Beginning database upgrade
contact-api-migration_1  | [10:19:11 INF] Checking whether journal table exists..
contact-api-migration_1  | [10:19:11 INF] Journal table does not exist
contact-api-migration_1  | [10:19:11 INF] Executing Database Server script 'script0001.sql'
contact-api-migration_1  | [10:19:11 INF] Checking whether journal table exists..
contact-api-migration_1  | [10:19:11 INF] Creating the "schemaversions" table
contact-api-migration_1  | [10:19:11 INF] The "schemaversions" table has been created
contact-api-migration_1  | [10:19:11 INF] Upgrade successful
crm_contact-api-migration_1 exited with code 0

```

It is the time to up everything.

```bash
$ cd crm

$ docker-compose -f docker-compose.yml -f docker-compose.override.yml up postgres.data contact-api

Creating network "crm-network" with the default driver
Creating volume "crm_postgres-data" with default driver
Creating volume "crm_nexus-data" with default driver
Creating volume "crm_seq-data" with default driver
Creating crm_postgres.data_1 ... done
Creating crm_contact-api-migration_1 ... done
Creating crm_contact-api_1           ...
...

[
  {
    "contactId": "6c7b66fb-d8cb-493b-a2fe-96963f81e43f",
    "firstName": "Ut enim ad minim veniam, quis nos",
    "lastName": "Duis aute irure dolor in reprehenderit in vo",
    "middleName": "ipsum dolor sit amet, c",
    "description": "m"
  },
  {
    "contactId": "78d616a1-9e0c-4c07-a089-9d64ea551dfb",
    "firstName": "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
    "lastName": "laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
    "middleName": "consequat. Duis aute irure dolor in reprehender",
    "description": "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn"
  }
]
```

Woohoo, everything is up now! Try playing around.
