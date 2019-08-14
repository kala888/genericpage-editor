/* eslint-disable prefer-promise-reject-errors */
import _ from 'lodash'
import md5 from 'blueimp-md5'

const CACHE_PREFIX = 'cachestore-'
const CACHE_EXPIRATION_PREFIX = 'cacheexpiration-'
const EXPIRY_UNITS = 60 * 1000

const shortKey = (key) => (key.length > 100 ? md5(key) : key)
// const fail = () => Promise.reject(null)

const getKeys = _.memoize((key = '') => {
  const short = shortKey(key)
  const theKey = CACHE_PREFIX + short
  const exprKey = CACHE_EXPIRATION_PREFIX + short
  return { theKey, exprKey }
})

const currentTime = () => Math.floor(new Date().getTime() / EXPIRY_UNITS)

const AsyncStorage = {
  getItem: async () => null,
  removeItem: () => new Promise(),
  multiRemove: async () => {},
  setItem: async () => {},
  getAllKeys: async () => [],
  flushExpired: async () => {},
}

const StorageTools = {
  PageCachePrefix: 'page-cache-',

  async get(key, defaultValue = null) {
    const { exprKey, theKey } = getKeys(key)
    const expiry = AsyncStorage.getItem(exprKey)
    if (expiry && currentTime() >= parseInt(expiry, 10)) {
      AsyncStorage.multiRemove([exprKey, theKey])
      return null
    }
    const value = await AsyncStorage.getItem(theKey)
    return value !== null ? JSON.parse(value) : defaultValue
  },

  async set(key, value = '', time) {
    const { exprKey, theKey } = getKeys(key)
    if (time) {
      const strTime = (currentTime() + time).toString()
      await AsyncStorage.setItem(exprKey, strTime)
      const result = await AsyncStorage.setItem(theKey, JSON.stringify(value))
      return result
    }
    AsyncStorage.removeItem(exprKey)
    const result = await AsyncStorage.setItem(theKey, JSON.stringify(value))
    return result
  },

  async remove(key) {
    const { exprKey, theKey } = getKeys(key)
    await AsyncStorage.multiRemove([exprKey, theKey])
  },

  async isExpired(key) {
    const { exprKey } = getKeys(key)
    const expiry = await AsyncStorage.getItem(exprKey)
    const expired = expiry && currentTime() >= parseInt(expiry, 10)
    return expired
  },

  async flush() {
    const keys = await AsyncStorage.getAllKeys()
    const allKeys = keys.filter((key) => key.indexOf(CACHE_PREFIX) === 0 || key.indexOf(CACHE_EXPIRATION_PREFIX) === 0)
    const result = await AsyncStorage.multiRemove(allKeys)
    return result
  },

  async flushWithPrefix(prefix) {
    const keys = await AsyncStorage.getAllKeys()

    const allKeys = keys.filter(
      (key) => key.indexOf(`${CACHE_PREFIX}${prefix}`) === 0 || key.indexOf(`${CACHE_EXPIRATION_PREFIX}${prefix}`) === 0
    )
    await AsyncStorage.multiRemove(allKeys)
  },

  async flushExpired() {
    const keys = await AsyncStorage.getAllKeys()

    keys.forEach(async (key) => {
      if (key.indexOf(CACHE_EXPIRATION_PREFIX) === 0) {
        const exprKey = key
        const expiry = await AsyncStorage.getItem(exprKey)
        if (expiry && currentTime() >= parseInt(expiry, 10)) {
          const theKey = CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '')
          await AsyncStorage.multiRemove([exprKey, theKey])
        }
        return Promise.resolve()
      }
      return Promise.resolve()
    })
  },
}

// Always flush expired items on start time
StorageTools.flushExpired()

export default StorageTools

//
// import CacheStore from 'react-native-cache-store';
//
// CacheStore.set('key', 'value', 10); // Expires in 10 minutes
//
// CacheStore.get('key').then((value) => {
//   // Do something with value
// });
//
// CacheStore.isExpired('key')
//   .then(() => {/* true */ })
//   .catch(() => {/* false */})
