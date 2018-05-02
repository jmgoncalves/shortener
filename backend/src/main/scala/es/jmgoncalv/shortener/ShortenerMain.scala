package es.jmgoncalv.shortener

import java.net.URL

import akka.actor.ActorSystem
import akka.event.Logging
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpResponse
import akka.http.scaladsl.model.headers.Location
import akka.http.scaladsl.server.Directives._
import akka.stream.{ActorMaterializer, Materializer}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import io.circe.generic.auto._
import redis.clients.jedis.Jedis

import scala.util.{Failure, Success, Try}

object ShortenerMain {

  implicit val system = ActorSystem()
  implicit val mat    = ActorMaterializer()

  val redis = new Jedis(Config.redis.host, Config.redis.port) // not async IO but what can we do ¯\_(ツ)_/¯
  val service = new ShortenerService(redis)
  val log = Logging(system, this.getClass)

  def main(args: Array[String]): Unit = {
    Http().bindAndHandle(
      redirectUrl ~ listUrls ~ createUrl ~ getUrl, // routes
      "0.0.0.0", Config.port)

    log.debug(s"Server running on 0.0.0.0:${Config.port}")
  }

  private def redirectUrl(implicit mat: Materializer) =
    (get & path("l" / Segment)) { key =>
      log.debug(s"GET\t/l/{}", key)
      complete(service.get(key) match {
        case Some(url) => HttpResponse(301,
          headers = Location(url) :: Nil)
        case None => HttpResponse(404)
      })
    }

  private def listUrls(implicit mat: Materializer) =
    (get & path("api")) {
      log.debug(s"GET\t/api")
      complete(service.list())
    }

  private def createUrl(implicit mat: Materializer) =
    (post & path("api") & entity(as[String])) { url =>
      log.debug(s"POST\t/api\t{}", url)
      complete(Try(new URL(url)) match {
        case Success(parsedUrl) => {
          val newKey = service.createMapping(parsedUrl.toString)
          HttpResponse(status = 201,
            headers = Location(s"/api/$newKey") :: Nil,
            entity = newKey)
        }
        case Failure(exception) => HttpResponse(status = 400,
          entity = s"Couldn't parse url: ${exception.getMessage}")
      })
    }

  private def getUrl(implicit mat: Materializer) =
    (get & path("api" / Segment)) { key =>
      log.debug(s"GET\t/api/{}", key)
      complete(service.get(key))
    }

}
