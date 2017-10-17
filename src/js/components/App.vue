<template>
    <div id="app">
        <router-view></router-view>
        <div class="col-md-2">
            <div class="row">
                <categories-list />
            </div>
            <div class="row">
                 <tag-lists />
            </div>
        </div>
    </div>
</template>

<script>

import CategoriesList from './CategoriesList.vue';
import TagLists from './TagLists.vue';


export default {
    name: 'app',
    components: {
        CategoriesList,
        TagLists
    }
}
</script>

<style>

</style>