(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{267:function(a,t,n){"use strict";n.r(t);var e=n(38),s=Object(e.a)({},function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("h1",{attrs:{id:"module-2-play-with-ubuntu"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#module-2-play-with-ubuntu","aria-hidden":"true"}},[a._v("#")]),a._v(" Module 2: Play with Ubuntu")]),a._v(" "),n("p",[a._v("In this section, we are going to run a Ubuntu container and play with the "),n("code",[a._v("docker run")]),a._v(" command.")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("docker pull ubuntu:18.04\n")])])]),n("p",[a._v("The "),n("code",[a._v("pull")]),a._v(" command fetches the ubuntu image from Docker Hub and store into the system.")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker images\n\nREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nubuntu              "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("18.04")]),a._v("               a2a15febcdf3        "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" weeks ago         "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("64")]),a._v(".2MB\nhello-world         latest              fce289e99eb9        "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("8")]),a._v(" months ago        "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(".84kB\n")])])]),n("h3",{attrs:{id:"docker-run"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker-run","aria-hidden":"true"}},[a._v("#")]),a._v(" Docker Run")]),a._v(" "),n("p",[a._v("Let's run an Ubuntu container based on this image, using "),n("code",[a._v("docker run")])]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker run ubuntu:18.04\n")])])]),n("p",[a._v("Nothing happened! But it is not a "),n("code",[a._v("BUG")]),a._v(". When running "),n("code",[a._v("run")]),a._v(" command, Docker client will create the contwainer from image then runs a command in that container. In above case, we did not provide a command, so container ran an empty command and existed.")]),a._v(" "),n("p",[a._v("Now, try again with the "),n("code",[a._v("command")])]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker run ubuntu:18.04 "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[a._v("'hello, I am ubuntu'")]),a._v("\nhello, I am Ubuntu\n")])])]),n("p",[a._v("Finnaly, it ran "),n("code",[a._v("echo")]),a._v(" command in the Ubuntu container and exited.")]),a._v(" "),n("h3",{attrs:{id:"docker-ps"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker-ps","aria-hidden":"true"}},[a._v("#")]),a._v(" Docker PS")]),a._v(" "),n("p",[a._v("Next, to show all containers that are running, using "),n("code",[a._v("docker ps")])]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v("\n\nCONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES\n")])])]),n("p",[a._v("We got the empty list since no containers are running. Let's try again with new parameter "),n("code",[a._v("-a")])]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" -a\n\nCONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS               NAMES\n5edf418a12f2        ubuntu:18.04        "),n("span",{pre:!0,attrs:{class:"token string"}},[a._v('"echo \'hello, I am U…"')]),a._v("   "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("7")]),a._v(" minutes ago       Exited "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("6")]),a._v(" minutes ago                       clever_hertz\n")])])]),n("p",[a._v("Do notice that the "),n("mark",[a._v("STATUS")]),a._v(" column shows that container exited a few minute ago.")]),a._v(" "),n("h3",{attrs:{id:"how-to-access-container"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#how-to-access-container","aria-hidden":"true"}},[a._v("#")]),a._v(" How to access container")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker run -it ubuntu:18.04 "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("bash")]),a._v("\n\nroot@82ba45277562:/"),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# ls")]),a._v("\nbin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var\nroot@82ba45277562:/"),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#")]),a._v("\n")])])]),n("p",[a._v("Running this command with the "),n("code",[a._v("-it")]),a._v(" flags attaches us to an interactive tty in the container. Now we try to run commands to install "),n("code",[a._v("nano")]),a._v(" in the container")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("root@82ba45277562:/"),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# nano text1.txt")]),a._v("\nbash: nano: "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("command")]),a._v(" not found\nroot@82ba45277562:/"),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# apt-get update")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v(".\n\nroot@82ba45277562:/"),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# apt-get install nano")]),a._v("\nReading package lists"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v(". Done\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v(".\n\nroot@82ba45277562:/"),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# nano -V")]),a._v("\n GNU nano, version "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("2.9")]),a._v(".3\n "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("C"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("1999")]),a._v("-2011, "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("2013")]),a._v("-2018 Free Software Foundation, Inc.\n "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("C"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("2014")]),a._v("-2018 the contributors to "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("nano")]),a._v("\n Email: nano@nano-editor.org\tWeb: https://nano-editor.org/\n Compiled options: --disable-libmagic --disable-wrapping-as-root --enable-utf8\n")])])]),n("h3",{attrs:{id:"clean-up-containers"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#clean-up-containers","aria-hidden":"true"}},[a._v("#")]),a._v(" Clean up containers")]),a._v(" "),n("p",[a._v("Find the docker container which wants to remove")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" -a\n")])])]),n("p",[a._v("In order to clean up / remove container, we use the "),n("code",[a._v("docker rm")]),a._v(" command")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" 11048001c4af 82ba45277562\n11048001c4af\n82ba45277562\n")])])]),n("p",[a._v("To delete all exited containers, using the following")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" -a -q -f "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("status")]),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("exited"),n("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("\nea21c89eda2b\nc1160c25919b\nec3a52538290\ncef1e24c1851\n")])])]),n("p",[a._v("The "),n("code",[a._v("-q")]),a._v(" parameter, only return the IDs and "),n("code",[a._v("-f")]),a._v(" is filter.")]),a._v(" "),n("p",[a._v("In the latest of Docker version, the "),n("code",[a._v("docker container prune")]),a._v(" command can be used to achieve the same effect.")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker container prune\n\nAre you sure you want to continue? "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("y/N"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" y\nDeleted Containers:\nf1cf74322599388df6bf6ea4752ed91258026b5d8eba812d3e5325dfa88ce0b6\nbccd0fa7ebb04f7a69c3120dc6daf7bb18230b02d9e634e0b32bc6c0167c54a1\nd53835eca30a7304c0862660c4322096f4a4bfc12d82b5eca8fa9863b7446138\n\nTotal reclaimed space: 0B\n")])])]),n("h3",{attrs:{id:"clean-up-images"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#clean-up-images","aria-hidden":"true"}},[a._v("#")]),a._v(" Clean up images")]),a._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker rmi ubuntu:latest\nUntagged: ubuntu:latest\n\nOr\n\n$ "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" docker image prune\nWARNING"),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),a._v(" This will remove all dangling images.\nAre you sure you want to continue? "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("y/N"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])])])},[],!1,null,null,null);t.default=s.exports}}]);