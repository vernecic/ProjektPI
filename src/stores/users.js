import { defineStore } from 'pinia'
import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const useUserStore = defineStore('user', () => {
  const role = ref(null)
  const uid = ref(null)
  const username = ref(null)
  const email = ref(null)

  async function fetchRole(userId) {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      const data = userSnap.data()
      role.value = data.role
      uid.value = userId
      return data.role
    } else {
      throw new Error('User document not found')
    }
  }

  function clearUser() {
    uid.value = null
    role.value = null
  }

  const fetchUserInfo = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const data = userSnap.data()
        role.value = data.role
        username.value = data.username
        email.value = data.email || null
        return data.role 
      } else {
        console.error('Error!')
      }
    } catch (error) {
      console.error('Greška pri dohvaćanju podataka:', error)
      throw error
    }
  }

  return {
    role,
    uid,
    username,
    email,
    fetchRole,
    clearUser,
    fetchUserInfo
  }
})
