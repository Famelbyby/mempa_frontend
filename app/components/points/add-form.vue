<script setup lang="ts">
    import { BAD_POINT_NAME, BAD_POINT_RATING } from '~/utils/errors';
import type { LatLng } from '~/utils/interfaces';
    import { ValidatePointName, ValidatePointRating } from '~/utils/validations';

    const props = defineProps<{
        markerPos: LatLng;
    }>();

    const emit = defineEmits<{
        resetMarker: [];
    }>();

    const pointsStore = usePointsStore();
    const userStore = useUserStore();

    const name = ref('');
    const rating = ref<number>(0);
    const description = ref('');

    const nameError = ref<string | undefined>(undefined);
    const ratingError = ref<string | undefined>(undefined);

    function updateDescription(event: any) {
        const nextDescription = event.target.value as string;

        description.value = nextDescription;
    }

    function updateName(event: any) {
        const nextName = event.target.value as string;

        if (!ValidatePointName(nextName)) {
            nameError.value = BAD_POINT_NAME;
            return;
        }

        name.value = nextName;
        nameError.value = undefined;
    }

    function updateRating(event: any) {
        const nextRating = event.target.value as number;

        if (!ValidatePointRating(nextRating)) {
            ratingError.value = BAD_POINT_RATING;
            return;
        }

        rating.value = nextRating;
        ratingError.value = undefined;
    }

    async function addPoint() {
        console.log(pointsStore.isPending, !ValidatePointName(name.value), rating.value, ValidatePointRating(rating.value));

        if (pointsStore.isPending || !ValidatePointName(name.value) || !ValidatePointRating(rating.value)) {
            return;
        }

        const coordinates: string[] = [String(props.markerPos.lat), String(props.markerPos.lng)];

        const result = await pointsStore.addPoint({ ownerId: userStore.user?.id || '', review: description.value, rating: rating.value, name: name.value, coordinates });

        if (result === undefined) {
            pointsStore.getPoints(pointsStore.owner?.id || '');
            emit('resetMarker');
            clearForm();
        }
    }

    async function clearForm() {
        name.value = '';
        rating.value = 0;
        description.value = '';

        nameError.value = undefined;
        ratingError.value = undefined;
    }
</script>

<template>
    <div class="point-add-form">
        <div class="point-add-form-header">
            <div class="kk"></div>
            <!-- <SharedCustomInput class="point-add-form-header__name" type="text" placeholder="Пушкинъ" :disabled="false"" :value="name" label="Название" :error="nameError" @update="updateName" /> -->
            <SharedCustomInput class="point-add-form-header__name" type="text" placeholder="Пушкинъ" :disabled="false" :value="name" label="Название" :error="nameError" @update="updateName"/>
            <SharedCustomInput class="point-add-form-header__rating" type="number" placeholder="5" :disabled="false" :value="rating" label="Оценка" :error="ratingError" @update="updateRating"/>
        </div>
        <div class="point-add-form-description">
            <SharedDescriptionInput :max-length="MAX_DESCRIPTION_LENGTH" :value="description" @update="updateDescription"/>
        </div>
        <div class="point-add-form-footer">
            <div class="point-add-form__clear" @click="clearForm">
                Очистить
            </div>
            <div class="point-add-form__submit" @click="addPoint">
                Добавить
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .point-add-form {
        font-family: 'Raleway';
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        min-width: 400px;

        &-header {
            display: flex;
            flex-direction: column;
            row-gap: 15px;
        }

        &-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__submit {
            padding: 7px;
            background-color: green;
            color: white;
            border-radius: 7px;
        }

        &__submit, &__clear {
            cursor: pointer;
        }
    }
</style>