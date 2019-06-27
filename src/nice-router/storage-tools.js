/* eslint-disable prefer-promise-reject-errors */
import _ from 'lodash'
import md5 from 'blueimp-md5'

const CACHE_PREFIX = 'cachestore-'
const CACHE_EXPIRATION_PREFIX = 'cacheexpiration-'
const EXPIRY_UNITS = 60 * 1000

const shortKey = key => (key.length > 100 ? md5(key) : key)
const fail = () => Promise.reject(null)

const getKeys = _.memoize((key = '') => {
  const short = shortKey(key)
  const theKey = CACHE_PREFIX + short
  const exprKey = CACHE_EXPIRATION_PREFIX + short
  return { theKey, exprKey }
})

const currentTime = () => Math.floor(new Date().getTime() / EXPIRY_UNITS)

const AsyncStorage = {
  getItem: async () => {},
  removeItem: async () => {},
  multiRemove: async () => {},
  setItem: async () => {},
  getAllKeys: async () => {},
  flushExpired: async () => {},
}

const StorageTools = {
  PageCachePrefix: 'page-cache-',

  get(key, defaultValue = null) {
    const { exprKey, theKey } = getKeys(key)
    return AsyncStorage.getItem(exprKey)
      .then(expiry => {
        if (expiry && currentTime() >= parseInt(expiry, 10)) {
          AsyncStorage.multiRemove([exprKey, theKey])
          return Promise.resolve(null)
        }
        return AsyncStorage.getItem(theKey)
          .then(value => Promise.resolve(value !== null ? JSON.parse(value) : defaultValue))
          .catch(fail)
      })
      .catch(fail)
  },

  set(key, value = '', time) {
    const { exprKey, theKey } = getKeys(key)
    if (time) {
      const strTime = (currentTime() + time).toString()
      return AsyncStorage.setItem(exprKey, strTime)
        .then(() => AsyncStorage.setItem(theKey, JSON.stringify(value)))
        .catch(fail)
    }
    AsyncStorage.removeItem(exprKey)
    return AsyncStorage.setItem(theKey, JSON.stringify(value))
  },

  remove(key) {
    const { exprKey, theKey } = getKeys(key)
    return AsyncStorage.multiRemove([exprKey, theKey])
  },

  isExpired(key) {
    const { exprKey } = getKeys(key)
    return AsyncStorage.getItem(exprKey)
      .then(expiry => {
        const expired = expiry && currentTime() >= parseInt(expiry, 10)
        return Promise.resolve(expired)
      })
      .catch(fail)
  },

  flush() {
    return AsyncStorage.getAllKeys()
      .then(keys => {
        const allKeys = keys.filter(
          key => key.indexOf(CACHE_PREFIX) === 0 || key.indexOf(CACHE_EXPIRATION_PREFIX) === 0
        )
        return AsyncStorage.multiRemove(allKeys)
      })
      .catch(fail)
  },

  flushWithPrefix(prefix) {
    return AsyncStorage.getAllKeys()
      .then(keys => {
        const allKeys = keys.filter(
          key =>
            key.indexOf(`${CACHE_PREFIX}${prefix}`) === 0 ||
            key.indexOf(`${CACHE_EXPIRATION_PREFIX}${prefix}`) === 0
        )
        return AsyncStorage.multiRemove(allKeys)
      })
      .catch(fail)
  },

  flushExpired() {
    return AsyncStorage.getAllKeys()
      .then(keys => {
        keys.forEach(key => {
          if (key.indexOf(CACHE_EXPIRATION_PREFIX) === 0) {
            const exprKey = key
            return AsyncStorage.getItem(exprKey)
              .then(expiry => {
                if (expiry && currentTime() >= parseInt(expiry, 10)) {
                  const theKey = CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '')
                  return AsyncStorage.multiRemove([exprKey, theKey])
                }
                return Promise.resolve()
              })
              .catch(fail)
          }
          return Promise.resolve()
        })
      })
      .catch(fail)
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
