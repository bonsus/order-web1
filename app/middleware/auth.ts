export default defineNuxtRouteMiddleware((to) => {
  const user = useAuthUser()
  if (!user.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
