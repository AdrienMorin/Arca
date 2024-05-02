<script>
import UserInfos from "~/components/users/infos_user.vue";
import ChangerMdp from "~/components/users/changer_mdp.vue";
export default {
  components: {
    UserInfos,
    ChangerMdp,
    }
};
definePageMeta({
  middleware:'auth',
});
document.documentElement.classList.remove('dark')


</script>

<template>
  <UserInfos />
</template>