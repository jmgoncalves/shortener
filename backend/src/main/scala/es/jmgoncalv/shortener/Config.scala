package es.jmgoncalv.shortener

import com.typesafe.config.ConfigFactory

object Config {

  private val c = ConfigFactory.load()

  val port: Int = c.getInt("port")

  object redis {
    val host: String = c.getString("redis.host")
    val port: Int = c.getInt("redis.port")
  }
}
