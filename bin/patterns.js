'use strict';

module.exports = {
    род: {
        // КРАТК_ПРИЛ:
        '([^л])ен$': {
            м: '$1ен',
            ж: '$1на',
            с: '$1но'
        },
        '([л])ен$': {
            м: '$1ен',
            ж: '$1ьна',
            с: '$1ьно '
        },
        // ПРИЛ
        'вый$': {
            м: 'вый',
            ж: 'вая',
            с: 'вое'
        },
        'ный$': {
            м: 'ный',
            ж: 'ная',
            с: 'ное'
        },
        'щий$': {
            м: 'щий',
            ж: 'щая',
            с: 'щее'
        },
        'кий$': {
            м: 'кий',
            ж: 'кая',
            с: 'кое'
        }
    },

    падеж: {
        '([бвгджзклмнпрстфхцчшщ])а$': {
            'дательный': '$1у'
        },
        '([а-я])я$': {
            'дательный': '$1ю'
        }
    }
};