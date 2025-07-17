import { defineStore } from 'pinia'
import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

import { useListingsStore } from './listings'



export const useUserStore = defineStore('user', () => {
  const role = ref(null)
  const uid = ref(null)
  const username = ref(null)
  const email = ref(null)
  const balance = ref(null)



function clearUser() {
  uid.value = null
  role.value = null
  username.value = null
  email.value = null
} 
  async function fetchRole(userId) {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const data = userSnap.data()
      return data.role || null
    } else {
      console.error('Korisnik nije pronađen')
      return null
    }
  } catch (error) {
    console.error('Greška:', error)
    throw new Error (error)
  }
}

  const fetchUserInfo = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const data = userSnap.data()
        role.value = data.role
        username.value = data.username
        email.value = data.email
        balance.value = data.balance || 0

        const listingsStore = useListingsStore()
        await listingsStore.fetchListings()

        return data.role 
      } else {
        console.error('Error!')
      }
    } catch (error) {
      console.error('Greška pri dohvaćanju podataka:', error)
      throw new Error (error)
    }
  }

  return {
    role,
    uid,
    username,
    email,
    fetchRole,
    balance,
    clearUser,
    fetchUserInfo
  }
})
