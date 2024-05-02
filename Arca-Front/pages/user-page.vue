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

</script>

<template>
  <UserInfos />
</template>