lazy val akkaHttpVersion = "10.1.1"
lazy val akkaVersion     = "2.5.12"
lazy val circeVersion    = "0.10.0-M1"

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization    := "es.jmgoncalv",
      scalaVersion    := "2.12.5"
    )),
    name := "shortener-backend",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-http"            % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-stream"          % akkaVersion,
      "io.circe"          %% "circe-core"           % circeVersion,
      "io.circe"          %% "circe-jawn"           % circeVersion,
      "io.circe"          %% "circe-generic"        % circeVersion,
      "de.heikoseeberger" %% "akka-http-circe"      % "1.20.1",
      "redis.clients"     %  "jedis"                % "2.9.0",

      "com.typesafe.akka" %% "akka-http-testkit"    % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-testkit"         % akkaVersion     % Test,
      "com.typesafe.akka" %% "akka-stream-testkit"  % akkaVersion     % Test,
      "org.scalatest"     %% "scalatest"            % "3.0.1"         % Test,
      "ai.grakn"          %  "redis-mock"           % "0.1.3"         % Test
    )
  )
