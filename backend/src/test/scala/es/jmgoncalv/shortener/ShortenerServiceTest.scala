package es.jmgoncalv.shortener

import ai.grakn.redismock.RedisServer
import org.scalatest.{BeforeAndAfter, FreeSpec, Matchers}
import redis.clients.jedis.Jedis

class ShortenerServiceTest extends FreeSpec with Matchers with BeforeAndAfter {

  val somePort: Int = 9663
  val server: RedisServer = RedisServer.newRedisServer(somePort)
  val redis = new Jedis("localhost", somePort)
  val service = new ShortenerService(redis)

  before {
    server.start()
  }

  after {
    server.stop()
  }

  "create, get and list" in {
    val url = "http://jmgoncalv.es/"
    val key = service.createMapping(url)
    service.get(key) shouldEqual Some(url)
    assert(service.list().contains(key))
  }
}
