<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Profil Akun — Ordeo' })

const { user, updateProfile, changePassword } = useAuth()

const profile = reactive({
  name: user.value?.name ?? '',
  whatsapp: user.value?.whatsapp ?? '',
  businessName: user.value?.businessName ?? '',
})

const profileLoading = ref(false)
const profileError = ref('')
const profileSuccess = ref('')

async function onSaveProfile() {
  profileError.value = ''
  profileSuccess.value = ''
  profileLoading.value = true
  try {
    await updateProfile({
      name: profile.name,
      whatsapp: profile.whatsapp,
      businessName: profile.businessName,
    })
    profileSuccess.value = 'Profil berhasil diperbarui.'
  } catch (e: any) {
    profileError.value = e?.data?.statusMessage || e?.statusMessage || 'Gagal memperbarui profil.'
  } finally {
    profileLoading.value = false
  }
}

const pwd = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const pwdLoading = ref(false)
const pwdError = ref('')
const pwdSuccess = ref('')

async function onChangePassword() {
  pwdError.value = ''
  pwdSuccess.value = ''
  if (pwd.newPassword !== pwd.confirmPassword) {
    pwdError.value = 'Konfirmasi password tidak cocok.'
    return
  }
  pwdLoading.value = true
  try {
    await changePassword(pwd.currentPassword, pwd.newPassword)
    pwdSuccess.value = 'Password berhasil diubah.'
    pwd.currentPassword = ''
    pwd.newPassword = ''
    pwd.confirmPassword = ''
  } catch (e: any) {
    pwdError.value = e?.data?.statusMessage || e?.statusMessage || 'Gagal mengubah password.'
  } finally {
    pwdLoading.value = false
  }
}
</script>

<template>
  <section class="bg-ink-50/50">
    <div class="container-x py-10 sm:py-14">
      <div class="mx-auto max-w-5xl">
        <h1 class="text-2xl font-bold text-ink-900 sm:text-3xl">Kelola Akun</h1>
        <p class="mt-1 text-sm text-ink-500">Perbarui data profil dan keamanan akun Anda.</p>

        <div class="mt-8 flex flex-col gap-6 lg:flex-row">
          <AppAccountNav />

          <div class="flex-1 space-y-6">
            <!-- Profil -->
            <form class="card" @submit.prevent="onSaveProfile">
              <h2 class="text-lg font-bold text-ink-900">Informasi profil</h2>
              <p class="mt-1 text-sm text-ink-500">Data ini digunakan untuk akun dan komunikasi.</p>

              <div class="mt-6 space-y-4">
                <div>
                  <label class="label" for="name">Nama lengkap</label>
                  <input id="name" v-model="profile.name" class="input" type="text" required />
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="label" for="email">Email</label>
                    <input
                      id="email"
                      :value="user?.email"
                      class="input cursor-not-allowed bg-ink-50 text-ink-500"
                      type="email"
                      disabled
                    />
                    <p class="mt-1.5 text-xs text-ink-400">Email tidak dapat diubah.</p>
                  </div>
                  <div>
                    <label class="label" for="whatsapp">No. WhatsApp</label>
                    <input id="whatsapp" v-model="profile.whatsapp" class="input" type="tel" required />
                  </div>
                </div>
                <div>
                  <label class="label" for="businessName">Nama bisnis</label>
                  <input id="businessName" v-model="profile.businessName" class="input" type="text" required />
                </div>
              </div>

              <p v-if="profileError" class="field-error mt-4">{{ profileError }}</p>
              <p v-if="profileSuccess" class="mt-4 text-xs font-medium text-emerald-600">
                {{ profileSuccess }}
              </p>

              <div class="mt-6 flex justify-end">
                <button type="submit" class="btn-primary" :disabled="profileLoading">
                  {{ profileLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
              </div>
            </form>

            <!-- Password -->
            <form class="card" @submit.prevent="onChangePassword">
              <h2 class="text-lg font-bold text-ink-900">Ubah password</h2>
              <p class="mt-1 text-sm text-ink-500">Gunakan password yang kuat dan unik.</p>

              <div class="mt-6 space-y-4">
                <div>
                  <label class="label" for="currentPassword">Password saat ini</label>
                  <input id="currentPassword" v-model="pwd.currentPassword" class="input" type="password" required />
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="label" for="newPassword">Password baru</label>
                    <input id="newPassword" v-model="pwd.newPassword" class="input" type="password" minlength="8" required />
                  </div>
                  <div>
                    <label class="label" for="confirmPassword">Konfirmasi password</label>
                    <input id="confirmPassword" v-model="pwd.confirmPassword" class="input" type="password" minlength="8" required />
                  </div>
                </div>
              </div>

              <p v-if="pwdError" class="field-error mt-4">{{ pwdError }}</p>
              <p v-if="pwdSuccess" class="mt-4 text-xs font-medium text-emerald-600">{{ pwdSuccess }}</p>

              <div class="mt-6 flex justify-end">
                <button type="submit" class="btn-secondary" :disabled="pwdLoading">
                  {{ pwdLoading ? 'Memproses...' : 'Ubah Password' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
