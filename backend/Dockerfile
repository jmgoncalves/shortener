FROM hseeberger/scala-sbt

COPY . .

# lazy solution... ideally should build an assembled jar using sbt and deploy in a nice minimal JRE base image
ENTRYPOINT [ "sbt", "run" ]
