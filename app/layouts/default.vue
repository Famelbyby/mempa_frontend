<script setup lang="ts">
import SearchingField from '~/components/shared/searching-field.vue';
import '../components/header/style.scss';
import '../components/footer/style.scss';
</script>

<template>
    <div class="header">
        <HeaderLogo />
        <HeaderSidebar />
        <HeaderProfile />
    </div>
    <div class="main-content">
        <slot />
    </div>
    <div class="footer">
        <FooterAuthor />
        <FooterLogo />
    </div>
</template>

<style lang="scss" scoped>
    $color: white;
    $padding: 10px;
    $secondColor: green;

    .main-content {
        display: flex;
        flex: 1;
        background-color: $color;
        overflow: hidden;
    }
</style>