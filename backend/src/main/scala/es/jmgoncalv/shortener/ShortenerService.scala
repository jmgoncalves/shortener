package es.jmgoncalv.shortener

import akka.parboiled2.util.Base64
import redis.clients.jedis.Jedis

import scala.annotation.tailrec
import scala.collection.JavaConverters
import scala.util.Random

class ShortenerService(redis: Jedis) {

  val random = new Random(System.currentTimeMillis())
  val keyEncoder = new Base64("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-_")

  def list(): Seq[String] =
    JavaConverters.asScalaSet(redis.keys("*")).toSeq

  def get(key: String): Option[String] =
    Option(redis.get(key))

  def createMapping(url: String): String = {
    val key = generateKey()
    redis.set(key, url)
    key
  }

  @tailrec
  private def generateKey(): String = {
    val candidateKey = keyEncoder.encodeToString(
      BigInt(random.nextLong()).toByteArray,false)
      .dropRight(1) // encoder always finishes with the last alphabet char but we don't really need it

    val keyIsFree: Boolean = synchronized {
      val isFree = get(candidateKey).isEmpty
      if (isFree)
        redis.set(candidateKey, "") // reserve candidate key
      isFree
    }

    if (keyIsFree)
      candidateKey
    else
      generateKey()
  }
}
