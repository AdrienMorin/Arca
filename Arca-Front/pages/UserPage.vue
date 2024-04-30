<script>
import Navbar from "~/components/users/Navbar.vue";
import UserInfos from "~/components/users/infos_user.vue";
import ChangerMdp from "~/components/users/changer_mdp.vue";
export default {
  components: {
    UserInfos,
    Navbar,
    ChangerMdp,
    }
};

</script>

<template>
   <Navbar />
    <UserInfos />

</template>