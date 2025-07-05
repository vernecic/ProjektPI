import { defineStore } from 'pinia'
import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

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
    balance,
    clearUser,
    fetchUserInfo
  }
})
